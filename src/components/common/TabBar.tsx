import { NavLink } from 'react-router-dom';
import { IoHomeOutline, IoHome } from 'react-icons/io5';
import { IoBookOutline, IoBook } from 'react-icons/io5';
import { IoPersonOutline, IoPerson } from 'react-icons/io5';
import styles from './TabBar.module.css';

const TabBar = () => {
  const tabs = [
    {
      path: '/home',
      label: 'Kezdőlap',
      iconOutline: IoHomeOutline,
      iconFilled: IoHome
    },
    {
      path: '/history',
      label: 'Történet',
      iconOutline: IoBookOutline,
      iconFilled: IoBook
    },
    {
      path: '/profile',
      label: 'Profil',
      iconOutline: IoPersonOutline,
      iconFilled: IoPerson
    }
  ];

  return (
    <nav className={styles.tabBar}>
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) => 
            `${styles.tab} ${isActive ? styles.active : ''}`
          }
        >
          {({ isActive }) => (
            <>
              <span className={styles.icon}>
                {isActive ? <tab.iconFilled /> : <tab.iconOutline />}
              </span>
              <span className={styles.label}>{tab.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};

export default TabBar;
