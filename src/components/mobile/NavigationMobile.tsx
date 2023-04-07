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
import NavModal from './NavModal';

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
     {isNavOpen && <NavModal closeModal={toggleNav}/>}
        
    </nav>
  );
};

export default NavigationMobile;
