import styles from '../styles/NewsArticle.module.css';
import ArticleList2By2 from './ArticleLists/ArticleList2By2';
import ArticleList3By3 from './ArticleLists/ArticleList3By3';
import LatestNews from './ArticleLists/LatestNews';

export interface Article {
  source: { id: string; name: string };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  category?: string;
}

export interface NewsArticleProps {
  data: {
    articles: Article[];
    status: string;
    totalResults: number;
  };
}

const NewsArticle = ({ data }: NewsArticleProps) => {
  const { articles } = data;

  if (!articles) {
    return (
      <div className={styles.main}>
        <div className={styles.newsContainer}>
          <h1>News</h1>
          <div className={styles.pageItems}>
            <div className={styles.errorMessage}>
              <p>Something has gone wrong. Server did not respond</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const articlesFirstpart = articles.slice(0, 4);
  const articlesSecondpart = articles.slice(4, articles.length);

  return (
    <div className={styles.main}>
      <div className={styles.newsContainer}>
        <h1>News</h1>
        <div className={styles.pageItems}>
          <div className={styles.smallNews}>
            <ArticleList2By2 article={articlesFirstpart} />
          </div>
          <LatestNews />
        </div>
        <div className={styles.restOfNews}>
          <ArticleList3By3 article={articlesSecondpart} />
        </div>
      </div>
    </div>
  );
};

export default NewsArticle;
