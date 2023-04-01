import ArticleList from '@/components/ArticleList';
import { Article } from '@/components/NewsArticle';
import useLocalStorage from '@/util/useLocaleStorage';
import styles from '../../styles/NewsArticle.module.css';


function FavouriteArticles() {
    const [savedArticles, setSavedArticles] = useLocalStorage<Article[]>("savedArticles", []);

  return (
    <div className={styles.main}>
      <div className={styles.newsContainer}>
      <h1>Favourite News</h1>
        <div className={styles.restOfNews}>
          <ArticleList article={savedArticles} whereToPut="DOWN" category='favorites' setSavedArticles={setSavedArticles}/>
        </div>
      </div>
    </div>
  );
}

export default FavouriteArticles;