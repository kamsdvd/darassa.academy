import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Home, LogIn, LogOut, User } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { AuthService } from '../../services/authService';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useStore();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      const authService = AuthService.getInstance();
      await authService.logout();
      logout();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-heading font-bold text-primary-600">Darassa Academy</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
              Accueil
            </Link>
            <Link to="/formations" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
              Formations
            </Link>
            <Link to="/affiliation" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
              Affiliation
            </Link>
            <Link to="/opportunites" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
              Opportunités
            </Link>
            <Link to="/entreprises" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
              Entreprises
            </Link>

            {/* Boutons d'authentification */}
            {isAuthenticated ? (
              <>
                <Link 
                  to={user?.role === 'admin' ? '/admin/dashboard' : 
                      user?.role === 'centre_manager' ? '/centre/dashboard' : 
                      user?.role === 'formateur' ? '/formateur/dashboard' : 
                      user?.role === 'entreprise' ? '/entreprise/dashboard' : 
                      '/dashboard'} 
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <User className="inline-block w-5 h-5 mr-1" />
                  {user?.firstName || 'Dashboard'}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <LogOut className="w-5 h-5 mr-1" />
                  Déconnexion
                </button>
              </>
            ) : (
              <Link
                to="/connexion"
                className="flex items-center bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
              >
                <LogIn className="w-5 h-5 mr-1" />
                Connexion
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <span className="sr-only">Ouvrir le menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              <Home className="inline-block w-5 h-5 mr-2" />
              Accueil
            </Link>
            <Link
              to="/formations"
              className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              Formations
            </Link>
            <Link
              to="/affiliation"
              className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              Affiliation
            </Link>
            <Link
              to="/opportunites"
              className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              Opportunités
            </Link>
            <Link
              to="/entreprises"
              className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
              onClick={toggleMenu}
            >
              Entreprises
            </Link>

            {/* Boutons d'authentification mobile */}
            {isAuthenticated ? (
              <>
                <Link
                  to={user?.role === 'admin' ? '/admin/dashboard' : 
                      user?.role === 'centre_manager' ? '/centre/dashboard' : 
                      user?.role === 'formateur' ? '/formateur/dashboard' : 
                      user?.role === 'entreprise' ? '/entreprise/dashboard' : 
                      '/dashboard'}
                  className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={toggleMenu}
                >
                  <User className="inline-block w-5 h-5 mr-2" />
                  {user?.firstName || 'Dashboard'}
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="w-full text-left text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                >
                  <LogOut className="inline-block w-5 h-5 mr-2" />
                  Déconnexion
                </button>
              </>
            ) : (
              <Link
                to="/connexion"
                className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu}
              >
                <LogIn className="inline-block w-5 h-5 mr-2" />
                Connexion
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation; 