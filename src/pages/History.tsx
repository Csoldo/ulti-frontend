import { IoLibraryOutline } from 'react-icons/io5';
import styles from './History.module.css';

const History = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Játék történet</h1>
        <p className={styles.subtitle}>Itt láthatja az eddigi játékait</p>
      </div>
      
      <div className={styles.emptyState}>
        <span className={styles.emptyIcon}>
          <IoLibraryOutline />
        </span>
        <p className={styles.emptyText}>Még nincsenek játékai</p>
        <p className={styles.emptySubtext}>Kezdjen egy új játékot a főoldalon!</p>
      </div>
    </div>
  );
};

export default History;
