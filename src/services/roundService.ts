import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "./endpoints";

export interface CreateRoundDto {
  bidId: number;
  attackerId: number;
  defender1Id: number;
  defender2Id?: number;
  attackerWonIds: number[];
  silentBids: SilentBidOutcomeDto[];
  contras: ContraDto[];
}

export interface SilentBidOutcomeDto {
  silentBidId: number;
  attackerWon: boolean;
}

export interface ContraDto {
  bidTypeId: number;
  defender1Multiplier: number;
  defender2Multiplier?: number;
}

export interface Round {
  id: number;
  bidId: number;
  attackerId: number;
  defender1Id: number;
  defender2Id?: number;
  attackerWonIds: number[];
  createdAt: string;
  updatedAt: string;
}

class RoundService {
  async getAllRounds(): Promise<Round[]> {
    try {
      return await apiClient.get<Round[]>(API_ENDPOINTS.ROUND.GET_ALL);
    } catch (error) {
      console.error("Failed to fetch rounds:", error);
      throw error;
    }
  }

  async getRoundById(id: number): Promise<Round> {
    try {
      return await apiClient.get<Round>(API_ENDPOINTS.ROUND.GET_BY_ID(id));
    } catch (error) {
      console.error(`Failed to fetch round ${id}:`, error);
      throw error;
    }
  }

  async createRound(roundData: CreateRoundDto): Promise<Round> {
    try {
      const response = await apiClient.post<Round>(
        API_ENDPOINTS.ROUND.CREATE,
        roundData
      );
      console.log("Created round:", response);
      return response;
    } catch (error) {
      console.error("Failed to create round:", error);
      throw error;
    }
  }
}

export const roundService = new RoundService();
