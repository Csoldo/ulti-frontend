import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoPlayCircle } from 'react-icons/io5';
import type { Player } from '../types/Player';
import { GameSettings } from '../components/game';
import styles from './Home.module.css';
import routes from '../utils/routes';

const Home = () => {
  const navigate = useNavigate();
  const [isGameSettingsOpen, setIsGameSettingsOpen] = useState(false);

  const handleStartNewGame = () => {
    setIsGameSettingsOpen(true);
  };

  const handleCloseGameSettings = () => {
    setIsGameSettingsOpen(false);
  };

  const handleStartGame = (selectedPlayers: Player[]) => {
    console.log('Starting game with players:', selectedPlayers);
    // Navigate to game with players
    navigate(routes.game, { state: { players: selectedPlayers } });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Ulti</h1>
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
          <span className={styles.statLabel}>Lejátszott körök</span>
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
