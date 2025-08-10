import { useState } from "react";
import { IoChevronDown, IoCheckmark, IoClose, IoSave } from "react-icons/io5";
import type { Player } from "../../types/Player";
import type {
  LicitCombination,
  Licit,
  NewRoundData,
  SilentLicit,
} from "../../types/Game";
import styles from "./NewRound.module.css";

interface NewRoundProps {
  players: Player[];
  roundNumber: number;
  onSave: (roundData: NewRoundData) => void;
  onCancel: () => void;
}

// Mock data for licit combinations
const LICIT_COMBINATIONS: LicitCombination[] = [
  {
    id: "kis-ulti",
    name: "Kis Ulti",
    description: "Ulti + egy másik licit",
    licits: [
      { id: "ulti", name: "Ulti", baseValue: 10 },
      { id: "xx", name: "XX", baseValue: 2 },
    ],
  },
  {
    id: "nagy-ulti",
    name: "Nagy Ulti",
    description: "Ulti + Betli + XX",
    licits: [
      { id: "ulti", name: "Ulti", baseValue: 10 },
      { id: "betli", name: "Betli", baseValue: 5 },
      { id: "xx", name: "XX", baseValue: 2 },
    ],
  },
  {
    id: "szuper-ulti",
    name: "Szuper Ulti",
    description: "Ulti + Betli + Durchmars + XX",
    licits: [
      { id: "ulti", name: "Ulti", baseValue: 10 },
      { id: "betli", name: "Betli", baseValue: 5 },
      { id: "durchmars", name: "Durchmars", baseValue: 8 },
      { id: "xx", name: "XX", baseValue: 2 },
    ],
  },
  {
    id: "egyszerű",
    name: "Egyszerű játék",
    description: "Csak alapjáték",
    licits: [{ id: "alap", name: "Alapjáték", baseValue: 1 }],
  },
];

const NewRound = ({
  players,
  roundNumber,
  onSave,
  onCancel,
}: NewRoundProps) => {
  const [roundData, setRoundData] = useState<NewRoundData>({
    licitCombination: null,
    attackerId: null,
    defenderIds: [],
    wonLicits: [],
    contras: [],
    silentLicits: [],
  });

  const [showLicitDropdown, setShowLicitDropdown] = useState(false);
  const [showAttackerDropdown, setShowAttackerDropdown] = useState(false);
  const [showDefenderDropdown, setShowDefenderDropdown] = useState(false);

  const handleLicitCombinationSelect = (combination: LicitCombination) => {
    setRoundData((prev) => ({
      ...prev,
      licitCombination: combination,
      wonLicits: [],
      contras: [],
    }));
    setShowLicitDropdown(false);
  };

  const handleAttackerSelect = (playerId: number) => {
    setRoundData((prev) => ({
      ...prev,
      attackerId: playerId,
      defenderIds: prev.defenderIds.filter((id) => id !== playerId),
    }));
    setShowAttackerDropdown(false);
  };

  const handleDefenderToggle = (playerId: number) => {
    if (playerId === roundData.attackerId) return;

    setRoundData((prev) => ({
      ...prev,
      defenderIds: prev.defenderIds.includes(playerId)
        ? prev.defenderIds.filter((id) => id !== playerId)
        : [...prev.defenderIds, playerId],
    }));
  };

  const handleWonLicitToggle = (licitId: string) => {
    setRoundData((prev) => ({
      ...prev,
      wonLicits: prev.wonLicits.includes(licitId)
        ? prev.wonLicits.filter((id) => id !== licitId)
        : [...prev.wonLicits, licitId],
    }));
  };

  const handleContraToggle = (licitId: string) => {
    setRoundData((prev) => ({
      ...prev,
      contras: prev.contras.includes(licitId)
        ? prev.contras.filter((id) => id !== licitId)
        : [...prev.contras, licitId],
    }));
  };

  const handleSilentLicitToggle = (playerId: number) => {
    setRoundData((prev) => ({
      ...prev,
      silentLicits: prev.silentLicits.some((sl) => sl.playerId === playerId)
        ? prev.silentLicits.filter((sl) => sl.playerId !== playerId)
        : [
            ...prev.silentLicits,
            {
              id: `csendes-100-${playerId}`,
              name: "Csendes 100",
              playerId,
              value: 10,
            },
          ],
    }));
  };

  const canSave = () => {
    return (
      roundData.licitCombination &&
      roundData.attackerId !== null &&
      roundData.defenderIds.length >= 2
    );
  };

  const handleSave = () => {
    if (canSave()) {
      onSave(roundData);
    }
  };

  const getPlayerName = (playerId: number) => {
    return players.find((p) => p.id === playerId)?.name || "";
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{roundNumber}. kör</h2>
        <button className={styles.closeButton} onClick={onCancel}>
          <IoClose />
        </button>
      </div>

      <div className={styles.content}>
        {/* Licit Combination Selection */}
        <div className={styles.section}>
          <label className={styles.label}>Licit</label>
          <div className={styles.dropdown}>
            <button
              className={styles.dropdownTrigger}
              onClick={() => setShowLicitDropdown(!showLicitDropdown)}
            >
              <span>
                {roundData.licitCombination?.name || "Válassz licitet"}
              </span>
              <IoChevronDown
                className={`${styles.chevron} ${
                  showLicitDropdown ? styles.open : ""
                }`}
              />
            </button>
            {showLicitDropdown && (
              <div className={styles.dropdownContent}>
                {LICIT_COMBINATIONS.map((combination) => (
                  <button
                    key={combination.id}
                    className={styles.dropdownItem}
                    onClick={() => handleLicitCombinationSelect(combination)}
                  >
                    <div>
                      <div className={styles.combinationName}>
                        {combination.name}
                      </div>
                      {combination.description && (
                        <div className={styles.combinationDesc}>
                          {combination.description}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {roundData.licitCombination && (
          <div className={styles.section}>
            <label className={styles.label}>Támadó</label>
            <div className={styles.dropdown}>
              <button
                className={styles.dropdownTrigger}
                onClick={() => setShowAttackerDropdown(!showAttackerDropdown)}
              >
                <span>
                  {roundData.attackerId
                    ? getPlayerName(roundData.attackerId)
                    : "Válassz támadót"}
                </span>
                <IoChevronDown
                  className={`${styles.chevron} ${
                    showAttackerDropdown ? styles.open : ""
                  }`}
                />
              </button>
              {showAttackerDropdown && (
                <div className={styles.dropdownContent}>
                  {players.map((player) => (
                    <button
                      key={player.id}
                      className={styles.dropdownItem}
                      onClick={() => handleAttackerSelect(player.id)}
                    >
                      {player.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {roundData.attackerId && players.length > 3 && (
          <div className={styles.section}>
            <label className={styles.label}>Védők</label>
            <div className={styles.playerList}>
              {players
                .filter((player) => player.id !== roundData.attackerId)
                .map((player) => (
                  <button
                    key={player.id}
                    className={`${styles.playerButton} ${
                      roundData.defenderIds.includes(player.id)
                        ? styles.selected
                        : ""
                    }`}
                    onClick={() => handleDefenderToggle(player.id)}
                  >
                    {roundData.defenderIds.includes(player.id) && (
                      <IoCheckmark className={styles.checkIcon} />
                    )}
                    {player.name}
                  </button>
                ))}
            </div>
          </div>
        )}

        {roundData.defenderIds.length >= 2 && (
          <div className={styles.section}>
            <label className={styles.label}>Megnyert licitek</label>
            <div className={styles.licitList}>
              {roundData.licitCombination?.licits.map((licit) => (
                <button
                  key={licit.id}
                  className={`${styles.licitButton} ${
                    roundData.wonLicits.includes(licit.id)
                      ? styles.selected
                      : ""
                  }`}
                  onClick={() => handleWonLicitToggle(licit.id)}
                >
                  {roundData.wonLicits.includes(licit.id) && (
                    <IoCheckmark className={styles.checkIcon} />
                  )}
                  <div>
                    <div className={styles.licitName}>{licit.name}</div>
                    <div className={styles.licitValue}>
                      {licit.baseValue} pont
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {roundData.wonLicits.length > 0 && (
          <div className={styles.section}>
            <label className={styles.label}>Kontrák</label>
            <div className={styles.licitList}>
              {roundData.licitCombination?.licits
                .filter((licit) => roundData.wonLicits.includes(licit.id))
                .map((licit) => (
                  <button
                    key={licit.id}
                    className={`${styles.licitButton} ${
                      roundData.contras.includes(licit.id)
                        ? styles.selected
                        : ""
                    }`}
                    onClick={() => handleContraToggle(licit.id)}
                  >
                    {roundData.contras.includes(licit.id) && (
                      <IoCheckmark className={styles.checkIcon} />
                    )}
                    <div>
                      <div className={styles.licitName}>
                        {licit.name} kontra
                      </div>
                      <div className={styles.licitValue}>
                        +{licit.baseValue} pont
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* Silent Licits */}
        <div className={styles.section}>
          <label className={styles.label}>Csendes licitek</label>
          <div className={styles.playerList}>
            {players.map((player) => (
              <button
                key={player.id}
                className={`${styles.playerButton} ${
                  roundData.silentLicits.some((sl) => sl.playerId === player.id)
                    ? styles.selected
                    : ""
                }`}
                onClick={() => handleSilentLicitToggle(player.id)}
              >
                {roundData.silentLicits.some(
                  (sl) => sl.playerId === player.id
                ) && <IoCheckmark className={styles.checkIcon} />}
                {player.name} - Csendes 100
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button className={styles.cancelButton} onClick={onCancel}>
          Mégse
        </button>
        <button
          className={`${styles.saveButton} ${
            !canSave() ? styles.disabled : ""
          }`}
          onClick={handleSave}
          disabled={!canSave()}
        >
          <IoSave className={styles.buttonIcon} />
          Forduló mentése
        </button>
      </div>
    </div>
  );
};

export default NewRound;
