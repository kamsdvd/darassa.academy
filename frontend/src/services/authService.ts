import axios from 'axios';
import { API_CONFIG } from '../config/api.config';

interface LoginResponse {
  success: boolean;
  data: {
    token: string;
    user: {
      _id: string;
      name: string;
      email: string;
      role: string;
      phone?: string;
      company?: string;
      position?: string;
    };
  };
  message?: string;
}

interface RegisterResponse {
  success: boolean;
  data: {
    user: {
      _id: string;
      name: string;
      email: string;
      role: string;
      phone?: string;
      company?: string;
      position?: string;
    };
  };
  message?: string;
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
      
      if (response.data.success && response.data.data) {
        this.setToken(response.data.data.token);
        
        return {
          success: true,
          data: {
            user: response.data.data,
            token: response.data.data.token
          }
        };
      }
      
      throw new Error('Format de réponse invalide');
    } catch (error: any) {
      console.error('Erreur de connexion:', error);
      throw error;
    }
  }

  public async register(userData: {
    name: string;
    email: string;
    password: string;
    role: string;
    phone?: string;
    company?: string;
    position?: string;
  }): Promise<RegisterResponse> {
    try {
      const response = await axios.post(`${this.baseURL}${API_CONFIG.ENDPOINTS.AUTH.REGISTER}`, userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  public async logout(): Promise<void> {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  public async getCurrentUser(): Promise<LoginResponse> {
    try {
      const token = this.getToken();
      if (!token) {
        throw new Error('Token non trouvé');
      }
      
      const response = await axios.get(`${this.baseURL}${API_CONFIG.ENDPOINTS.AUTH.ME}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
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
