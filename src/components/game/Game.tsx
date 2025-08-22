import { useState, useEffect } from "react";
import { IoAdd, IoTrophy, IoTime } from "react-icons/io5";
import type { GameState, Round, NewRoundData } from "../../types/Game";
import type { Player } from "../../types/Player";
import { gameService } from "../../services/gameService";
import { roundService } from "../../services/roundService";
import { BIDS } from "../../data/gameData";
import ConfirmDialog from "../common/ConfirmDialog";
import NewRound from "./NewRound";
import styles from "./Game.module.css";

interface GameProps {
  players: Player[];
  gameId?: number;
  onEndGame: () => void;
}

const Game = ({ players, gameId, onEndGame }: GameProps) => {
  const [showEndGameDialog, setShowEndGameDialog] = useState(false);
  const [showNewRoundModal, setShowNewRoundModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [gameState, setGameState] = useState<GameState>(() => {
    const initialScores: Record<number, number> = {};
    players.forEach((player) => {
      initialScores[player.id] = 0;
    });

    return {
      id: Date.now(),
      players,
      currentRound: 1,
      playerScores: initialScores,
      rounds: [],
      isActive: true,
      createdAt: new Date(),
    };
  });

  useEffect(() => {
    const loadGameData = async () => {
      if (!gameId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const [game, rounds] = await Promise.all([
          gameService.getActiveGame(),
          roundService.getAllRounds(),
        ]);
        if (!game) {
          console.error("No active game found");
          setIsLoading(false);
          return;
        }

        const updatedScores: Record<number, number> = {};
        players.forEach((player) => {
          updatedScores[player.id] = 0;
        });

        setGameState((prev) => ({
          ...prev,
          currentRound: rounds.length + 1,
          rounds: rounds.map((round) => ({
            id: round.id,
            roundNumber: rounds.indexOf(round) + 1,
            summary: `Kör ${rounds.indexOf(round) + 1} befejezve`,
            scoreChanges: updatedScores,
            completedAt: new Date(round.createdAt),
          })),
          playerScores: updatedScores,
        }));
      } catch (error) {
        console.error("Failed to load game data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadGameData();
  }, [gameId, players]);

  const handleNewRound = () => {
    setShowNewRoundModal(true);
  };

  const handleNewRoundSave = async (roundData: NewRoundData) => {
    console.log("Saving new round:", roundData);

    if (
      !gameId ||
      !roundData.attackerId ||
      !roundData.bidId ||
      !roundData.defender1Id
    ) {
      setShowNewRoundModal(false);
      return;
    }

    try {
      const createRoundData = {
        bidId: roundData.bidId,
        attackerId: roundData.attackerId,
        defender1Id: roundData.defender1Id,
        ...(roundData.defender2Id && { defender2Id: roundData.defender2Id }),
        attackerWonIds: roundData.attackerWonIds,
        silentBids: [], // TODO: Implement silent bids properly
        contras: [], // TODO: Implement contras properly
      };

      const newRound = await roundService.createRound(createRoundData);

      // Get licit name for display
      const selectedLicit = BIDS.find((l) => l.id === roundData.bidId);

      // setGameState((prev) => ({
      //   ...prev,
      //   currentRound: prev.currentRound + 1,
      //   rounds: [...prev.rounds, newRound],
      // }));

      setShowNewRoundModal(false);
    } catch (error) {
      console.error("Failed to create round:", error);
    }
  };

  const handleNewRoundCancel = () => {
    setShowNewRoundModal(false);
  };

  const handleEndGame = () => {
    setShowEndGameDialog(true);
  };

  const confirmEndGame = async () => {
    if (gameId) {
      try {
        await gameService.finishGame();
      } catch (error) {
        console.error("Failed to finish game:", error);
      }
    }
    onEndGame();
  };

  const getLastRound = (): Round | null => {
    return gameState.rounds.length > 0
      ? gameState.rounds[gameState.rounds.length - 1]
      : null;
  };

  const sortedPlayers = [...gameState.players].sort(
    (a, b) => (b.score ?? 0) - (a.score ?? 0)
  );

  const lastRound = getLastRound();

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>
          <span>Játék betöltése...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
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

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Állás</h3>
            <div className={styles.playersList}>
              {sortedPlayers.map((player, index) => (
                <div key={player.id} className={styles.playerCard}>
                  <div className={styles.playerRank}>
                    {(index === 0 && player.score) ||
                      (0 > 0 && <IoTrophy className={styles.trophyIcon} />)}
                    <span className={styles.rankNumber}>#{index + 1}</span>
                  </div>
                  <div className={styles.playerInfo}>
                    <span className={styles.playerName}>{player.name}</span>
                  </div>
                  <div className={styles.playerScore}>
                    <span className={styles.scoreValue}>{player.score}</span>
                    <span className={styles.scoreLabel}>pont</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.bottomSection}>
          {lastRound && (
            <div className={styles.lastRoundRow}>
              <div className={styles.lastRoundContent}>
                <p className={styles.roundSummary}>{lastRound.summary}</p>
                <div className={styles.scoreChanges}>
                  {Object.entries(lastRound.scoreChanges).map(
                    ([playerId, change]) => {
                      const player = players.find(
                        (p) => p.id === Number(playerId)
                      );
                      if (!player || change === 0) return null;

                      return (
                        <span
                          key={playerId}
                          className={`${styles.scoreChange} ${
                            change > 0 ? styles.positive : styles.negative
                          }`}
                        >
                          {player.name}: {change > 0 ? "+" : ""}
                          {change}
                        </span>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          )}

          <div className={styles.actions}>
            <button className={styles.newRoundButton} onClick={handleNewRound}>
              <IoAdd className={styles.buttonIcon} />
              <span>Új kör</span>
            </button>

            <button className={styles.endGameButton} onClick={handleEndGame}>
              Játék befejezése
            </button>
          </div>
        </div>
      </div>

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

      {showNewRoundModal && (
        <div className={styles.modalOverlay}>
          <NewRound
            players={players}
            roundNumber={gameState.currentRound}
            onSave={handleNewRoundSave}
            onCancel={handleNewRoundCancel}
          />
        </div>
      )}
    </>
  );
};

export default Game;
