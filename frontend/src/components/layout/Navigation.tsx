import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Home, LogIn, LogOut, User, ChevronDown, GraduationCap, Briefcase } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { AuthService } from '../../services/authService';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useStore();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
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

  // Déterminer les rôles disponibles pour l'utilisateur
  const availableRoles = user?.roles || [];
  // Si l'utilisateur est étudiant ou apprenant, il a accès à l'espace apprenant
  const isApprenant = availableRoles.includes('apprenant') || availableRoles.includes('etudiant');
  // Si l'utilisateur est demandeur d'emploi ou étudiant/apprenant, il a accès à l'espace demandeur
  const isDemandeur = availableRoles.includes('demandeur') || isApprenant;

  const handleRoleSelect = (role: string) => {
    setIsUserMenuOpen(false);
    switch (role) {
      case 'apprenant':
        navigate('/apprenant/dashboard');
        break;
      case 'demandeur':
        navigate('/demandeur/dashboard');
        break;
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

            {/* Menu utilisateur */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <User className="w-5 h-5" />
                  <span>{user.firstName || 'Mon compte'}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Menu déroulant */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      {isApprenant && (
                        <button
                          onClick={() => handleRoleSelect('apprenant')}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          <GraduationCap className="w-5 h-5 mr-2" />
                          Espace Apprenant
                        </button>
                      )}
                      {isDemandeur && (
                        <button
                          onClick={() => handleRoleSelect('demandeur')}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          <Briefcase className="w-5 h-5 mr-2" />
                          Espace Demandeur d'emploi
                        </button>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                      >
                        <LogOut className="w-5 h-5 mr-2" />
                        Déconnexion
                      </button>
                    </div>
                  </div>
                )}
              </div>
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

            {/* Menu utilisateur mobile */}
            {isAuthenticated && user ? (
              <>
                {isApprenant && (
                  <button
                    onClick={() => {
                      handleRoleSelect('apprenant');
                      toggleMenu();
                    }}
                    className="flex items-center w-full text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium"
                  >
                    <GraduationCap className="w-5 h-5 mr-2" />
                    Espace Apprenant
                  </button>
                )}
                {isDemandeur && (
                  <button
                    onClick={() => {
                      handleRoleSelect('demandeur');
                      toggleMenu();
                    }}
                    className="flex items-center w-full text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium"
                  >
                    <Briefcase className="w-5 h-5 mr-2" />
                    Espace Demandeur d'emploi
                  </button>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="flex items-center w-full text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Déconnexion
                </button>
              </>
            ) : (
              <Link
                to="/connexion"
                className="flex items-center text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-base font-medium"
                onClick={toggleMenu}
              >
                <LogIn className="w-5 h-5 mr-2" />
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