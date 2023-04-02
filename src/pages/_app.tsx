import '@/styles/globals.css'
import SearchBar from '@/components/SearchBar';
import type { AppProps } from 'next/app';
import styles from '../styles/App.module.css';
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import CategoriesNavigation from '@/components/CategoriesNavigation';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
        <Provider store={store}>
        <div className={styles.mainView}>
            <SearchBar />
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
