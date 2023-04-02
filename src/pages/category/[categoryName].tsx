import { Article, NewsArticleProps } from '@/components/NewsArticle';
import useLocalStorage from '@/util/useLocaleStorage';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import styles from '../../styles/NewsArticle.module.css';
import ArticleList3By3 from '@/components/ArticleLists/ArticleList3By3';

function CategoryArticles({ data }: NewsArticleProps) {
  // const [savedArticles, setSavedArticles] = useLocalStorage<Article[]>(
  //   'savedArticles',
  //   []
  // );

  const { articles } = data;
  const router = useRouter();

  const title: string = router.query.categoryName as string;
  const titleFirstLetter = title.charAt(0).toUpperCase();
  const titleRemainingLetters = title.substring(1);
  const fullTitle = titleFirstLetter + titleRemainingLetters;

  // console.log('Category title' + title);

  // const handleSaveArticle = (article: Article) => {
  //   setSavedArticles([...savedArticles, article]);
  // };

  // const handleDeleteArticle = (articleTitle: string) => {
  //   const updatedSavedArticles = savedArticles.filter(
  //     (article) => article.title !== articleTitle
  //   );
  //   setSavedArticles(updatedSavedArticles);
  // };

  return (
    <div className={styles.main}>
      <div className={styles.newsContainer}>
        <h1>{fullTitle} News</h1>
        <div className={styles.restOfNews}>
          <ArticleList3By3
            article={articles}
            category={title}
          />
        </div>
      </div>
    </div>
  );
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
