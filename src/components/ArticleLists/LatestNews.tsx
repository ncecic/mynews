import { useEffect, useRef, useState } from "react";
import styles from "../../styles/LatestNews.module.css";
import { Article } from "../NewsArticle";

const LatestNews = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchArticles = async () => {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=dab7dd823d4d4222b7fdba1149c2a9f8&page=${pageNumber}`
    );
    const data = await response.json();
    setArticles((prevArticles) => [...prevArticles, ...data.articles]);
  };

  useEffect(() => {
    fetchArticles();
  }, [pageNumber]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
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
      <h2>Latest News</h2>
      <div className={styles.latestNews} ref={containerRef}>
        {articles.map((article, index) => (
          <div key={index} className={styles.latestArticle}>
            <span className={styles.latestTime}>
              {getTime(article.publishedAt)}
            </span>
            <span className={styles.latestTitle}>{article.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestNews;
