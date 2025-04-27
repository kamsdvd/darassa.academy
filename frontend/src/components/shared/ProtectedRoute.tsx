import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { AuthService } from '../../services/authService';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const { isAuthenticated, user, setUser } = useStore();
  const location = useLocation();
  const authService = AuthService.getInstance();

  const getUserDashboardPath = (role: string): string => {
    switch (role) {
      case 'admin':
        return '/admin/dashboard';
      case 'centre_manager':
        return '/centre/dashboard';
      case 'formateur':
        return '/formateur/dashboard';
      case 'entreprise':
        return '/entreprise/dashboard';
      case 'etudiant':
      case 'demandeur':
      default:
        return '/dashboard';
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!isAuthenticated) {
          const userData = await authService.getCurrentUser();
          if (userData.success && userData.data && userData.data.user) {
            setUser(userData.data.user);
          } else {
            // Si la vérification échoue, on nettoie l'état
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Erreur de vérification de l\'authentification:', error);
        setUser(null);
      }
    };

    checkAuth();
  }, [isAuthenticated, setUser]);

  if (!isAuthenticated) {
    return <Navigate to="/connexion" state={{ from: location }} replace />;
  }

  if (roles && user && user.role && !roles.includes(user.role)) {
    // Rediriger vers le tableau de bord approprié de l'utilisateur
    const redirectPath = getUserDashboardPath(user.role);
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}; 