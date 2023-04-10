import { useDispatch } from 'react-redux';
import { saveArticle } from '../../redux/articleSlice';
import { Article } from '../NewsArticle';
import { useRouter } from 'next/router';
import useLocalStorage from '@/util/useLocaleStorage';
import styles from '../../styles/ArticleList2By2.module.css';

function ArticleList2By2(props: {
  article: Article[];
  category?: string;
  setSavedArticles?: (articles: Article[]) => void;
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [savedArticles, setSavedArticles] = useLocalStorage<Article[]>(
    'savedArticles',
    []
  );

  const articles = props.article;

  const getHeight = () => {
    const newsItem = document.querySelector('.newsItem');
    if (newsItem) {
      const { width, height } = newsItem.getBoundingClientRect();
    }
  };

  function openArticleHandler(article: Article) {
    dispatch(saveArticle(article));
    router.push(`/article/${article.title}`);
  }

  const handleSaveArticle = (article: Article) => {
    const isArticleSaved = savedArticles.find((savedArticle) => {
      return (
        article.title === savedArticle.title && article.url === savedArticle.url
      );
    });

    if (isArticleSaved) {
      alert('Article already added');
    } else {
      if (props.setSavedArticles) {
        props.setSavedArticles([...savedArticles, article]);
      } else {
        setSavedArticles([...savedArticles, article]);
      }
    }
  };

  const handleDeleteArticle = (article: Article) => {
    const updatedSavedArticles = savedArticles.filter((savedArticle) => {
      return (
        article.title !== savedArticle.title && article.url !== savedArticle.url
      );
    });
    if (props.setSavedArticles) {
      props.setSavedArticles(updatedSavedArticles);
    } else {
      setSavedArticles(updatedSavedArticles);
    }
  };

  const onGoToArticleHandler = (url: string): void => {
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
            <div onClick={onGoToArticleHandler.bind(null, article.url)}>
              <div className={styles.imageWrapper}>
                {article.urlToImage ? (
                  <img src={article.urlToImage} alt={article.title} />
                ) : (
                  <div className={styles.noImage}>No Image</div>
                )}
                <div></div>
              </div>
              <div className={styles.contentWrapper}>
                <p className={styles.category}>
                  {props.category ? props.category.toUpperCase() : 'GENERAL'}
                </p>
                <h3 className={styles.title}>{article.title}</h3>
                <p className={styles.author}>
                  {article.author ? `By ${article.author}` : 'Unknown Author'}
                </p>
              </div>
            </div>
            {props.category === 'favorites' ? (
              <div className={styles.addFavorite}>
                <button onClick={handleDeleteArticle.bind(null, article)}>
                  REMOVE FROM FAVORITES
                </button>
              </div>
            ) : (
              <div className={styles.addFavorite}>
                <button onClick={handleSaveArticle.bind(null, article)}>
                  SAVE TO FAVORITES
                </button>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

export default ArticleList2By2;
