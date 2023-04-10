import { Article } from '@/components/NewsArticle';
import { RootState } from '@/redux/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ArticleList3By3 from '@/components/ArticleLists/ArticleList3By3';
import styles from '../styles/NewsArticle.module.css';
import ArticleListMobile from '@/components/mobile/ArticleListMobile';

function SearchResult() {
  const searchQuery = useSelector(
    (state: RootState) => state.article.articleQuery
  );
  const [fetchedArticles, setFetchedArticles] = useState<Article[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth().toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    async function getQueryArticles(query: string) {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${query}&from=${formattedDate}&sortBy=popularity&apiKey=${process.env.API_KEY}`
      );
      const data = await res.json();
      setFetchedArticles(data.articles);
    }
    
    getQueryArticles(searchQuery);
  }, [searchQuery]);

  if (!isMobile) {
    if (fetchedArticles && fetchedArticles.length > 0) {
      return (
        <div className={styles.main}>
          <div className={styles.newsContainer}>
            <h1>Search Result</h1>
            <div className={styles.restOfNews}>
              <ArticleList3By3 article={fetchedArticles} />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.main}>
          <div className={styles.newsContainer}>
            <h1>Search Result</h1>
            <div className={styles.failedSearch}>
              <p>Sorry, it looks like your search result didnt find anything</p>
              <p>Please check your spelling and try again</p>
            </div>
          </div>
        </div>
      );
    }
  }

  if (isMobile) {
    if (fetchedArticles && fetchedArticles.length > 0 ) {
      return (
        <div className={styles.main}>
          <div className={styles.newsContainer}>
            <h1>Search Result</h1>
            <div className={styles.restOfNews}>
              <ArticleListMobile article={fetchedArticles} />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.main}>
          <div className={styles.newsContainer}>
            <h1>Search Result</h1>
            <div className={styles.failedSearch}>
              <p>Sorry, it looks like your search result didnt find anything</p>
              <p>Please check your spelling and try again</p>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default SearchResult;
