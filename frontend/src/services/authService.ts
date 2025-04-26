import axios from 'axios';
import { API_CONFIG } from '../config/api.config';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

interface RegisterResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

export class AuthService {
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

  public async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await axios.post(`${this.baseURL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`, {
        email,
        password,
      });
      
      if (response.data && response.data.token) {
        this.setToken(response.data.token);
        return response.data;
      }
      
      throw new Error('Format de réponse invalide');
    } catch (error: any) {
      console.error('Erreur de connexion:', error);
      throw this.handleError(error);
    }
  }

  public async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<RegisterResponse> {
    try {
      const response = await axios.post(`${this.baseURL}${API_CONFIG.ENDPOINTS.AUTH.REGISTER}`, userData);
      
      if (response.data && response.data.token) {
        this.setToken(response.data.token);
        return response.data;
      }
      
      throw new Error('Format de réponse invalide');
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async logout(): Promise<void> {
    try {
      // Nettoyage des données d'authentification
      localStorage.removeItem('token');
      sessionStorage.clear();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  }

  public async getCurrentUser(): Promise<any | null> {
    try {
      const token = this.getToken();
      if (!token) return null;

      const response = await axios.get(`${this.baseURL}${API_CONFIG.ENDPOINTS.AUTH.ME}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data) {
        return response.data;
      }
      
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      return null;
    }
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private handleError(error: any) {
    if (error.response) {
      return new Error(error.response.data.message || 'Une erreur est survenue');
    }
    return new Error('Erreur de connexion au serveur');
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }
}

export default AuthService.getInstance();
