import { NewsArticleProps } from '@/components/NewsArticle';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import styles from '../../styles/NewsArticle.module.css';
import ArticleList3By3 from '@/components/ArticleLists/ArticleList3By3';
import { useEffect, useState } from 'react';
import ArticleListMobile from '@/components/mobile/ArticleListMobile';

function CategoryArticles({ data }: NewsArticleProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { articles } = data;
  const router = useRouter();

  const title: string = router.query.categoryName as string;
  const titleFirstLetter = title.charAt(0).toUpperCase();
  const titleRemainingLetters = title.substring(1);
  const fullTitle = titleFirstLetter + titleRemainingLetters;

  if (!isMobile) {
    return (
      <div className={styles.main}>
        <div className={styles.newsContainer}>
          <h1>{fullTitle} News</h1>
          <div className={styles.restOfNews}>
            <ArticleList3By3 article={articles} category={title} />
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
        <ArticleListMobile article={articles} category={title} />
      </div></div>
      </div>
    );
  }
}

export default CategoryArticles;

export const getServerSideProps: GetServerSideProps<NewsArticleProps> = async (
  context: any
) => {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&category=${context.params.categoryName}&apiKey=dab7dd823d4d4222b7fdba1149c2a9f8`
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
