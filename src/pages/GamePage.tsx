import { useNavigate, useLocation } from "react-router-dom";
import { Game } from "../components/game";
import type { Player } from "../types/Player";
import routes from "../utils/routes";

const GamePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const players =
    (location.state as { players?: Player[]; gameId?: number })?.players || [];
  const gameId = (location.state as { players?: Player[]; gameId?: number })
    ?.gameId;

  if (players.length === 0) {
    navigate(routes.home);
    return null;
  }

  const handleEndGame = () => {
    navigate(routes.home);
  };

  return <Game players={players} gameId={gameId} onEndGame={handleEndGame} />;
};

export default GamePage;
