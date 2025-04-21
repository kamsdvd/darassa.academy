import { API_CONFIG } from '../config/api.config';
import axios from 'axios';

export class AuthService {
  private static instance: AuthService;
  private token: string | null = null;

  private constructor() {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.setupAxiosInterceptors();
    }
  }

  private setupAxiosInterceptors() {
    axios.interceptors.request.use(
      (config) => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.logout();
        }
        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async login(email: string, password: string): Promise<any> {
    try {
      const response = await axios.post(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`, {
        email,
        password,
      });
      this.token = response.data.token;
      localStorage.setItem('token', this.token);
      this.setupAxiosInterceptors();
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Une erreur est survenue lors de la connexion';
      throw new Error(message);
    }
  }

  public async register(userData: any): Promise<any> {
    try {
      const response = await axios.post(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REGISTER}`, userData);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Une erreur est survenue lors de l\'inscription';
      throw new Error(message);
    }
  }

  public async logout(): Promise<void> {
    if (this.token) {
      try {
        await axios.post(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGOUT}`);
      } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
      }
    }
    this.token = null;
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  }

  public async getCurrentUser(): Promise<any> {
    if (!this.token) {
      throw new Error('Aucun token d\'authentification');
    }

    try {
      const response = await axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.ME}`);
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Une erreur est survenue lors de la récupération du profil';
      throw new Error(message);
    }
  }

  public getToken(): string | null {
    return this.token;
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }
} 