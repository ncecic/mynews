import Link from 'next/link';
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
import styles from '../styles/CategoriesList.module.css';

function CategoriesList() {
  const router = useRouter();

  return (
    <div className={styles.main}>
      <ul>
        <li>
          <Link href={'/'} className={`${styles.linkNav} ${router.pathname === '/' && styles.active}`}>
            <IoHome size={20} color={styles.icon} />
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link href={'/category/business'} className={`${styles.linkNav} ${router.query.categoryName === 'business' && styles.active}`}>
            <IoBriefcase size={20} />
            <p>Business</p>
          </Link>
        </li>
        <li>
          <Link href={'/category/technology'} className={`${styles.linkNav} ${router.query.categoryName === 'technology' && styles.active}`}>
            <IoVideocam size={20} />
            <p>Technology</p>
          </Link>
        </li>
        <li>
          <Link href={'/category/entertainment'} className={`${styles.linkNav} ${router.query.categoryName === 'entertainment' && styles.active}`}>
            <IoMedkit size={20} />
            <p>Entertainment</p>
          </Link>
        </li>
        <li>
          <Link href={'/category/health'} className={`${styles.linkNav} ${router.query.categoryName === 'health' && styles.active}`}>
            <IoFlask size={20} />
            <p>Health</p>
          </Link>
        </li>
        <li>
          <Link href={'/category/science'} className={`${styles.linkNav} ${router.query.categoryName === 'science' && styles.active}`}>
            <IoFootball size={20} />
            <p>Science</p>
          </Link>
        </li>
        <li>
          <Link href={'/category/sports'} className={`${styles.linkNav} ${router.query.categoryName === 'sports' && styles.active}`}>
            <IoTv size={20} />
            <p>Sports</p>
          </Link>
        </li>
        <li>
          <Link href={'/category/favorites'} className={`${styles.linkNav} ${router.query.categoryName === 'facorites' && styles.active}`}>
            <IoStar size={20} />
            <p>Favorites</p>
          </Link>
          </li>
      </ul>
    </div>
  );
}

export default CategoriesList;
