import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import styles from '../../styles/Article.module.css';

function FullArticle() {
  const reduxArticle = useSelector((state: RootState) => state.article);

  const article = reduxArticle.article

  console.log('FullArticle: ', article);

  return (
    <div className={styles.articleConatiner}>
      <div className={styles.imageWrapper}>
        {article.urlToImage ? (
          <img src={article.urlToImage} alt={article.title} />
        ) : (
          <div className={styles.noImage}>No Image</div>
        )}
      </div>
      <div className={styles.contentWrapper}>
        <h3 className={styles.title}>{article.title}</h3>
        <p className={styles.author}>
          {article.author ? `By ${article.author}` : 'Unknown Author'}
        </p>
        <p>{article.content}</p>
      </div>
    </div>
  );
}

export default FullArticle;
