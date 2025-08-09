import type {
  LoginDto,
  RegisterDto,
  ChangeUsernameDto,
  AuthResponse,
  User,
} from "../types/Api";
import { apiClient } from "./apiClient";
import { API_ENDPOINTS } from "./endpoints";

class AuthService {
  // Login user
  async login(credentials: LoginDto): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<any>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      );

      // Extract token from response
      let token: string;

      if (response.access_token) {
        token = response.access_token;
      } else if (response.accessToken) {
        token = response.accessToken;
      } else if (response.token) {
        token = response.token;
      } else {
        throw new Error("No token found in login response");
      }

      // Set token first
      apiClient.setAuthToken(token);

      // Fetch user profile using the token
      let user: User;
      try {
        user = await this.getProfile();
      } catch (profileError) {
        console.error(
          "Failed to fetch user profile after login:",
          profileError
        );
        throw new Error("Login successful but failed to fetch user profile");
      }

      // Store user data
      localStorage.setItem("user", JSON.stringify(user));

      return {
        access_token: token,
        user: user,
      };
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }

  // Register new user
  async register(userData: RegisterDto): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<any>(
        API_ENDPOINTS.AUTH.REGISTER,
        userData
      );

      // Extract token from response
      let token: string;

      if (response.access_token) {
        token = response.access_token;
      } else if (response.accessToken) {
        token = response.accessToken;
      } else if (response.token) {
        token = response.token;
      } else {
        throw new Error("No token found in register response");
      }

      // Set token first
      apiClient.setAuthToken(token);

      // Fetch user profile using the token
      let user: User;
      try {
        user = await this.getProfile();
      } catch (profileError) {
        console.error(
          "Failed to fetch user profile after registration:",
          profileError
        );
        throw new Error(
          "Registration successful but failed to fetch user profile"
        );
      }

      // Store user data
      localStorage.setItem("user", JSON.stringify(user));

      return {
        access_token: token,
        user: user,
      };
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  }

  // Get user profile
  async getProfile(): Promise<User> {
    try {
      return await apiClient.get<User>(API_ENDPOINTS.AUTH.PROFILE);
    } catch (error) {
      console.error("Failed to get profile:", error);
      throw error;
    }
  }

  // Change username
  async changeUsername(usernameData: ChangeUsernameDto): Promise<User> {
    try {
      const response = await apiClient.post<User>(
        API_ENDPOINTS.AUTH.CHANGE_USERNAME,
        usernameData
      );

      // Update stored user data
      localStorage.setItem("user", JSON.stringify(response));

      return response;
    } catch (error) {
      console.error("Failed to change username:", error);
      throw error;
    }
  }

  // Logout user
  logout(): void {
    apiClient.removeAuthToken();
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!apiClient.getStoredToken();
  }

  // Get stored user data
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem("user");

    if (userStr && userStr !== "undefined" && userStr !== "null") {
      try {
        const user = JSON.parse(userStr);
        return user;
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        // Clear invalid data
        localStorage.removeItem("user");
        return null;
      }
    }
    return null;
  }

  // Initialize auth state from localStorage
  initializeAuth(): boolean {
    const token = apiClient.getStoredToken();
    if (token) {
      apiClient.setAuthToken(token);
      return true;
    }
    return false;
  }
}

// Export singleton instance
export const authService = new AuthService();
export default authService;
