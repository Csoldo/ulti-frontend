import type { IBidType } from "../types/Game";
import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "./endpoints";

class BidTypeService {
  async getAllBidTypes(): Promise<IBidType[]> {
    try {
      return await apiClient.get<IBidType[]>(API_ENDPOINTS.BID_TYPE.GET_ALL);
    } catch (error) {
      console.error("Failed to fetch bid types:", error);
      throw error;
    }
  }

  async getBidTypeById(id: number): Promise<IBidType> {
    try {
      return await apiClient.get<IBidType>(
        API_ENDPOINTS.BID_TYPE.GET_BY_ID(id)
      );
    } catch (error) {
      console.error(`Failed to fetch bid type ${id}:`, error);
      throw error;
    }
  }

  async getBidTypeByName(name: string): Promise<IBidType> {
    try {
      return await apiClient.get<IBidType>(
        API_ENDPOINTS.BID_TYPE.GET_BY_NAME(name)
      );
    } catch (error) {
      console.error(`Failed to fetch bid type ${name}:`, error);
      throw error;
    }
  }
}

export const bidTypeService = new BidTypeService();
