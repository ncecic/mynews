import { GetServerSideProps } from 'next';
import NewsArticle, { NewsArticleProps } from '../components/NewsArticle';

export default function Home({ data, latestArticles }: NewsArticleProps) {
  return <NewsArticle data={data} latestArticles={latestArticles} />;
}

export const getServerSideProps: GetServerSideProps<
  NewsArticleProps
> = async () => {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=dab7dd823d4d4222b7fdba1149c2a9f8`
  );
  const data = await res.json();
  const latestArticles = data;

  return {
    props: {
      data,
      latestArticles,
    },
  };
};
