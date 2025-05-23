import axios, { AxiosError } from 'axios';
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
  private retryCount: number = 0;
  private maxRetries: number = 3;
  private token: string | null = null;

  private constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.token = localStorage.getItem('token');
    
    // Configurer un intercepteur pour gérer les erreurs 401/403
    axios.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          // Si l'erreur est due à un token expiré, déconnecter l'utilisateur
          if (this.isAuthenticated()) {
            console.log('Session expirée, déconnexion...');
            await this.logout();
            window.location.href = '/connexion';
          }
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

  public async login(email: string, password: string): Promise<LoginResponse> {
    try {
      this.retryCount = 0;
      const response = await axios.post(`${this.baseURL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`, {
        email,
        password,
      });
      
      if (response.data.data) {
        const { user, tokens } = response.data.data;
        this.token = tokens.accessToken;
        localStorage.setItem('token', tokens.accessToken);

        // Mapper userType en role pour la compatibilité frontend
        const mappedUser = {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.userType // Mapper userType vers role
        };

        return {
          token: tokens.accessToken,
          user: mappedUser
        };
      }
      throw new Error('Format de réponse invalide');
    } catch (error) {
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
      
      if (response.data.data) {
        const { user, tokens } = response.data.data;
        this.token = tokens.accessToken;
        localStorage.setItem('token', tokens.accessToken);

        // Mapper userType en role pour la compatibilité frontend
        const mappedUser = {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.userType
        };

        return {
          token: tokens.accessToken,
          user: mappedUser
        };
      }
      throw new Error('Format de réponse invalide');
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      throw this.handleError(error);
    }
  }

  public async logout(): Promise<void> {
    try {
      // Nettoyage des données d'authentification
      localStorage.removeItem('token');
      sessionStorage.clear();
      this.token = null;
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

      if (response.data.data && response.data.data.user) {
        const user = response.data.data.user;
        return {
          ...user,
          role: user.userType
        };
      }
      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
      
      // Si l'erreur est 401 ou 403, déconnecter l'utilisateur
      if (error instanceof AxiosError && (error.response?.status === 401 || error.response?.status === 403)) {
        await this.logout();
      }
      
      return null;
    }
  }

  public getToken(): string | null {
    return this.token;
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private handleError(error: unknown): Error {
    if (error instanceof AxiosError) {
      if (error.response) {
        // Le serveur a répondu avec un code d'erreur
        console.error('Erreur serveur:', error.response.status, error.response.data);
        
        // Si c'est une erreur 404, vérifier si c'est un problème de route
        if (error.response.status === 404) {
          console.error('Route non trouvée. Vérifiez la configuration de l\'API.');
        }
        
        return new Error(error.response.data.message || 'Erreur serveur');
      } else if (error.request) {
        // La requête a été faite mais pas de réponse
        console.error('Pas de réponse du serveur:', error.request);
        
        // Si nous n'avons pas dépassé le nombre maximum de tentatives, réessayer
        if (this.retryCount < this.maxRetries) {
          this.retryCount++;
          console.log(`Tentative de reconnexion (${this.retryCount}/${this.maxRetries})...`);
          return new Error('Tentative de reconnexion...');
        }
        
        return new Error('Impossible de contacter le serveur. Veuillez vérifier votre connexion internet.');
      }
    }
    
    console.error('Erreur inattendue:', error);
    return new Error('Une erreur inattendue est survenue');
  }
}

export default AuthService.getInstance();
