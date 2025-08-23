import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Game } from "../components/game";
import { gameService } from "../services/gameService";
import type { Player } from "../types/Player";
import routes from "../utils/routes";
import type { IGame } from "../types/Game";

const GamePage = () => {
  const navigate = useNavigate();
  const [gameData, setGameData] = useState<IGame | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActiveGame = async () => {
      try {
        setIsLoading(true);
        const activeGame = await gameService.getActiveGame();

        if (!activeGame) {
          navigate(routes.home);
          return;
        }

        setGameData(activeGame);
        setPlayers(activeGame.players);
      } catch (err) {
        console.error("Failed to fetch active game:", err);
        setError("Nem sikerült betölteni a játékot");
        navigate(routes.home);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActiveGame();
  }, [navigate]);

  const handleEndGame = () => {
    gameService
      .finishGame()
      .then(() => {
        console.log("Game finished successfully");
        navigate(routes.home);
      })
      .catch((error) => {
        console.error("Failed to finish game:", error);
        alert("Hiba a játék befejezésekor: " + error.message);
      });
    navigate(routes.home);
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px",
          padding: "20px",
          fontSize: "16px",
          color: "#666",
        }}
      >
        Játék betöltése...
      </div>
    );
  }

  if (error || !gameData || players.length === 0) {
    return null;
  }

  return (
    <Game players={players} gameId={gameData.id} onEndGame={handleEndGame} />
  );
};

export default GamePage;
