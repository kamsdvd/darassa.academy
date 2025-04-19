import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const { isAuthenticated, user } = useStore();
  const location = useLocation();

  useEffect(() => {
    // Vérifier si l'utilisateur est authentifié au chargement
    if (!isAuthenticated) {
      console.log('Utilisateur non authentifié, redirection vers la page de connexion');
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    // Rediriger vers la page de connexion avec l'URL de retour
    return <Navigate to="/connexion" state={{ from: location }} replace />;
  }

  // Vérifier les rôles si spécifiés
  if (roles && user && !roles.includes(user.role)) {
    // Rediriger vers la page d'accueil si l'utilisateur n'a pas le rôle requis
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 