import axios, { AxiosError } from 'axios';
import { API_CONFIG } from '../../../config/api.config';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export interface AuthError {
  code: string;
  message: string;
  details?: any;
}

class AuthService {
  private static instance: AuthService;
  private baseURL: string;
  private token: string | null = null;

  private constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.token = localStorage.getItem('token');
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${this.baseURL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`, { email, password });
      if (response.data.data) {
        const { user, tokens } = response.data.data;
        this.token = tokens.accessToken;
        localStorage.setItem('token', tokens.accessToken);
        return { user, tokens };
      }
      throw new Error('Format de réponse invalide');
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async register(userData: { email: string; password: string; firstName: string; lastName: string; userType: string }): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${this.baseURL}${API_CONFIG.ENDPOINTS.AUTH.REGISTER}`, userData);
      if (response.data.data) {
        const { user, tokens } = response.data.data;
        this.token = tokens.accessToken;
        localStorage.setItem('token', tokens.accessToken);
        return { user, tokens };
      }
      throw new Error('Format de réponse invalide');
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async getCurrentUser(): Promise<User | null> {
    try {
      const token = this.getToken();
      if (!token) return null;
      const response = await axios.get(`${this.baseURL}${API_CONFIG.ENDPOINTS.AUTH.ME}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.data && response.data.data.user) {
        return response.data.data.user;
      }
      return null;
    } catch (error) {
      if (error instanceof AxiosError && (error.response?.status === 401 || error.response?.status === 403)) {
        this.logout();
      }
      return null;
    }
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.token = null;
  }

  public getToken(): string | null {
    return this.token || localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private handleError(error: unknown): AuthError {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
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