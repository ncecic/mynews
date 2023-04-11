import { NewsArticleProps } from '@/components/NewsArticle';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import styles from '../../styles/NewsArticle.module.css';
import ArticleList3By3 from '@/components/ArticleLists/ArticleList3By3';
import { useEffect, useState } from 'react';
import ArticleListMobile from '@/components/mobile/ArticleListMobile';

const CategoryArticles = ({ data }: NewsArticleProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { articles } = data;
  const router = useRouter();

  const title = router.query.categoryName as string;
  const titleFirstLetter = title.charAt(0).toUpperCase();
  const titleRemainingLetters = title.substring(1);
  const fullTitle = titleFirstLetter + titleRemainingLetters;

  if (!articles) {
    return (
      <div className={styles.main}>
        <div className={styles.newsContainer}>
          <h1>{fullTitle} News</h1>
          <div className={styles.pageItems}>
            <div className={styles.errorMessage}>
              <p>Something has gone wrong. Server did not respond</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const categoryArticles = articles.map((article) => {
    return {
      ...article,
      category: title.toUpperCase(),
    };
  });

  if (!isMobile) {
    return (
      <div className={styles.main}>
        <div className={styles.newsContainer}>
          <h1>{fullTitle} News</h1>
          <div className={styles.restOfNews}>
            <ArticleList3By3
              article={categoryArticles}
              category={title.toUpperCase()}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.main}>
        <div className={styles.newsContainer}>
          <h1>{fullTitle} News</h1>
          <div className={styles.articlesList}>
            <ArticleListMobile article={categoryArticles} category={title} />
          </div>
        </div>
      </div>
    );
  }
};

export default CategoryArticles;

export const getServerSideProps: GetServerSideProps<NewsArticleProps> = async (
  context: any
) => {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=${context.params.categoryName}&apiKey=${process.env.API_KEY}`
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
