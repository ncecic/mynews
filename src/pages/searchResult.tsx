import { Article } from '@/components/NewsArticle';
import { RootState } from '@/redux/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ArticleList3By3 from '@/components/ArticleLists/ArticleList3By3';
import styles from '../styles/NewsArticle.module.css';

function SearchResult() {
  const searchQuery = useSelector(
    (state: RootState) => state.article.articleQuery
  );
  const [fetchedArticles, setFetchedArticles] = useState<Article[]>([]);
  const current = new Date();

  useEffect(() => {
    async function getQueryArticles(query: string) {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${query}&from=2023-03-29&to=2023-03-29&sortBy=popularity&apiKey=dab7dd823d4d4222b7fdba1149c2a9f8`
      );
      const data = await res.json();
      const today = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    

      console.log('Date time', today);
      

      setFetchedArticles(data.articles);
    }

    getQueryArticles(searchQuery);
  }, []);

  console.log('Search result', fetchedArticles);
  if(!fetchedArticles){
  return (
    <div className={styles.main}>
      <div className={styles.newsContainer}>
        <h1>Search Result</h1>
        <div className={styles.restOfNews}>
          <ArticleList3By3 article={fetchedArticles} />
        </div>
      </div>
    </div>
  );} else {
    return (
        <div className={styles.main}>
          <div className={styles.newsContainer}>
            <h1>Search Result</h1>
            <div className={styles.failedSearch}>
                <p>Sorry, it looks like your search result didnt find anything</p>
                <p>Please check your spelling and try again</p>

            </div>
          </div>
        </div>
      );
  }
}

export default SearchResult;
