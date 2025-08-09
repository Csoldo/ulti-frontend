import { useNavigate, useLocation } from 'react-router-dom';
import { Game } from '../components/game';
import type { Player } from '../types/Player';

const GamePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get players from navigation state
  const players = (location.state as { players?: Player[] })?.players || [];
  
  // If no players, redirect to home
  if (players.length === 0) {
    navigate('/home');
    return null;
  }

  const handleEndGame = () => {
    navigate('/home');
  };

  return (
    <Game 
      players={players} 
      onEndGame={handleEndGame}
    />
  );
};

export default GamePage;
