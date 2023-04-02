import { Article } from '@/components/NewsArticle';
import useLocalStorage from '@/util/useLocaleStorage';
import styles from '../../styles/NewsArticle.module.css';
import ArticleList3By3 from '@/components/ArticleLists/ArticleList3By3';


function FavouriteArticles() {
    const [savedArticles, setSavedArticles] = useLocalStorage<Article[]>("savedArticles", []);

  return (
    <div className={styles.main}>
      <div className={styles.newsContainer}>
      <h1>Favourite News</h1>
        <div className={styles.restOfNews}>
          <ArticleList3By3 article={savedArticles} category='favorites' setSavedArticles={setSavedArticles}/>
        </div>
      </div>
    </div>
  );
}

export default FavouriteArticles;