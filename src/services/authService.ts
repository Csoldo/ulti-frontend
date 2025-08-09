import type { LoginDto, RegisterDto, ChangeUsernameDto, AuthResponse, User } from '../types/Api';
import { apiClient } from './apiClient';

class AuthService {
  // Login user
  async login(credentials: LoginDto): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      
      // Store token and user data
      if (response.access_token) {
        apiClient.setAuthToken(response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  // Register new user
  async register(userData: RegisterDto): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>('/auth/register', userData);
      
      // Store token and user data
      if (response.access_token) {
        apiClient.setAuthToken(response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
      }
      
      return response;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }

  // Get user profile
  async getProfile(): Promise<User> {
    try {
      return await apiClient.get<User>('/auth/profile');
    } catch (error) {
      console.error('Failed to get profile:', error);
      throw error;
    }
  }

  // Change username
  async changeUsername(usernameData: ChangeUsernameDto): Promise<User> {
    try {
      const response = await apiClient.post<User>('/auth/change-username', usernameData);
      
      // Update stored user data
      localStorage.setItem('user', JSON.stringify(response));
      
      return response;
    } catch (error) {
      console.error('Failed to change username:', error);
      throw error;
    }
  }

  // Logout user
  logout(): void {
    apiClient.removeAuthToken();
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!apiClient.getStoredToken();
  }

  // Get stored user data
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
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
