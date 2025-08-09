import { Outlet } from 'react-router-dom';
import TabBar from './TabBar';
import styles from './DashboardLayout.module.css';

const DashboardLayout = () => {
  return (
    <div className={styles.dashboard}>
      <main className={styles.content}>
        <Outlet />
      </main>
      <TabBar />
    </div>
  );
};

export default DashboardLayout;
