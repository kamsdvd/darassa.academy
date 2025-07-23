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
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  private constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.accessToken = localStorage.getItem('accessToken');
    this.refreshToken = localStorage.getItem('refreshToken');
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private setTokens(tokens: AuthTokens) {
    this.accessToken = tokens.accessToken;
    this.refreshToken = tokens.refreshToken;
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  }

  private clearTokens() {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  public async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${this.baseURL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`, { email, password });
      if (response.data.data) {
        const { user, tokens } = response.data.data;
        this.setTokens(tokens);
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
        this.setTokens(tokens);
        return { user, tokens };
      }
      throw new Error('Format de réponse invalide');
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async refreshToken(): Promise<AuthTokens | null> {
    const currentRefreshToken = this.getRefreshToken();
    if (!currentRefreshToken) return null;

    try {
      const response = await axios.post(`${this.baseURL}${API_CONFIG.ENDPOINTS.AUTH.REFRESH}`, {
        refreshToken: currentRefreshToken,
      });

      if (response.data.data && response.data.data.tokens) {
        const { tokens } = response.data.data;
        this.setTokens(tokens);
        return tokens;
      }
      throw new Error('Format de réponse invalide pour le rafraîchissement du token');
    } catch (error) {
      this.logout(); // Si le refresh token est invalide, on déconnecte
      throw this.handleError(error);
    }
  }

  public async getCurrentUser(): Promise<User | null> {
    try {
      const token = this.getAccessToken();
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
    // Idéalement, on appellerait aussi l'endpoint de logout du backend ici
    // await axios.post(`${this.baseURL}${API_CONFIG.ENDPOINTS.AUTH.LOGOUT}`, { refreshToken: this.getRefreshToken() });
    this.clearTokens();
  }

  public getAccessToken(): string | null {
    return this.accessToken || localStorage.getItem('accessToken');
  }

  public getRefreshToken(): string | null {
    return this.refreshToken || localStorage.getItem('refreshToken');
  }

  public isAuthenticated(): boolean {
    return !!this.getAccessToken();
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