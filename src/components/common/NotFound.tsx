import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>Az oldal nem található</h2>
        <p className={styles.description}>
          A keresett oldal nem létezik.
        </p>
        <Link to="/login" className={styles.homeLink}>
          Bejelentkezés
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
