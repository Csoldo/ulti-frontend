import { useState } from 'react';
import { IoAdd, IoTrophy, IoTime } from 'react-icons/io5';
import type { GameState, Round } from '../../types/Game';
import type { Player } from '../../types/Player';
import ConfirmDialog from '../common/ConfirmDialog';
import styles from './Game.module.css';

interface GameProps {
  players: Player[];
  onEndGame: () => void;
}

const Game = ({ players, onEndGame }: GameProps) => {
  // Dialog state
  const [showEndGameDialog, setShowEndGameDialog] = useState(false);

  // Initialize game state
  const [gameState, setGameState] = useState<GameState>(() => {
    const initialScores: Record<number, number> = {};
    players.forEach(player => {
      initialScores[player.id] = 0;
    });

    // Mock data for testing - add some sample scores and a last round
    const mockScores: Record<number, number> = {};
    players.forEach((player, index) => {
      mockScores[player.id] = (index + 1) * 10; // Sample scores: 10, 20, 30, etc.
    });

    const mockRounds: Round[] = players.length > 2 ? [{
      id: 1,
      roundNumber: 1,
      summary: `${players[0].name} nyert egy kis ultival, ${players[1].name} és ${players[2].name} veszített.`,
      scoreChanges: {
        [players[0].id]: 20,
        [players[1].id]: -10,
        [players[2].id]: -10,
        ...(players[3] ? { [players[3].id]: 0 } : {}),
        ...(players[4] ? { [players[4].id]: 0 } : {})
      },
      completedAt: new Date()
    }] : [];

    return {
      id: Date.now(),
      players,
      currentRound: mockRounds.length + 1,
      playerScores: mockScores,
      rounds: mockRounds,
      isActive: true,
      createdAt: new Date()
    };
  });

  const handleNewRound = () => {
    console.log('Register new round button pressed');
    // TODO: Open round registration modal
  };

  const handleEndGame = () => {
    setShowEndGameDialog(true);
  };

  const confirmEndGame = () => {
    onEndGame();
  };

  const getLastRound = (): Round | null => {
    return gameState.rounds.length > 0 
      ? gameState.rounds[gameState.rounds.length - 1]
      : null;
  };

  const getPlayerRank = (playerId: number): number => {
    const scores = Object.entries(gameState.playerScores)
      .sort(([, a], [, b]) => b - a);
    return scores.findIndex(([id]) => Number(id) === playerId) + 1;
  };

  const lastRound = getLastRound();

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.gameInfo}>
          <h1 className={styles.title}>Ulti Játék</h1>
          <div className={styles.roundInfo}>
            <IoTime className={styles.roundIcon} />
            <span className={styles.roundText}>
              {gameState.currentRound}. forduló
            </span>
          </div>
        </div>
      </div>

      {/* Last Round Summary */}
      {lastRound && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Utolsó forduló</h3>
          <div className={styles.lastRound}>
            <p className={styles.roundSummary}>{lastRound.summary}</p>
            <div className={styles.scoreChanges}>
              {Object.entries(lastRound.scoreChanges).map(([playerId, change]) => {
                const player = players.find(p => p.id === Number(playerId));
                if (!player || change === 0) return null;
                
                return (
                  <span 
                    key={playerId} 
                    className={`${styles.scoreChange} ${
                      change > 0 ? styles.positive : styles.negative
                    }`}
                  >
                    {player.name}: {change > 0 ? '+' : ''}{change}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Players Scores */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Állás</h3>
        <div className={styles.playersList}>
          {players
            .sort((a, b) => gameState.playerScores[b.id] - gameState.playerScores[a.id])
            .map((player, index) => (
              <div key={player.id} className={styles.playerCard}>
                <div className={styles.playerRank}>
                  {index === 0 && gameState.playerScores[player.id] > 0 && (
                    <IoTrophy className={styles.trophyIcon} />
                  )}
                  <span className={styles.rankNumber}>#{index + 1}</span>
                </div>
                <div className={styles.playerInfo}>
                  <span className={styles.playerName}>{player.name}</span>
                </div>
                <div className={styles.playerScore}>
                  <span className={styles.scoreValue}>
                    {gameState.playerScores[player.id]}
                  </span>
                  <span className={styles.scoreLabel}>pont</span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button 
          className={styles.newRoundButton}
          onClick={handleNewRound}
        >
          <IoAdd className={styles.buttonIcon} />
          <span>Új forduló rögzítése</span>
        </button>
        
        <button 
          className={styles.endGameButton}
          onClick={handleEndGame}
        >
          Játék befejezése
        </button>
      </div>

      {/* End Game Confirmation Dialog */}
      <ConfirmDialog
        open={showEndGameDialog}
        onOpenChange={setShowEndGameDialog}
        title="Játék befejezése"
        description="Biztosan be szeretnéd fejezni a játékot?

A játék állása elmentésre kerül."
        confirmText="Igen, befejezem"
        cancelText="Mégse"
        onConfirm={confirmEndGame}
      />
    </div>
  );
};

export default Game;
