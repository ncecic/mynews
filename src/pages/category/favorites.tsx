import { Article } from '@/components/NewsArticle';
import useLocalStorage from '@/util/useLocaleStorage';
import styles from '../../styles/NewsArticle.module.css';
import { useEffect, useState } from 'react';
import FavoritesArticleList from '@/components/ArticleLists/FavoritesArticleList';
import FavoritesMobileList from '../../components/mobile/FavoritesMobileList';

function FavouriteArticles() {
  const [savedArticles, setSavedArticles] = useLocalStorage<Article[]>(
    'savedArticles',
    []
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMobile) {
    if (savedArticles.length === 0) {
      return (
        <div className={styles.main}>
          <div className={styles.newsContainer}>
            <h1>Favourite News</h1>
            <div className={styles.pageItems}>
              <div className={styles.errorMessage}>
                <p>You have no facourite articles yet. Add some.</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.main}>
          <div className={styles.newsContainer}>
            <h1>Favourite News</h1>
            <div className={styles.restOfNews}>
              <FavoritesArticleList
                article={savedArticles}
                setSavedArticles={setSavedArticles}
              />
            </div>
          </div>
        </div>
      );
    }
  }

  if (isMobile) {
    if (savedArticles.length === 0) {
      return (
        <div className={styles.main}>
          <div className={styles.newsContainer}>
            <h1>Favourite News</h1>
            <div className={styles.errorMessage}>
              <p>You have no facourite articles yet. Add some.</p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.main}>
          <div className={styles.newsContainer}>
            <h1>Favourite News</h1>
            <div className={styles.restOfNews}>
              <FavoritesMobileList
                article={savedArticles}
                category="favorites"
                setSavedArticles={setSavedArticles}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default FavouriteArticles;
