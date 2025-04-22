import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { AuthService } from '../../services/authService';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const { isAuthenticated, user, setUser } = useStore();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Si l'utilisateur est déjà authentifié, pas besoin de vérifier
        if (isAuthenticated) {
          setIsLoading(false);
          return;
        }

        // Vérifier si un token existe
        const authService = AuthService.getInstance();
        const token = authService.getToken();
        
        if (!token) {
          setIsLoading(false);
          return;
        }

        // Récupérer les informations de l'utilisateur
        const userData = await authService.getCurrentUser();
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'authentification:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [isAuthenticated, setUser]);

  // Afficher un indicateur de chargement pendant la vérification
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Ne pas rediriger automatiquement, seulement si l'utilisateur tente d'accéder à une route protégée
  if (!isAuthenticated && location.pathname !== '/connexion') {
    return <Navigate to="/connexion" state={{ from: location }} replace />;
  }

  // Vérifier les rôles si spécifiés
  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 