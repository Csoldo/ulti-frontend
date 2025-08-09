import type { Player } from "../types/Player";
import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "./endpoints";

// Player API response types (based on swagger)
export interface CreatePlayerDto {
  name: string;
}

class PlayerService {
  // Get all players for the current user
  async getAllPlayers(): Promise<Player[]> {
    try {
      const response = await apiClient.get<Player[]>(
        API_ENDPOINTS.PLAYER.GET_ALL
      );
      console.log("Fetched players:", response);
      return response;
    } catch (error) {
      console.error("Failed to fetch players:", error);
      throw error;
    }
  }

  // Get a specific player by ID
  async getPlayerById(id: number): Promise<Player> {
    try {
      return await apiClient.get<Player>(API_ENDPOINTS.PLAYER.GET_BY_ID(id));
    } catch (error) {
      console.error(`Failed to fetch player ${id}:`, error);
      throw error;
    }
  }

  // Create a new player
  async createPlayer(playerData: CreatePlayerDto): Promise<Player> {
    try {
      const response = await apiClient.post<Player>(
        API_ENDPOINTS.PLAYER.CREATE,
        playerData
      );
      console.log("Created player:", response);
      return response;
    } catch (error) {
      console.error("Failed to create player:", error);
      throw error;
    }
  }
}

// Export singleton instance
export const playerService = new PlayerService();
export default playerService;
