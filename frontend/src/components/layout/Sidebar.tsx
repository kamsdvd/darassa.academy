import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { 
  Users, 
  Building, 
  FileText, 
  BookOpen, 
  Award, 
  Briefcase, 
  Calendar, 
  Settings, 
  LogOut,
  UserPlus,
  GraduationCap,
  ClipboardList,
  BarChart,
  UserCog,
  Home
} from 'lucide-react';
import { authService } from '../../services/auth.service';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { user, logout } = useStore();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      logout();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const renderAdminMenu = () => (
    <>
      <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
        Administration
      </div>
      <Link 
        to="/admin/dashboard" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/admin/dashboard') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <Home className="mr-3 h-5 w-5" />
        {isOpen && <span>Tableau de bord</span>}
      </Link>
      <Link 
        to="/admin/users" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/admin/users') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <Users className="mr-3 h-5 w-5" />
        {isOpen && <span>Gestion des utilisateurs</span>}
      </Link>
      <Link 
        to="/admin/centres" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/admin/centres') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <Building className="mr-3 h-5 w-5" />
        {isOpen && <span>Gestion des centres</span>}
      </Link>
      <Link 
        to="/admin/formations" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/admin/formations') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <BookOpen className="mr-3 h-5 w-5" />
        {isOpen && <span>Gestion des formations</span>}
      </Link>
      <Link 
        to="/admin/reports" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/admin/reports') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <FileText className="mr-3 h-5 w-5" />
        {isOpen && <span>Rapports</span>}
      </Link>
      <Link 
        to="/admin/settings" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/admin/settings') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <Settings className="mr-3 h-5 w-5" />
        {isOpen && <span>Paramètres</span>}
      </Link>
    </>
  );

  const renderCentreManagerMenu = () => (
    <>
      <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
        Gestion du centre
      </div>
      <Link 
        to="/centre/dashboard" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/centre/dashboard') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <Home className="mr-3 h-5 w-5" />
        {isOpen && <span>Tableau de bord</span>}
      </Link>
      <Link 
        to="/centre/formateurs" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/centre/formateurs') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <Users className="mr-3 h-5 w-5" />
        {isOpen && <span>Gestion des formateurs</span>}
      </Link>
      <Link 
        to="/centre/formations" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/centre/formations') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <BookOpen className="mr-3 h-5 w-5" />
        {isOpen && <span>Gestion des formations</span>}
      </Link>
      <Link 
        to="/centre/planning" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/centre/planning') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <Calendar className="mr-3 h-5 w-5" />
        {isOpen && <span>Planning</span>}
      </Link>
      <Link 
        to="/centre/etudiants" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/centre/etudiants') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <GraduationCap className="mr-3 h-5 w-5" />
        {isOpen && <span>Gestion des étudiants</span>}
      </Link>
      <Link 
        to="/centre/reports" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/centre/reports') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <FileText className="mr-3 h-5 w-5" />
        {isOpen && <span>Rapports</span>}
      </Link>
    </>
  );

  const renderFormateurMenu = () => (
    <>
      <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
        Espace formateur
      </div>
      <Link 
        to="/formateur/dashboard" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/formateur/dashboard') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <Home className="mr-3 h-5 w-5" />
        {isOpen && <span>Tableau de bord</span>}
      </Link>
      <Link 
        to="/formateur/cours" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/formateur/cours') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <BookOpen className="mr-3 h-5 w-5" />
        {isOpen && <span>Mes cours</span>}
      </Link>
      <Link 
        to="/formateur/etudiants" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/formateur/etudiants') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <Users className="mr-3 h-5 w-5" />
        {isOpen && <span>Mes étudiants</span>}
      </Link>
      <Link 
        to="/formateur/evaluations" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/formateur/evaluations') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <ClipboardList className="mr-3 h-5 w-5" />
        {isOpen && <span>Évaluations</span>}
      </Link>
      <Link 
        to="/formateur/planning" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/formateur/planning') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <Calendar className="mr-3 h-5 w-5" />
        {isOpen && <span>Mon planning</span>}
      </Link>
    </>
  );

  const renderEtudiantMenu = () => (
    <>
      <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
        Espace étudiant
      </div>
      <Link 
        to="/user/dashboard" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/user/dashboard') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <Home className="mr-3 h-5 w-5" />
        {isOpen && <span>Tableau de bord</span>}
      </Link>
      <Link 
        to="/user/formations" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/user/formations') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <BookOpen className="mr-3 h-5 w-5" />
        {isOpen && <span>Mes formations</span>}
      </Link>
      <Link 
        to="/user/certificats" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/user/certificats') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <Award className="mr-3 h-5 w-5" />
        {isOpen && <span>Mes certificats</span>}
      </Link>
      <Link 
        to="/user/opportunites" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/user/opportunites') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <Briefcase className="mr-3 h-5 w-5" />
        {isOpen && <span>Opportunités</span>}
      </Link>
      <Link 
        to="/user/planning" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/user/planning') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <Calendar className="mr-3 h-5 w-5" />
        {isOpen && <span>Mon planning</span>}
      </Link>
    </>
  );

  const renderDemandeurMenu = () => (
    <>
      <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
        Espace demandeur d'emploi
      </div>
      <Link 
        to="/user/dashboard" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/user/dashboard') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <Home className="mr-3 h-5 w-5" />
        {isOpen && <span>Tableau de bord</span>}
      </Link>
      <Link 
        to="/user/formations" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/user/formations') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <BookOpen className="mr-3 h-5 w-5" />
        {isOpen && <span>Formations disponibles</span>}
      </Link>
      <Link 
        to="/user/opportunites" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/user/opportunites') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <Briefcase className="mr-3 h-5 w-5" />
        {isOpen && <span>Opportunités d'emploi</span>}
      </Link>
      <Link 
        to="/user/cv" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/user/cv') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <FileText className="mr-3 h-5 w-5" />
        {isOpen && <span>Mon CV</span>}
      </Link>
      <Link 
        to="/user/candidatures" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/user/candidatures') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <ClipboardList className="mr-3 h-5 w-5" />
        {isOpen && <span>Mes candidatures</span>}
      </Link>
    </>
  );

  const renderEntrepriseMenu = () => (
    <>
      <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
        Espace entreprise
      </div>
      <Link 
        to="/entreprise/dashboard" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/entreprise/dashboard') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <Home className="mr-3 h-5 w-5" />
        {isOpen && <span>Tableau de bord</span>}
      </Link>
      <Link 
        to="/entreprise/employes" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/entreprise/employes') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <Users className="mr-3 h-5 w-5" />
        {isOpen && <span>Gestion des employés</span>}
      </Link>
      <Link 
        to="/entreprise/formations" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/entreprise/formations') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <BookOpen className="mr-3 h-5 w-5" />
        {isOpen && <span>Formations</span>}
      </Link>
      <Link 
        to="/entreprise/opportunites" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/entreprise/opportunites') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <Briefcase className="mr-3 h-5 w-5" />
        {isOpen && <span>Publier des offres</span>}
      </Link>
      <Link 
        to="/entreprise/candidatures" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/entreprise/candidatures') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <ClipboardList className="mr-3 h-5 w-5" />
        {isOpen && <span>Candidatures reçues</span>}
      </Link>
      <Link 
        to="/entreprise/statistiques" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/entreprise/statistiques') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <BarChart className="mr-3 h-5 w-5" />
        {isOpen && <span>Statistiques</span>}
      </Link>
    </>
  );

  const renderMenu = () => {
    if (!user) return null;

    switch (user.userType) {
      case 'admin':
        return renderAdminMenu();
      case 'centre_manager':
        return renderCentreManagerMenu();
      case 'formateur':
        return renderFormateurMenu();
      case 'etudiant':
        return renderEtudiantMenu();
      case 'demandeur':
        return renderDemandeurMenu();
      case 'entreprise':
        return renderEntrepriseMenu();
      default:
        return null;
    }
  };

  if (!user) return null;

  return (
    <div className={`h-full bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            {user.firstName?.charAt(0) || 'U'}
          </div>
          {isOpen && (
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</p>
              <p className="text-xs text-gray-500 capitalize">{user.userType?.replace('_', ' ')}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        {renderMenu()}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <button 
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
        >
          <LogOut className="mr-3 h-5 w-5" />
          {isOpen && <span>Déconnexion</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 