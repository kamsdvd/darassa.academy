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