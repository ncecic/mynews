import { Article } from '../NewsArticle';
import styles from '../../styles/ArticleList3By3.module.css';

const FavoritesArticleList = (props: {
  article: Article[];
  setSavedArticles: (articles: Article[]) => void;
}) => {
  const articles = props.article;

  const handleDeleteArticle = (article: Article) => {
    const updatedSavedArticles = articles.filter((savedArticle) => {
      return (
        article.title !== savedArticle.title && article.url !== savedArticle.url
      );
    });
    props.setSavedArticles(updatedSavedArticles);
  };

  const openArticleHandler = (url: string): void => {
    window.open(url, '_blank');
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
            <div onClick={openArticleHandler.bind(null, article.url)}>
              <div className={styles.imageWrapper}>
                {article.urlToImage ? (
                  <img src={article.urlToImage} alt={article.title} />
                ) : (
                  <div className={styles.noImage}>No Image</div>
                )}
              </div>
              <div className={styles.contentWrapper}>
                <p className={styles.category}>
                  {article.category
                    ? article.category.toUpperCase()
                    : 'GENERAL'}
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
};

export default FavoritesArticleList;
