import { searchArticleQuery } from '@/redux/articleSlice';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import styles from '../styles/SearchBar.module.css';

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  function searchNewsHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    dispatch(searchArticleQuery(searchQuery));
    setSearchQuery('');
    router.push('/searchResult')
  }

  return (
    <div className={styles.searchBarView}>
      <h1>
        <p className={styles.MyPart}>My</p>
        <p className={styles.NewsPart}>News</p>
      </h1>
      <form onSubmit={searchNewsHandler}>
        <div className={styles.searchBar}>
          <IoSearch />
          <input
            className={styles.inputField}
            placeholder="Search news"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value.toString());
            }}
          />
          <button type="submit">SEARCH</button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
