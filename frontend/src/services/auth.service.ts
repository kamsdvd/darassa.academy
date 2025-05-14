import axios, { AxiosError } from 'axios';
import { API_CONFIG } from '../config/api.config';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  roles: string[];
}

export interface AuthError {
  code: string;
  message: string;
  details?: any;
}

class AuthService {
  private static instance: AuthService;
  private baseURL: string;
  private refreshTokenTimeout: NodeJS.Timeout | null = null;

  private constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.setupAxiosInterceptors();
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  private setupAxiosInterceptors(): void {
    axios.interceptors.request.use(
      (config) => {
        const token = this.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    axios.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest?._retry) {
          originalRequest._retry = true;
          try {
            const tokens = await this.refreshTokens();
            this.setAuthCookies(tokens);
            originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
            return axios(originalRequest);
          } catch (refreshError) {
            this.logout();
            return Promise.reject(refreshError);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private setAuthCookies(tokens: AuthTokens): void {
    const accessTokenExpiry = new Date(Date.now() + tokens.expiresIn * 1000);
    const refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 jours

    document.cookie = `accessToken=${tokens.accessToken}; expires=${accessTokenExpiry.toUTCString()}; path=/; secure; samesite=strict`;
    document.cookie = `refreshToken=${tokens.refreshToken}; expires=${refreshTokenExpiry.toUTCString()}; path=/; secure; samesite=strict`;
    
    this.setupRefreshTokenTimeout(tokens.expiresIn);
  }

  private setupRefreshTokenTimeout(expiresIn: number): void {
    if (this.refreshTokenTimeout) {
      clearTimeout(this.refreshTokenTimeout);
    }
    
    // Rafraîchir le token 1 minute avant son expiration
    this.refreshTokenTimeout = setTimeout(
      () => this.refreshTokens(),
      (expiresIn - 60) * 1000
    );
  }

  private getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
    return null;
  }

  public getAccessToken(): string | null {
    return this.getCookie('accessToken');
  }

  private getRefreshToken(): string | null {
    return this.getCookie('refreshToken');
  }

  public async login(email: string, password: string): Promise<{ user: User; tokens: AuthTokens }> {
    try {
      const response = await axios.post(`${this.baseURL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`, {
        email,
        password
      });

      const { user, ...tokens } = response.data;
      this.setAuthCookies(tokens);
      return { user, tokens };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async register(userData: {
    email: string;
    password: string;
    name: string;
  }): Promise<{ user: User; tokens: AuthTokens }> {
    try {
      const response = await axios.post(`${this.baseURL}${API_CONFIG.ENDPOINTS.AUTH.REGISTER}`, userData);
      const { user, ...tokens } = response.data;
      this.setAuthCookies(tokens);
      return { user, tokens };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private async refreshTokens(): Promise<AuthTokens> {
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

  public logout(): void {
    if (this.refreshTokenTimeout) {
      clearTimeout(this.refreshTokenTimeout);
    }
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
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