const dummyData = {
  status: 'ok',
  totalResults: 70,
  articles: [
    {
      source: {
        id: null,
        name: 'YouTube',
      },
      author: null,
      title:
        'FAA asks major airlines to slash flights at busy airports due to staffing shortage - NBC News',
      description:
        'The Federal Aviation Administration is asking airlines to cut back on service for the summer season at some of the nation’s busiest airports due to a severe ...',
      url: 'https://www.youtube.com/watch?v=vNX07pmJGkY',
      urlToImage: 'https://i.ytimg.com/vi/vNX07pmJGkY/maxresdefault.jpg',
      publishedAt: '2023-04-02T01:30:17Z',
      content: null,
    },
    {
      source: {
        id: null,
        name: 'Yahoo Entertainment',
      },
      author: 'Bibhu Pattnaik',
      title:
        "Google Co-Founder Sergey Brin, Other Billionaires Subpoenaed In Lawsuit Over JPMorgan's Links With Jeffrey Epstein - Yahoo Finance",
      description:
        "U.S. Virgin Islands Attorney General Denise George has subpoenaed Alphabet Inc's (NASDAQ: GOOGL) Google co-founder Sergey Brin and three other billionaires...",
      url: 'https://finance.yahoo.com/news/google-co-founder-sergey-brin-224939023.html',
      urlToImage:
        'https://media.zenfs.com/en/Benzinga/986fc50a14cba8a9c7fedae755ca1a0d',
      publishedAt: '2023-04-01T22:49:39Z',
      content:
        "U.S. Virgin Islands Attorney General Denise George has subpoenaed Alphabet Inc's (NASDAQ: GOOGL) Google co-founder Sergey Brin and three other billionaires in a civil lawsuit concerning JPMorgan Chas… [+2142 chars]",
    },
  ],
};

import { useEffect, useRef, useState } from 'react';
import { IoDisc } from 'react-icons/io5';
import styles from '../../styles/LatestNews.module.css';
import { Article } from '../NewsArticle';

const LatestNews = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchArticles = async () => {
    // const response = await fetch(
    //   `https://newsapi.org/v2/top-headlines?country=us&apiKey=dab7dd823d4d4222b7fdba1149c2a9f8&page=${pageNumber}`
    // );
    // const data = await response.json();
    const data = dummyData;

    setArticles((prevArticles: Article[]) => [
      ...prevArticles,
      ...data.articles,
    ]);
  };

  useEffect(() => {
    fetchArticles();
  }, [pageNumber]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    }, options);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const getTime = (time: string) => {
    const hours = new Date(time).getHours();
    const minutes = new Date(time).getMinutes();
    const fullTimeString = `${hours}:${minutes} `;
    return fullTimeString;
  };

  return (
    <div className={styles.latestNewsWindow}>
      <div className={styles.latestNewsTitle}>
        <IoDisc size={20} color="#BB1E1E" />
        <h2>Latest News</h2>
      </div>
      <div className={styles.latestNews} ref={containerRef}>
        {articles.map((article, index) => (
          <div key={index} className={styles.latestArticle}>
            <div className={styles.latestNewsRow}>
              <span className={styles.latestTime}>
                {getTime(article.publishedAt)}
              </span>
              <span className={styles.latestTitle}>{article.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
