import React from 'react';
import { useStore } from '../../store/useStore';
import PageTransition from '../../components/shared/PageTransition';
import { 
  Users, 
  BookOpen, 
  FileText, 
  Settings, 
  Calendar, 
  Award,
  BarChart,
  Building,
  GraduationCap,
  Briefcase
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useStore();

  const renderAdminDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
          <Users className="w-6 h-6 text-primary-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Gestion des utilisateurs</h3>
        <p className="text-sm text-gray-500 mb-4">Gérez les utilisateurs et leurs permissions</p>
        <Link to="/admin/users" className="text-primary-600 hover:text-primary-900 text-sm font-medium">
          Gérer les utilisateurs →
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
          <Building className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Centres de formation</h3>
        <p className="text-sm text-gray-500 mb-4">Gérez les centres de formation</p>
        <Link to="/admin/centres" className="text-green-600 hover:text-green-900 text-sm font-medium">
          Gérer les centres →
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
          <BarChart className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Statistiques</h3>
        <p className="text-sm text-gray-500 mb-4">Consultez les statistiques globales</p>
        <Link to="/admin/stats" className="text-blue-600 hover:text-blue-900 text-sm font-medium">
          Voir les statistiques →
        </Link>
      </div>
    </div>
  );

  const renderCentreManagerDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
          <GraduationCap className="w-6 h-6 text-primary-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Formateurs</h3>
        <p className="text-sm text-gray-500 mb-4">Gérez les formateurs de votre centre</p>
        <Link to="/centre/formateurs" className="text-primary-600 hover:text-primary-900 text-sm font-medium">
          Gérer les formateurs →
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
          <BookOpen className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Cours</h3>
        <p className="text-sm text-gray-500 mb-4">Gérez les cours de votre centre</p>
        <Link to="/centre/courses" className="text-green-600 hover:text-green-900 text-sm font-medium">
          Gérer les cours →
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
          <Calendar className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Planning</h3>
        <p className="text-sm text-gray-500 mb-4">Gérez le planning des formations</p>
        <Link to="/centre/planning" className="text-blue-600 hover:text-blue-900 text-sm font-medium">
          Voir le planning →
        </Link>
      </div>
    </div>
  );

  const renderFormateurDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
          <Calendar className="w-6 h-6 text-primary-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Mes cours</h3>
        <p className="text-sm text-gray-500 mb-4">Consultez votre planning de cours</p>
        <Link to="/formateur/cours" className="text-primary-600 hover:text-primary-900 text-sm font-medium">
          Voir mes cours →
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
          <FileText className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Ressources</h3>
        <p className="text-sm text-gray-500 mb-4">Accédez aux ressources pédagogiques</p>
        <Link to="/formateur/ressources" className="text-green-600 hover:text-green-900 text-sm font-medium">
          Voir les ressources →
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
          <Award className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Évaluations</h3>
        <p className="text-sm text-gray-500 mb-4">Gérez les évaluations des apprenants</p>
        <Link to="/formateur/evaluations" className="text-blue-600 hover:text-blue-900 text-sm font-medium">
          Voir les évaluations →
        </Link>
      </div>
    </div>
  );

  const renderEntrepriseDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
          <Users className="w-6 h-6 text-primary-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Employés</h3>
        <p className="text-sm text-gray-500 mb-4">Gérez les formations de vos employés</p>
        <Link to="/entreprise/employes" className="text-primary-600 hover:text-primary-900 text-sm font-medium">
          Gérer les employés →
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
          <BookOpen className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Cours</h3>
        <p className="text-sm text-gray-500 mb-4">Consultez les cours disponibles</p>
        <Link to="/entreprise/courses" className="text-green-600 hover:text-green-900 text-sm font-medium">
          Voir les cours →
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
          <BarChart className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Rapports</h3>
        <p className="text-sm text-gray-500 mb-4">Suivez la progression de vos employés</p>
        <Link to="/entreprise/rapports" className="text-blue-600 hover:text-blue-900 text-sm font-medium">
          Voir les rapports →
        </Link>
      </div>
    </div>
  );

  const renderUserDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
          <BookOpen className="w-6 h-6 text-primary-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Mes cours</h3>
        <p className="text-sm text-gray-500 mb-4">Accédez à vos cours en cours</p>
        <Link to="/courses" className="text-primary-600 hover:text-primary-900 text-sm font-medium">
          Voir mes cours →
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
          <Award className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Mes certificats</h3>
        <p className="text-sm text-gray-500 mb-4">Consultez vos certificats obtenus</p>
        <Link to="/certificats" className="text-green-600 hover:text-green-900 text-sm font-medium">
          Voir mes certificats →
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
          <Briefcase className="w-6 h-6 text-blue-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Opportunités</h3>
        <p className="text-sm text-gray-500 mb-4">Découvrez les opportunités professionnelles</p>
        <Link to="/opportunites" className="text-blue-600 hover:text-blue-900 text-sm font-medium">
          Voir les opportunités →
        </Link>
      </div>
    </div>
  );

  const getDashboardContent = () => {
    switch (user?.role) {
      case 'admin':
        return renderAdminDashboard();
      case 'centre_manager':
        return renderCentreManagerDashboard();
      case 'formateur':
        return renderFormateurDashboard();
      case 'entreprise':
        return renderEntrepriseDashboard();
      default:
        return renderUserDashboard();
    }
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Bienvenue, {user?.firstName}!
          </h1>
          {getDashboardContent()}
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard; 