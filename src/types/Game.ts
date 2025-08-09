import type { Player } from './Player';

export interface GameState {
  id: number;
  players: Player[];
  currentRound: number;
  playerScores: Record<number, number>; // playerId -> score
  rounds: Round[];
  isActive: boolean;
  createdAt: Date;
}

export interface Round {
  id: number;
  roundNumber: number;
  summary: string;
  scoreChanges: Record<number, number>; // playerId -> score change
  completedAt: Date;
}

// Licit types
export interface Licit {
  id: string;
  name: string;
  baseValue: number;
}

export interface LicitCombination {
  id: string;
  name: string;
  licits: Licit[];
  description?: string;
}

// New round data
export interface NewRoundData {
  licitCombination: LicitCombination | null;
  attackerId: number | null;
  defenderIds: number[];
  wonLicits: string[]; // licit IDs
  contras: string[]; // licit IDs with contra
  silentLicits: SilentLicit[];
}

export interface SilentLicit {
  id: string;
  name: string;
  playerId: number;
  value: number;
}
