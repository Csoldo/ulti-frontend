import {
  IoPersonCircleOutline,
  IoLogOutOutline,
  IoMailOutline,
} from "react-icons/io5";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Profile.module.css";

const Profile = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <span className={styles.avatarIcon}>
            <IoPersonCircleOutline />
          </span>
        </div>
        <h1 className={styles.title}>Profil</h1>
        <p className={styles.subtitle}>
          Felhasználói beállítások és információk
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Fiók információk</h2>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>
              <IoPersonCircleOutline className={styles.infoIcon} />
              Felhasználónév:
            </span>
            <span className={styles.infoValue}>{user?.username || "—"}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>
              <IoMailOutline className={styles.infoIcon} />
              Email cím:
            </span>
            <span className={styles.infoValue}>{user?.email || "—"}</span>
          </div>

          {/* <div className={styles.infoItem}>
            <span className={styles.infoLabel}>
              <IoTimeOutline className={styles.infoIcon} />
              Regisztráció dátuma:
            </span>
            <span className={styles.infoValue}>
              {user?.createdAt ? formatDate(user.createdAt) : '—'}
            </span>
          </div> */}
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Beállítások</h2>
          <p className={styles.comingSoon}>Hamarosan elérhető...</p>
        </div>

        <div className={styles.section}>
          <button className={styles.logoutButton} onClick={handleLogout}>
            <IoLogOutOutline className={styles.buttonIcon} />
            Kijelentkezés
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
