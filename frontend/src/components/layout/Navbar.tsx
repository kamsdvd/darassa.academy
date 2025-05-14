import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useStore();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-primary-600">Darassa</span>
          </Link>

          {/* Navigation principale */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium ${
                isActive('/') ? 'text-primary-600' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Accueil
            </Link>
            <Link
              to="/formations"
              className={`text-sm font-medium ${
                isActive('/formations') ? 'text-primary-600' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Formations
            </Link>
            <Link
              to="/opportunites"
              className={`text-sm font-medium ${
                isActive('/opportunites') ? 'text-primary-600' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Opportunités
            </Link>
          </div>

          {/* Boutons de connexion/inscription ou profil */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  Tableau de bord
                </Link>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/connexion"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900"
                >
                  Connexion
                </Link>
                <Link
                  to="/inscription"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                >
                  S'inscrire
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 