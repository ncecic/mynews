import '@/styles/globals.css';
import SearchBar from '@/components/SearchBar';
import type { AppProps } from 'next/app';
import styles from '../styles/App.module.css';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import CategoriesNavigation from '@/components/CategoriesNavigation';
import { useEffect, useState } from 'react';
import NavigationMobile from '../components/mobile/NavigationMobile';

export default function App({ Component, pageProps }: AppProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

 

  if (!isMobile) {
    return (
      <>
        <Provider store={store}>
          <div className={styles.mainView}>
            <div className={styles.searchBar}>
              <SearchBar />
            </div>
            <div className={styles.newsView}>
              <div className={styles.categoryView}>
                <CategoriesNavigation />
              </div>
              <div className={styles.articleView}>
                <Component {...pageProps} />
              </div>
            </div>
          </div>
        </Provider>
      </>
    );
  }

  if (isMobile) {
   
    return (
      <>
        <Provider store={store}>
          <NavigationMobile />
          <div className={styles.newsSource}>
          <Component {...pageProps} />
          </div>
        </Provider>
      </>
    );
  }
}
