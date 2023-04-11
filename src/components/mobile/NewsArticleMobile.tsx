import { useState } from 'react';
import ArticleListMobile from './ArticleListMobile';
import styles from '../../styles/mobile/NewsArticleMobile.module.css';
import LatestNews from '../ArticleLists/LatestNews';

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
};

export interface NewsArticleProps {
  data: {
    articles: Article[];
    status: string;
    totalResults: number;
  };
};

const NewsArticleMobile = ({ data }: NewsArticleProps) => {
  const { articles } = data;
  let featuredElement: JSX.Element;

  const [newsSource, setNewsSource] = useState('Featured');

  const newsSourceChangeHandler = (newsSource: string) => {
    setNewsSource(newsSource);
  };

  if (newsSource === 'Featured') {
    featuredElement = (
      <div className={styles.articlesListContainer}>
        <div className={styles.newsSource}>
          <div className={styles.selected}>
            <p onClick={newsSourceChangeHandler.bind(null, 'Featured')}>
              Featured
            </p>
          </div>
          <div>
            <p onClick={newsSourceChangeHandler.bind(null, 'Latest')}>Latest</p>
          </div>
        </div>
        <div className={styles.articlesList}>
          <ArticleListMobile article={articles} />
        </div>
      </div>
    );
  } else {
    featuredElement = (
      <div className={styles.articlesListContainer}>
        <div className={styles.newsSource}>
          <div>
            <p onClick={newsSourceChangeHandler.bind(null, 'Featured')}>
              Featured
            </p>
          </div>
          <div className={styles.selected}>
            <p onClick={newsSourceChangeHandler.bind(null, 'Latest')}>Latest</p>
          </div>
        </div>
        <div className={styles.articlesList}>
          <LatestNews />
        </div>
      </div>
    );
  }

  return featuredElement;
}

export default NewsArticleMobile;
