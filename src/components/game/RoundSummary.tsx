import type { IGame } from "../../types/Game";
import styles from "./RoundSummary.module.css";

interface RoundSummaryProps {
  game: IGame;
}

const RoundSummary = ({ game }: RoundSummaryProps) => {
  const recentRounds = game.rounds.slice(-3);

  if (recentRounds.length === 0) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>Utolsó körök</h3>
        <p className={styles.noRounds}>Még nincs kör</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Utolsó körök</h3>
      <div className={styles.roundsList}>
        {recentRounds.map((round) => (
          <div key={round.id} className={styles.roundItem}>
            <h4 className={styles.attackerName}>{round.attacker.name}</h4>
            <p className={styles.licit}>{round.bid.customName}</p>
            <div className={styles.playerScores}>
              <div className={styles.playerScore}>
                <span className={styles.playerName}>{round.attacker.name}</span>
                <span className={styles.points}>{round.attackerPoints}</span>
              </div>
              <div key={round.defender1.id} className={styles.playerScore}>
                <span className={styles.playerName}>
                  {round.defender1.name}
                </span>
                <span className={styles.points}>{round.defender1Points}</span>
              </div>
              <div key={round.defender2.id} className={styles.playerScore}>
                <span className={styles.playerName}>
                  {round.defender2.name}
                </span>
                <span className={styles.points}>{round.defender2Points}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoundSummary;
