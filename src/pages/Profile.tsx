import { IoPersonCircleOutline } from 'react-icons/io5';
import styles from './Profile.module.css';

const Profile = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <span className={styles.avatarIcon}>
            <IoPersonCircleOutline />
          </span>
        </div>
        <h1 className={styles.title}>Profil</h1>
        <p className={styles.subtitle}>Felhasználói beállítások és információk</p>
      </div>
      
      <div className={styles.content}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Fiók információk</h2>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Felhasználónév:</span>
            <span className={styles.infoValue}>—</span>
          </div>
        </div>
        
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Beállítások</h2>
          <p className={styles.comingSoon}>Hamarosan elérhető...</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
