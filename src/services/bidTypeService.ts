import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "./endpoints";

export interface BidType {
  id: number;
  name: string;
  description?: string;
  points: number;
}

class BidTypeService {
  async getAllBidTypes(): Promise<BidType[]> {
    try {
      return await apiClient.get<BidType[]>(API_ENDPOINTS.BID_TYPE.GET_ALL);
    } catch (error) {
      console.error("Failed to fetch bid types:", error);
      throw error;
    }
  }

  async getBidTypeById(id: number): Promise<BidType> {
    try {
      return await apiClient.get<BidType>(API_ENDPOINTS.BID_TYPE.GET_BY_ID(id));
    } catch (error) {
      console.error(`Failed to fetch bid type ${id}:`, error);
      throw error;
    }
  }

  async getBidTypeByName(name: string): Promise<BidType> {
    try {
      return await apiClient.get<BidType>(
        API_ENDPOINTS.BID_TYPE.GET_BY_NAME(name)
      );
    } catch (error) {
      console.error(`Failed to fetch bid type ${name}:`, error);
      throw error;
    }
  }
}

export const bidTypeService = new BidTypeService();
