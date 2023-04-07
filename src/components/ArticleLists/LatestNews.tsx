import { useEffect, useRef, useState } from 'react';
import { IoDisc } from 'react-icons/io5';
import styles from '../../styles/LatestNews.module.css';
import { Article } from '../NewsArticle';

const LatestNews = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.API_KEY}&page=${pageNumber}`
      );
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

  useEffect(() => {
    fetchArticles();
  }, [pageNumber]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading && !error) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    }, options);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [loading, error]);

  const getTime = (time: string) => {
    const hours = new Date(time).getHours();
    const minutes = new Date(time).getMinutes();
    const fullTimeString = `${hours}:${minutes} `;
    return fullTimeString;
  };

  const handleDivClick = (url: string) => {
    window.open(url, '_blank');
  }

  return (
    <div className={styles.latestNewsWindow}>
      <div className={styles.latestNewsTitle}>
        <IoDisc size={20} color="#BB1E1E" />
        <h2>Latest News</h2>
      </div>
      <div className={styles.latestNews} ref={containerRef}>
        {articles.map((article, index) => (
          <div key={index} className={styles.latestArticle} onClick={handleDivClick.bind(null, article.url)}>
            <div className={styles.latestNewsRow}>
              <span className={styles.latestTime}>
                {getTime(article.publishedAt)}
              </span>
              <span className={styles.latestTitle}>{article.title}</span>
            </div>
          </div>
        ))}
        {loading && <div>Loading...</div>}
        {error && <div>Error loading articles.</div>}
      </div>
    </div>
  );
};

export default LatestNews;
