import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import styles from '../../styles/Article.module.css';

function FullArticle() {
  const reduxArticle = useSelector((state: RootState) => state.article);

  const article = reduxArticle.article

  const content = article.content.split(" [")[0]


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
        <p>{content}</p>
        <p>If you want to find out more please click <a href={article.url} target='_blank'>here</a></p>
      </div>
    </div>
  );
}

export default FullArticle;
