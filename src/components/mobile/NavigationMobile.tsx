import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  IoBriefcase,
  IoFlask,
  IoFootball,
  IoHome,
  IoMedkit,
  IoStar,
  IoTv,
  IoVideocam,
} from 'react-icons/io5';
import styles from '../../styles/mobile/NavigationMobile.module.css';

const NavigationMobile = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const router = useRouter();

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav className={styles.nav}>
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
      <ul className={`${styles.links} ${isNavOpen ? styles.open : ''}`}>
        <li>
          <Link
            href={'/'}
            className={`${styles.linkNav} ${
              router.pathname === '/' && styles.active
            }`}
          >
            <IoHome size={20} color={styles.icon} />
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link
            href={'/category/business'}
            className={`${styles.linkNav} ${
              router.query.categoryName === 'business' && styles.active
            }`}
          >
            <IoBriefcase size={20} />
            <p>Business</p>
          </Link>
        </li>
        <li>
          <Link
            href={'/category/technology'}
            className={`${styles.linkNav} ${
              router.query.categoryName === 'technology' && styles.active
            }`}
          >
            <IoVideocam size={20} />
            <p>Technology</p>
          </Link>
        </li>
        <li>
          <Link
            href={'/category/entertainment'}
            className={`${styles.linkNav} ${
              router.query.categoryName === 'entertainment' && styles.active
            }`}
          >
            <IoMedkit size={20} />
            <p>Entertainment</p>
          </Link>
        </li>
        <li>
          <Link
            href={'/category/health'}
            className={`${styles.linkNav} ${
              router.query.categoryName === 'health' && styles.active
            }`}
          >
            <IoFlask size={20} />
            <p>Health</p>
          </Link>
        </li>
        <li>
          <Link
            href={'/category/science'}
            className={`${styles.linkNav} ${
              router.query.categoryName === 'science' && styles.active
            }`}
          >
            <IoFootball size={20} />
            <p>Science</p>
          </Link>
        </li>
        <li>
          <Link
            href={'/category/sports'}
            className={`${styles.linkNav} ${
              router.query.categoryName === 'sports' && styles.active
            }`}
          >
            <IoTv size={20} />
            <p>Sports</p>
          </Link>
        </li>
        <li>
          <Link
            href={'/category/favorites'}
            className={`${styles.linkNav} ${
              router.query.categoryName === 'facorites' && styles.active
            }`}
          >
            <IoStar size={20} />
            <p>Favorites</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationMobile;
