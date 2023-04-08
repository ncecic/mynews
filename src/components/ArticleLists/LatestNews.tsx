import { useEffect, useState } from 'react';
import { IoDisc } from 'react-icons/io5';
import InfiniteScroll from 'react-infinite-scroller';
import styles from '../../styles/LatestNews.module.css';

type Article = {
  title: string;
  publishedAt: string;
  url: string;
};

const LatestNews = (): JSX.Element => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const fetchArticles = async (page: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.API_KEY}`
      );
      console.log('Requests made: ', page);
      const data = await response.json();
      if (data.articles) {
        setArticles((prevArticles: Article[]) => [
          ...prevArticles,
          ...data.articles,
        ]);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setError(true);
      setLoading(false);
    }
  };

  const getTime = (time: string): string => {
    const hours = new Date(time).getHours().toString().padStart(2, '0');
    const minutes = new Date(time).getMinutes().toString().padStart(2, '0');
    const fullTimeString = `${hours}:${minutes} `;
    return fullTimeString;
  };

  const handleDivClick = (url: string): void => {
    window.open(url, '_blank');
  };

  return (
    <div className={styles.latestNewsWindow}>
      <div className={styles.latestNewsTitle}>
        <IoDisc size={20} color="#BB1E1E" />
        <h2>Latest News</h2>
      </div>
      <div className={styles.latestNews}>
        <InfiniteScroll
          pageStart={0}
          loadMore={fetchArticles}
          hasMore={!loading && !error}
          loader={<div>Loading...</div>}
          useWindow={false}
        >
          {articles.map((article: Article, index: number) => (
            <div
              key={index}
              className={styles.latestArticle}
              onClick={() => handleDivClick(article.url)}
            >
              <div className={styles.latestNewsRow}>
                <span className={styles.latestTime}>
                  {getTime(article.publishedAt)}
                </span>
                <span className={styles.latestTitle}>{article.title}</span>
              </div>
            </div>
          ))}
        </InfiniteScroll>
        {error && <div>Error loading articles.</div>}
      </div>
    </div>
  );
};

export default LatestNews;
