import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService, User, AuthError } from '../services/auth.service';

// Types
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: AuthError | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

// Créer le contexte
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AuthError | null>(null);
  const navigate = useNavigate();

  // Vérifier si l'utilisateur est déjà connecté au chargement
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          // Vérifier la validité du token et récupérer les informations utilisateur
          const response = await authService.getCurrentUser();
          setUser(response.user);
          setIsAuthenticated(true);
        }
      } catch (err) {
        authService.logout();
        setError(err as AuthError);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const validatePassword = (password: string): boolean => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return password.length >= minLength && 
           hasUpperCase && 
           hasLowerCase && 
           hasNumbers && 
           hasSpecialChar;
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Fonction de connexion
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      if (!validateEmail(email)) {
        throw { code: 'INVALID_EMAIL', message: 'Format d\'email invalide' };
      }

      const response = await authService.login(email, password);
      setUser(response.user);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (err) {
      setError(err as AuthError);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fonction d'inscription
  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      if (!validateEmail(email)) {
        throw { code: 'INVALID_EMAIL', message: 'Format d\'email invalide' };
      }

      if (!validatePassword(password)) {
        throw {
          code: 'INVALID_PASSWORD',
          message: 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial'
        };
      }

      const response = await authService.register({ name, email, password });
      setUser(response.user);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (err) {
      setError(err as AuthError);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fonction de déconnexion
  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 