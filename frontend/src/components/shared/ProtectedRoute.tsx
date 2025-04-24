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

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!isAuthenticated) {
          const userData = await authService.getCurrentUser();
          if (userData.success && userData.data && userData.data.user) {
            setUser(userData.data.user);
          }
        }
      } catch (error) {
        console.error('Erreur de vérification de l\'authentification:', error);
      }
    };

    checkAuth();
  }, [isAuthenticated, setUser]);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && user && user.role && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}; 