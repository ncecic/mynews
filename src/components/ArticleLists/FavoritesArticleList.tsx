import { useDispatch } from 'react-redux';
import { saveArticle } from '../../redux/articleSlice';
import { Article } from '../NewsArticle';
import { useRouter } from 'next/router';
import useLocalStorage from '@/util/useLocaleStorage';
import styles from '../../styles/ArticleList3By3.module.css';

function FavoritesArticleList(props: {
  article: Article[];
  setSavedArticles: (articles: Article[]) => void;
}) {
  const dispatch = useDispatch();
  const router = useRouter();

  const articles = props.article;

  function openArticleHandler(article: Article) {
    dispatch(saveArticle(article));
    router.push(`/article/${article.title}`);
  }

  const handleDeleteArticle = (article: Article) => {
    const updatedSavedArticles = articles.filter((savedArticle) => {
      return (
        article.title !== savedArticle.title && article.url !== savedArticle.url
      );
    });
      props.setSavedArticles(updatedSavedArticles);
  };

  return (
    <div className={styles.articlesConatiner}>
      {articles &&
        articles.map((article, index) => (
          <div
            key={index}
            className={`${styles.newsItem} ${
              index % 3 === 2 ? styles.lastItem : ''
            }`}
          >
            <div onClick={openArticleHandler.bind(null, article)}>
              <div className={styles.imageWrapper}>
                {article.urlToImage ? (
                  <img src={article.urlToImage} alt={article.title} />
                ) : (
                  <div className={styles.noImage}>No Image</div>
                )}
              </div>
              <div className={styles.contentWrapper}>
                <p className={styles.category}>
                  {article.category ? article.category.toUpperCase() : 'GENERAL'}
                </p>
                <h3 className={styles.title}>{article.title}</h3>
                <p className={styles.author}>
                  {article.author ? `By ${article.author}` : 'Unknown Author'}
                </p>
              </div>
            </div>

            <div className={styles.addFavorite}>
              <button onClick={handleDeleteArticle.bind(null, article)}>
                REMOVE FROM FAVORITES
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default FavoritesArticleList;
