import axios from 'axios';
import { API_CONFIG } from '../../config/api.config';
import { AuthTokens, User, AuthError } from './types';

class AuthService {
  private static instance: AuthService;
  private baseURL: string;

  private constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async login(email: string, password: string): Promise<{ user: User; tokens: AuthTokens }> {
    try {
      const response = await axios.post(`${this.baseURL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`, {
        email,
        password
      });

      const { user, ...tokens } = response.data;
      return { user, tokens };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async register(name: string, email: string, password: string): Promise<{ user: User; tokens: AuthTokens }> {
    try {
      const response = await axios.post(`${this.baseURL}${API_CONFIG.ENDPOINTS.AUTH.REGISTER}`, {
        name,
        email,
        password
      });

      const { user, ...tokens } = response.data;
      return { user, tokens };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async refreshTokens(): Promise<AuthTokens> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await axios.post(`${this.baseURL}${API_CONFIG.ENDPOINTS.AUTH.REFRESH}`, {
        refreshToken
      });

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async getCurrentUser(): Promise<User> {
    try {
      const response = await axios.get(`${this.baseURL}${API_CONFIG.ENDPOINTS.AUTH.ME}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private getRefreshToken(): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; refreshToken=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  }

  private handleError(error: unknown): AuthError {
    if (axios.isAxiosError(error)) {
      const axiosError = error;
      return {
        code: axiosError.response?.status.toString() || 'UNKNOWN',
        message: axiosError.response?.data?.message || 'Une erreur est survenue',
        details: axiosError.response?.data
      };
    }
    return {
      code: 'UNKNOWN',
      message: 'Une erreur inattendue est survenue'
    };
  }
}

export const authService = AuthService.getInstance(); 