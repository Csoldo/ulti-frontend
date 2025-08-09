import { useState } from 'react';
import { IoPlayCircle } from 'react-icons/io5';
import type { Player } from '../types/Player';
import { GameSettings } from '../components/game';
import styles from './Home.module.css';

const Home = () => {
  const [isGameSettingsOpen, setIsGameSettingsOpen] = useState(false);

  const handleStartNewGame = () => {
    setIsGameSettingsOpen(true);
  };

  const handleCloseGameSettings = () => {
    setIsGameSettingsOpen(false);
  };

  const handleStartGame = (selectedPlayers: Player[]) => {
    console.log('Starting game with players:', selectedPlayers);
    // TODO: Navigate to game or handle game start logic
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Ulti</h1>
        <p className={styles.subtitle}>Készen áll egy új játékra?</p>
      </div>
      
      <div className={styles.gameSection}>
        <button 
          className={styles.startGameButton}
          onClick={handleStartNewGame}
        >
          <span className={styles.buttonIcon}>
            <IoPlayCircle />
          </span>
          <span className={styles.buttonText}>Új játék kezdése</span>
        </button>
      </div>
      
      <div className={styles.quickStats}>
        <div className={styles.stat}>
          <span className={styles.statValue}>0</span>
          <span className={styles.statLabel}>Játékok</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>0</span>
          <span className={styles.statLabel}>Győzelmek</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>0%</span>
          <span className={styles.statLabel}>Arány</span>
        </div>
      </div>
      
      <GameSettings
        isOpen={isGameSettingsOpen}
        onClose={handleCloseGameSettings}
        onStartGame={handleStartGame}
      />
    </div>
  );
};

export default Home;
