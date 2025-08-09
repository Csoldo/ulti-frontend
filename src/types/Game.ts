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
