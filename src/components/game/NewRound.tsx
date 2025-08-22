import { useState } from "react";
import { IoChevronDown, IoCheckmark, IoClose, IoSave } from "react-icons/io5";
import type { Player } from "../../types/Player";
import type { NewRoundData } from "../../types/Game";
import { BIDS, BID_TYPES, type Bid } from "../../data/gameData";
import styles from "./NewRound.module.css";

interface NewRoundProps {
  players: Player[];
  roundNumber: number;
  onSave: (roundData: NewRoundData) => void;
  onCancel: () => void;
}

const NewRound = ({
  players,
  roundNumber,
  onSave,
  onCancel,
}: NewRoundProps) => {
  const [roundData, setRoundData] = useState<NewRoundData>({
    bidId: null,
    attackerId: null,
    defender1Id: null,
    defender2Id: null,
    attackerWonIds: [],
    contras: [],
    silentBids: [],
  });

  const [showLicitDropdown, setShowLicitDropdown] = useState(false);
  const [showAttackerDropdown, setShowAttackerDropdown] = useState(false);
  const [showDefender1Dropdown, setShowDefender1Dropdown] = useState(false);
  const [showDefender2Dropdown, setShowDefender2Dropdown] = useState(false);

  const selectedLicitData = roundData.bidId
    ? BIDS.find((l) => l.id === roundData.bidId)
    : null;

  const handleLicitSelect = (licit: Bid) => {
    setRoundData((prev) => ({
      ...prev,
      bidId: licit.id,
      attackerWonIds: [],
      contras: [],
    }));
    setShowLicitDropdown(false);
  };

  const handleAttackerSelect = (playerId: number) => {
    if (players.length === 3) {
      const defenders = players.filter((p) => p.id !== playerId);

      if (defenders.length !== 2) {
        throw new Error("Invalid number of defenders for 3-player game");
      }

      setRoundData((prev) => ({
        ...prev,
        attackerId: playerId,
        defender1Id: defenders[0].id,
        defender2Id: defenders[1].id,
      }));
    } else {
      setRoundData((prev) => ({
        ...prev,
        attackerId: playerId,
      }));
    }

    setShowAttackerDropdown(false);
  };

  const handleDefender1Select = (playerId: number) => {
    if (playerId === roundData.attackerId || playerId === roundData.defender2Id)
      return;

    setRoundData((prev) => ({
      ...prev,
      defender1Id: playerId,
    }));
    setShowDefender1Dropdown(false);
  };

  const handleDefender2Select = (playerId: number) => {
    if (playerId === roundData.attackerId || playerId === roundData.defender1Id)
      return;

    setRoundData((prev) => ({
      ...prev,
      defender2Id: playerId,
    }));
    setShowDefender2Dropdown(false);
  };

  const handleBidTypeToggle = (bidTypeId: number) => {
    setRoundData((prev) => ({
      ...prev,
      attackerWonIds: prev.attackerWonIds.includes(bidTypeId)
        ? prev.attackerWonIds.filter((id) => id !== bidTypeId)
        : [...prev.attackerWonIds, bidTypeId],
    }));
  };

  const handleSave = () => {
    if (!roundData.bidId || !roundData.attackerId) {
      return;
    }

    onSave(roundData);
  };

  const canSave = roundData.bidId && roundData.attackerId;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{roundNumber}. forduló rögzítése</h2>
        <button className={styles.closeButton} onClick={onCancel}>
          <IoClose />
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <label className={styles.sectionTitle}>Licit kombinációja</label>
          <div className={styles.dropdown}>
            <button
              className={styles.dropdownToggle}
              onClick={() => setShowLicitDropdown(!showLicitDropdown)}
            >
              <span className={styles.dropdownText}>
                {selectedLicitData
                  ? selectedLicitData.name
                  : "Válassz licitet..."}
              </span>
              <IoChevronDown
                className={`${styles.dropdownIcon} ${
                  showLicitDropdown ? styles.open : ""
                }`}
              />
            </button>

            {showLicitDropdown && (
              <div className={styles.dropdownMenu}>
                {BIDS.map((licit) => (
                  <button
                    key={licit.id}
                    className={`${styles.dropdownItem} ${
                      licit.isRed ? styles.redLicit : ""
                    }`}
                    onClick={() => handleLicitSelect(licit)}
                  >
                    <span className={styles.licitName}>{licit.name} </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.section}>
          <label className={styles.sectionTitle}>Támadó</label>
          <div className={styles.dropdown}>
            <button
              className={styles.dropdownToggle}
              onClick={() => setShowAttackerDropdown(!showAttackerDropdown)}
            >
              <span className={styles.dropdownText}>
                {roundData.attackerId
                  ? players.find((p) => p.id === roundData.attackerId)?.name
                  : "Válassz támadót..."}
              </span>
              <IoChevronDown
                className={`${styles.dropdownIcon} ${
                  showAttackerDropdown ? styles.open : ""
                }`}
              />
            </button>

            {showAttackerDropdown && (
              <div className={styles.dropdownMenu}>
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

        {roundData && players.length > 3 && (
          <div className={styles.section}>
            <label className={styles.sectionTitle}>Első védő</label>
            <div className={styles.dropdown}>
              <button
                className={styles.dropdownToggle}
                onClick={() => setShowDefender1Dropdown(!showDefender1Dropdown)}
              >
                <span className={styles.dropdownText}>
                  {roundData.defender1Id
                    ? players.find((p) => p.id === roundData.defender1Id)?.name
                    : "Válassz első védőt..."}
                </span>
                <IoChevronDown
                  className={`${styles.dropdownIcon} ${
                    showDefender1Dropdown ? styles.open : ""
                  }`}
                />
              </button>

              {showDefender1Dropdown && (
                <div className={styles.dropdownMenu}>
                  {players
                    .filter(
                      (p) =>
                        p.id !== roundData.attackerId &&
                        p.id !== roundData.defender2Id
                    )
                    .map((player) => (
                      <button
                        key={player.id}
                        className={styles.dropdownItem}
                        onClick={() => handleDefender1Select(player.id)}
                      >
                        {player.name}
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}

        {roundData && players.length > 3 && (
          <div className={styles.section}>
            <label className={styles.sectionTitle}>Második védő</label>
            <div className={styles.dropdown}>
              <button
                className={styles.dropdownToggle}
                onClick={() => setShowDefender2Dropdown(!showDefender2Dropdown)}
              >
                <span className={styles.dropdownText}>
                  {roundData.defender2Id
                    ? players.find((p) => p.id === roundData.defender2Id)?.name
                    : "Válassz második védőt..."}
                </span>
                <IoChevronDown
                  className={`${styles.dropdownIcon} ${
                    showDefender2Dropdown ? styles.open : ""
                  }`}
                />
              </button>

              {showDefender2Dropdown && (
                <div className={styles.dropdownMenu}>
                  {players
                    .filter(
                      (p) =>
                        p.id !== roundData.attackerId &&
                        p.id !== roundData.defender1Id
                    )
                    .map((player) => (
                      <button
                        key={player.id}
                        className={styles.dropdownItem}
                        onClick={() => handleDefender2Select(player.id)}
                      >
                        {player.name}
                      </button>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}

        {selectedLicitData && (
          <div className={styles.section}>
            <label className={styles.sectionTitle}>Megnyert licittípusok</label>
            <div className={styles.bidTypeGrid}>
              {selectedLicitData.bidTypeIds.map((bidTypeId) => {
                const bidType = BID_TYPES.find((bt) => bt.id === bidTypeId);
                if (!bidType) return null;

                return (
                  <button
                    key={bidTypeId}
                    className={`${styles.bidTypeButton} ${
                      roundData.attackerWonIds.includes(bidTypeId)
                        ? styles.selected
                        : ""
                    }`}
                    onClick={() => handleBidTypeToggle(bidTypeId)}
                  >
                    <span className={styles.bidTypeName}>{bidType.name} |</span>
                    <span className={styles.bidTypeScore}>
                      {bidType.score} pont
                    </span>
                    {roundData.attackerWonIds.includes(bidTypeId) && (
                      <IoCheckmark className={styles.checkIcon} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <button className={styles.cancelButton} onClick={onCancel}>
          <IoClose className={styles.buttonIcon} />
          <span>Mégse</span>
        </button>

        <button
          className={`${styles.saveButton} ${canSave ? "" : styles.disabled}`}
          onClick={handleSave}
          disabled={!canSave}
        >
          <IoSave className={styles.buttonIcon} />
          <span>Mentés</span>
        </button>
      </div>
    </div>
  );
};

export default NewRound;
