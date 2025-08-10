import { useState, useEffect, useRef } from "react";
import { IoAdd, IoPersonAdd, IoCheckmarkCircle } from "react-icons/io5";
import type { Player } from "../../types/Player";
import { playerService } from "../../services/playerService";
import Modal from "../common/Modal";
import styles from "./GameSettings.module.css";

interface GameSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onStartGame: (selectedPlayers: Player[]) => void;
}

const GameSettings = ({ isOpen, onClose, onStartGame }: GameSettingsProps) => {
  const [existingPlayers, setExistingPlayers] = useState<Player[]>([]);
  const [isLoadingPlayers, setIsLoadingPlayers] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [showAddPlayer, setShowAddPlayer] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      fetchPlayers();
    }
  }, [isOpen]);

  const fetchPlayers = async () => {
    setIsLoadingPlayers(true);
    try {
      const players = await playerService.getAllPlayers();
      setExistingPlayers(players);
    } catch (error) {
      console.error("Failed to fetch players:", error);
      setExistingPlayers([]);
    } finally {
      setIsLoadingPlayers(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePlayerToggle = (player: Player) => {
    setSelectedPlayers((prev) => {
      const isSelected = prev.some((p) => p.id === player.id);
      if (isSelected) {
        return prev.filter((p) => p.id !== player.id);
      } else {
        if (prev.length >= 5) {
          // Maximum 5 players for Ulti
          return prev;
        }
        return [...prev, player];
      }
    });
  };

  const handleAddNewPlayer = async () => {
    if (newPlayerName.trim() && selectedPlayers.length < 5) {
      try {
        const newPlayer = await playerService.createPlayer({
          name: newPlayerName.trim(),
        });
        setSelectedPlayers((prev) => [...prev, newPlayer]);
        setNewPlayerName("");
        setShowAddPlayer(false);
        await fetchPlayers();
      } catch (error) {
        console.error("Failed to create player:", error);
        const newPlayer: Player = {
          id: Date.now(),
          name: newPlayerName.trim(),
        };
        setSelectedPlayers((prev) => [...prev, newPlayer]);
        setNewPlayerName("");
        setShowAddPlayer(false);
      }
    }
  };

  const handleStartGame = () => {
    if (selectedPlayers.length >= 3) {
      onStartGame(selectedPlayers);
      onClose();
    }
  };

  const isPlayerSelected = (player: Player) => {
    return selectedPlayers.some((p) => p.id === player.id);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Játék beállítások">
      <div className={styles.container}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Játékosok</h3>
        </div>

        {/* Selected Players */}
        {selectedPlayers.length > 0 && (
          <div className={styles.section}>
            <div className={styles.selectedPlayers}>
              {selectedPlayers.map((player) => (
                <div key={player.id} className={styles.selectedPlayer}>
                  <span className={styles.playerName}>{player.name}</span>
                  <button
                    className={styles.removeButton}
                    onClick={() => handlePlayerToggle(player)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={styles.section}>
          <h4 className={styles.subsectionTitle}>Meglévő játékosok:</h4>

          {isLoadingPlayers ? (
            <div className={styles.loadingMessage}>
              <span>Játékosok betöltése...</span>
            </div>
          ) : (
            <div className={styles.dropdown} ref={dropdownRef}>
              <button
                className={styles.dropdownToggle}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                disabled={selectedPlayers.length >= 5}
              >
                <span>Játékosok kiválasztása</span>
                <span
                  className={`${styles.dropdownArrow} ${
                    isDropdownOpen ? styles.open : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {isDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  {existingPlayers.map((player) => (
                    <button
                      key={player.id}
                      className={`${styles.dropdownItem} ${
                        isPlayerSelected(player) ? styles.selected : ""
                      }`}
                      onClick={() => handlePlayerToggle(player)}
                      disabled={
                        !isPlayerSelected(player) && selectedPlayers.length >= 5
                      }
                    >
                      <span className={styles.playerName}>{player.name}</span>
                      {isPlayerSelected(player) && (
                        <IoCheckmarkCircle className={styles.selectedIcon} />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Add New Player */}
        <div className={styles.section}>
          <h4 className={styles.subsectionTitle}>Új játékos hozzáadása:</h4>

          {!showAddPlayer ? (
            <button
              className={styles.addPlayerButton}
              onClick={() => setShowAddPlayer(true)}
              disabled={selectedPlayers.length >= 5}
            >
              <IoPersonAdd />
              <span>Új játékos</span>
            </button>
          ) : (
            <div className={styles.addPlayerForm}>
              <input
                type="text"
                placeholder="Játékos neve"
                value={newPlayerName}
                onChange={(e) => setNewPlayerName(e.target.value)}
                className={styles.playerNameInput}
                autoFocus
              />
              <div className={styles.addPlayerActions}>
                <button
                  className={styles.confirmButton}
                  onClick={handleAddNewPlayer}
                  disabled={!newPlayerName.trim()}
                >
                  <IoAdd />
                </button>
                <button
                  className={styles.cancelButton}
                  onClick={() => {
                    setShowAddPlayer(false);
                    setNewPlayerName("");
                  }}
                >
                  Mégse
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Start Game Button */}
        <div className={styles.actions}>
          <button
            className={styles.startButton}
            onClick={handleStartGame}
            disabled={selectedPlayers.length < 3}
          >
            Játék indítása ({selectedPlayers.length} játékos)
          </button>

          {selectedPlayers.length < 3 && (
            <p className={styles.minPlayersNote}>
              Legalább 3 játékos szükséges a játék megkezdéséhez
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default GameSettings;
