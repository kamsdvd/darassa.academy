import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
  redirectTo?: string;
}

export const ProtectedRoute = ({ 
  children, 
  requiredRole,
  redirectTo = '/connexion'
}: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useStore();
  const location = useLocation();

  useEffect(() => {
    // Vérifier l'authentification au montage du composant
    if (!isAuthenticated) {
      console.log('Utilisateur non authentifié');
    } else if (requiredRole && user?.role !== requiredRole) {
      console.log(`Rôle requis: ${requiredRole}, Rôle actuel: ${user?.role}`);
    }
  }, [isAuthenticated, user, requiredRole]);

  if (!isAuthenticated) {
    // Rediriger vers la page de connexion avec l'URL de retour
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // Rediriger vers la page d'accès refusé si l'utilisateur n'a pas le rôle requis
    return <Navigate to="/acces-refuse" replace />;
  }

  return <>{children}</>;
}; 