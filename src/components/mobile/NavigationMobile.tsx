import React, { useState } from 'react';
import styles from '../../styles/mobile/NavigationMobile.module.css';
import NavModal from './NavModal';
import SearchBar from '../SearchBar';

const NavigationMobile = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <p className={styles.myStyle}>My</p>
            <p className={styles.newsStyle}>News</p>
          </div>
          <div className={styles.hamburger} onClick={toggleNav}>
            <div />
            <div />
            <div />
          </div>
        </div>
          <div className={styles.searchBar}>
            <SearchBar />
          </div>
      </div>
      {isNavOpen && <NavModal closeModal={toggleNav} />}
    </nav>
  );
};

export default NavigationMobile;
