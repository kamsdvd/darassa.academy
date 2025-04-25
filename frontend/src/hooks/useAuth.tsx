import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { API_CONFIG } from '../config/api.config';
import axios from 'axios';

// Types
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<any>;
  register: (userData: { firstName: string; lastName: string; email: string; password: string }) => Promise<any>;
  logout: () => Promise<void>;
}

// Créer le contexte
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Vérifier le token et charger l'utilisateur
      const checkAuth = async () => {
        try {
          const response = await axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.ME}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data.data);
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem('token');
        } finally {
          setLoading(false);
        }
      };
      checkAuth();
    } else {
      setLoading(false);
    }
  }, []);

  // Fonction de connexion
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGIN}`, { email, password });
      const { token, ...userData } = response.data;
      
      localStorage.setItem('token', token);
      setUser(userData);
      setIsAuthenticated(true);
      
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new Error(error.response.data.message || 'Erreur lors de la connexion');
      } else if (error.request) {
        throw new Error('Impossible de contacter le serveur');
      } else {
        throw new Error('Une erreur est survenue');
      }
    }
  };

  // Fonction d'inscription
  const register = async (userData: { firstName: string; lastName: string; email: string; password: string }) => {
    try {
      const response = await axios.post(`${API_CONFIG.BASE_URL}/auth/register`, userData);
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      setUser(user);
      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'inscription'
      };
    }
  };

  // Fonction de déconnexion
  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await axios.post(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGOUT}`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personnalisé
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 