import React from 'react';
import { useStore } from '../../store/useStore';
import PageTransition from '../../components/shared/PageTransition';
import { 
  Users, 
  BookOpen, 
  Calendar,
  Building,
  TrendingUp,
  AlertCircle,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CentreDashboard: React.FC = () => {
  const { user } = useStore();

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Tableau de bord centre de formation
          </h1>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-primary-50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-primary-600">Formateurs</p>
                  <p className="text-2xl font-bold text-primary-900">12</p>
                </div>
                <div className="bg-primary-100 rounded-full p-3">
                  <Users className="w-6 h-6 text-primary-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-primary-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+2 ce mois</span>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Formations actives</p>
                  <p className="text-2xl font-bold text-green-900">8</p>
                </div>
                <div className="bg-green-100 rounded-full p-3">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+3 nouvelles formations</span>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Apprenants</p>
                  <p className="text-2xl font-bold text-blue-900">156</p>
                </div>
                <div className="bg-blue-100 rounded-full p-3">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-blue-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+15% ce mois</span>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-600">Cours aujourd'hui</p>
                  <p className="text-2xl font-bold text-yellow-900">6</p>
                </div>
                <div className="bg-yellow-100 rounded-full p-3">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-yellow-600">
                <span>Dans 4 salles</span>
              </div>
            </div>
          </div>

          {/* Actions rapides */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Gestion des formateurs</h3>
              <p className="text-sm text-gray-500 mb-4">Gérez les formateurs de votre centre</p>
              <Link to="/centre/formateurs" className="text-primary-600 hover:text-primary-900 text-sm font-medium">
                Gérer les formateurs →
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Gestion des formations</h3>
              <p className="text-sm text-gray-500 mb-4">Gérez les formations de votre centre</p>
              <Link to="/centre/formations" className="text-green-600 hover:text-green-900 text-sm font-medium">
                Gérer les formations →
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

          {/* Prochains cours */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Prochains cours</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Développement Web - Groupe A</p>
                    <p className="text-sm text-gray-500">Salle B12 - 14:00 - 16:00</p>
                  </div>
                  <div className="bg-primary-100 rounded-full px-3 py-1">
                    <span className="text-sm font-medium text-primary-600">Dans 1h</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Base de données - Groupe B</p>
                    <p className="text-sm text-gray-500">Salle A05 - 16:30 - 18:30</p>
                  </div>
                  <div className="bg-gray-100 rounded-full px-3 py-1">
                    <span className="text-sm font-medium text-gray-600">Dans 3h30</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alertes et notifications */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Alertes et notifications</h2>
            <div className="space-y-4">
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-1 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Formation "Développement Web"</p>
                    <p className="text-sm text-yellow-700">Le formateur a signalé un problème avec le matériel de la salle B12</p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start">
                  <Users className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Nouveau formateur</p>
                    <p className="text-sm text-blue-700">Un nouveau formateur a été ajouté à votre centre</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CentreDashboard; 