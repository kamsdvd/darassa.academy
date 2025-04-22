import { API_CONFIG } from '../config/api.config';
import axios, { AxiosInstance, AxiosError } from 'axios';

export class AuthService {
  private static instance: AuthService;
  private token: string | null = null;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.token = localStorage.getItem('token');
    this.axiosInstance = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (this.token) {
      this.setupAxiosInterceptors();
    }
  }

  private setupAxiosInterceptors() {
    // Supprimer les anciens intercepteurs s'ils existent
    if (this.axiosInstance.interceptors) {
      this.axiosInstance.interceptors.request.clear();
      this.axiosInstance.interceptors.response.clear();
    }

    // Ajouter le token à chaque requête
    this.axiosInstance.interceptors.request.use(
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

    // Gérer les erreurs d'authentification
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Token expiré ou invalide
          await this.logout();
          window.location.href = '/connexion';
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
      console.log('Tentative de connexion avec:', { email });
      
      const response = await this.axiosInstance.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
        email,
        password,
      });
      
      console.log('Réponse du serveur:', response.data);

      const { token, ...userData } = response.data;
      
      if (!token) {
        throw new Error('Token manquant dans la réponse');
      }

      this.token = token;
      localStorage.setItem('token', this.token);
      this.setupAxiosInterceptors();
      
      return {
        token: this.token,
        user: userData
      };
    } catch (error: any) {
      console.error('Erreur de connexion:', error.response?.data || error.message);
      const message = error.response?.data?.message || error.response?.data || 'Une erreur est survenue lors de la connexion';
      throw new Error(message);
    }
  }

  public async register(userData: any): Promise<any> {
    try {
      const response = await this.axiosInstance.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, userData);
      
      const { token, ...user } = response.data;
      
      if (token) {
        this.token = token;
        localStorage.setItem('token', this.token);
        this.setupAxiosInterceptors();
      }
      
      return {
        token: this.token,
        user
      };
    } catch (error: any) {
      console.error('Erreur d\'inscription:', error.response?.data || error.message);
      const message = error.response?.data?.message || 'Une erreur est survenue lors de l\'inscription';
      throw new Error(message);
    }
  }

  public async logout(): Promise<void> {
    try {
      if (this.token) {
        await this.axiosInstance.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    } finally {
      this.token = null;
      localStorage.removeItem('token');
      this.axiosInstance.defaults.headers.common['Authorization'] = '';
    }
  }

  public async getCurrentUser(): Promise<any> {
    if (!this.token) {
      throw new Error('Aucun token d\'authentification');
    }

    try {
      const response = await this.axiosInstance.get(API_CONFIG.ENDPOINTS.AUTH.ME);
      return response.data;
    } catch (error: any) {
      console.error('Erreur de récupération du profil:', error.response?.data || error.message);
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