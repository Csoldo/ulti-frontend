import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoPlayCircle } from "react-icons/io5";
import type { Player } from "../types/Player";
import { GameSettings } from "../components/game";
import { gameService } from "../services/gameService";
import styles from "./Home.module.css";
import routes from "../utils/routes";
import type { ApiError } from "../types/Api";

const Home = () => {
  const navigate = useNavigate();
  const [isGameSettingsOpen, setIsGameSettingsOpen] = useState(false);

  const handleStartNewGame = () => {
    setIsGameSettingsOpen(true);
  };

  const handleCloseGameSettings = () => {
    setIsGameSettingsOpen(false);
  };

  const handleStartGame = async (selectedPlayers: Player[]) => {
    try {
      const playerIds = selectedPlayers.map((player) => player.id);
      await gameService.createGame({ playerIds });
      console.log("Starting game with players:", selectedPlayers);
      navigate(routes.game);
    } catch (error) {
      console.error("Failed to create game:", error);
      const apiError = error as ApiError;
      if (
        apiError.statusCode === 400 &&
        apiError.message === "User cannot create more than 1 active games"
      ) {
        navigate(routes.game);
      } else {
        alert("Hiba a játék indításakor: " + apiError.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Ulti</h1>
      </div>

      <div className={styles.gameSection}>
        <button className={styles.startGameButton} onClick={handleStartNewGame}>
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
