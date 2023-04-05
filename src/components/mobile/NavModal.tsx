import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  IoBriefcase,
  IoClose,
  IoFlask,
  IoFootball,
  IoHome,
  IoMedkit,
  IoStar,
  IoTv,
  IoVideocam,
} from 'react-icons/io5';
import styles from '../../styles/mobile/NavModal.module.css';
import SearchBar from '../SearchBar';

interface NavModalProps {
  closeModal: () => void;
}

const NavModal = (props: NavModalProps) => {
  const router = useRouter();

  const closeModalHandler = () => {
    props.closeModal();
  }

  return (
    <nav className={styles.navModal}>
      <div className={styles.closeModal}>
        <IoClose size={24} color="#1D1D1B" onClick={closeModalHandler}/>
      </div>
      <div className={styles.logo}>
        <p className={styles.myStyle}>My</p>
        <p className={styles.newsStyle}>News</p>
      </div>
      <div>
        <SearchBar closeModal={closeModalHandler}/>
      </div>
      <ul className={`${styles.links}`}>
        <li>
          <Link
            href={'/'}
            onClick={closeModalHandler}
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
            onClick={closeModalHandler}
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
            onClick={closeModalHandler}
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
            onClick={closeModalHandler}
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
            onClick={closeModalHandler}
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
            onClick={closeModalHandler}
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
            onClick={closeModalHandler}
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
            onClick={closeModalHandler}
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

export default NavModal;
