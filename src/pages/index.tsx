import NewsArticleMobile from '@/components/mobile/NewsArticleMobile';
import NewsArticle, { NewsArticleProps } from '../components/NewsArticle';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';

export default function Home({ data }: NewsArticleProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMobile) {
    return <NewsArticle data={data} />;
  } else {
    return <NewsArticleMobile data={data} />;
  }
}

export const getServerSideProps: GetServerSideProps<
  NewsArticleProps
> = async () => {
  if (!process.env.API_KEY || process.env.API_KEY === '') {
    console.log('No API_KEY found!');
  }

  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=${process.env.API_KEY}`
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
