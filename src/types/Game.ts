import type { Player } from "./Player";

export interface IBidType {
  id: number;
  name: string;
  score: number;
}

export interface IBid {
  id: number;
  customName: string;
  isRed: boolean;
  bidTypes: IBidType[];
}

export interface IRound {
  id: number;
  bid: IBid;
  attacker: Player;
  defender1: Player;
  defender2: Player;
  attackerWonIds: number[];
  attackerPoints: number;
  defender1Points: number;
  defender2Points: number;
}

export interface IGame {
  id: number;
  isFinished: boolean;
  players: Player[];
  rounds: IRound[];
  playerScores: Record<number, number>;
  currentRound: number;
  // updatedAt: string;
  // createdAt: string;
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
