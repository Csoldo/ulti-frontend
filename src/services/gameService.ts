import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "./endpoints";

export interface CreateGameDto {
  playerIds: number[];
}

interface IPlayer {
  id: number;
  name: string;
  score: number;
}

export interface Game {
  id: number;
  players: IPlayer[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

class GameService {
  async getAllGames(): Promise<Game[]> {
    try {
      return await apiClient.get<Game[]>(API_ENDPOINTS.GAME.GET_ALL);
    } catch (error) {
      console.error("Failed to fetch games:", error);
      throw error;
    }
  }

  async getActiveGame(): Promise<Game | null> {
    try {
      return await apiClient.get<Game>(API_ENDPOINTS.GAME.GET_ACTIVE);
    } catch (error) {
      console.error("Failed to fetch active game:", error);
      throw error;
    }
  }

  async getGameById(id: number): Promise<Game> {
    try {
      return await apiClient.get<Game>(`/game/${id}`);
    } catch (error) {
      console.error(`Failed to fetch game ${id}:`, error);
      throw error;
    }
  }

  async createGame(gameData: CreateGameDto): Promise<Game> {
    try {
      const response = await apiClient.post<Game>(
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

  async finishGame(): Promise<Game> {
    try {
      return await apiClient.post<Game>(API_ENDPOINTS.GAME.FINISH, {});
    } catch (error) {
      console.error("Failed to finish game:", error);
      throw error;
    }
  }
}

export const gameService = new GameService();
