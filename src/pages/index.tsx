import NewsArticleMobile from '@/components/mobile/NewsArticleMobile';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import NewsArticle, { NewsArticleProps } from '../components/NewsArticle';

export default function Home({ data }: NewsArticleProps) {
  const [isMobile, setIsMobile] = useState(false);
  

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if(!isMobile) {

    return <NewsArticle data={data} />;
  } else {
    return <NewsArticleMobile data={data}  />;
  }
}

export const getServerSideProps: GetServerSideProps<
  NewsArticleProps
> = async () => {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=682af1712e9a4c2f919f36e050bcacfc`
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};
