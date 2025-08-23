import type { IGame } from "../types/Game";
import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "./endpoints";

export interface CreateGameDto {
  playerIds: number[];
}

class GameService {
  async getAllGames(): Promise<IGame[]> {
    try {
      return await apiClient.get<IGame[]>(API_ENDPOINTS.GAME.GET_ALL);
    } catch (error) {
      console.error("Failed to fetch games:", error);
      throw error;
    }
  }

  async getActiveGame(): Promise<IGame | null> {
    try {
      return await apiClient.get<IGame>(API_ENDPOINTS.GAME.GET_ACTIVE);
    } catch (error) {
      console.error("Failed to fetch active game:", error);
      throw error;
    }
  }

  async getGameById(id: number): Promise<IGame> {
    try {
      return await apiClient.get<IGame>(`/game/${id}`);
    } catch (error) {
      console.error(`Failed to fetch game ${id}:`, error);
      throw error;
    }
  }

  async createGame(gameData: CreateGameDto): Promise<IGame> {
    try {
      const response = await apiClient.post<IGame>(
        API_ENDPOINTS.GAME.CREATE,
        gameData
      );
      console.log("Created game:", response);
      return response;
    } catch (error) {
      console.error("Failed to create game:", error);
      throw error;
    }
  }

  async finishGame(): Promise<IGame> {
    try {
      return await apiClient.post<IGame>(API_ENDPOINTS.GAME.FINISH, {});
    } catch (error) {
      console.error("Failed to finish game:", error);
      throw error;
    }
  }
}

export const gameService = new GameService();
