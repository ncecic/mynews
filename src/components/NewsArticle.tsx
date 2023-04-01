import ArticleList from '@/components/ArticleList';
import styles from '../styles/NewsArticle.module.css';

export type Article = {
  source: { id: string; name: string };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  category?: string;
};

export type NewsArticleProps = {
  data: {
    articles: Article[];
    status: string;
    totalResults: number;
  };
  latestArticles?: {
    articles: Article[];
    status: string;
    totalResults: number;
  };
};

function NewsArticle({ data, latestArticles }: NewsArticleProps) {
  const { articles } = data;

  const articlesFirstpart = articles.slice(0, 4);
  const articlesSecondpart = articles.slice(4, articles.length);

  const getTime = (time: string) => {
    const hours = new Date(time).getHours();
    const minutes = new Date(time).getMinutes();
    const fullTimeString = `${hours}:${minutes} `;    
    return fullTimeString;
  }

  return (
    <div className={styles.main}>
      <div className={styles.newsContainer}>
        <h1>News</h1>
        <div className={styles.pageItems}>
          <div className={styles.smallNews}>
            <ArticleList article={articlesFirstpart} whereToPut="UP" />
          </div>
          <div className={styles.latestNewsWindow}>
            <h2>Latest News</h2>
            <div className={styles.latestNews}>
              {latestArticles &&
                latestArticles.articles.map((article, index) => (
                  <div key={index} className={styles.latestArticle}>
                    <span className={styles.latestTime}>
                      {getTime(article.publishedAt)}
                    </span>
                    <span className={styles.latestTitle}>{article.title}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className={styles.restOfNews}>
          <ArticleList article={articlesSecondpart} whereToPut="DOWN" />
        </div>
      </div>
    </div>
  );
}

export default NewsArticle;
