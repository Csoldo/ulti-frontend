import type { Player } from "./Player";

export interface GameState {
  id: number;
  players: Player[];
  currentRound: number;
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

export interface NewRoundData {
  bidId: number | null;
  attackerId: number | null;
  defender1Id: number | null;
  defender2Id: number | null;
  attackerWonIds: number[];
  silentBids: SilentBidData[];
  contras: number[];
}

export interface SilentBidData {
  silentBidId: number;
  attackerWon: boolean;
}

export interface Contra {
  bidTypeId: number;
  defender1Multiplier: number;
  defender2Multiplier: number;
}
