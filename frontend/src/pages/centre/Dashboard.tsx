import React from 'react';
import { useStore } from '../../store/useStore';
import PageTransition from '../../components/shared/PageTransition';
import { 
  Users, 
  BookOpen, 
  BarChart,
  TrendingUp,
  UserPlus,
  AlertCircle,
  Building2,
  Settings,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CentreDashboard: React.FC = () => {
  const { user } = useStore();

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Tableau de bord du centre
          </h1>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Formateurs</p>
                  <h3 className="text-2xl font-bold">12</h3>
                </div>
                <Users className="h-8 w-8 text-primary-600" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Formations</p>
                  <h3 className="text-2xl font-bold">25</h3>
                </div>
                <BookOpen className="h-8 w-8 text-primary-600" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Apprenants</p>
                  <h3 className="text-2xl font-bold">156</h3>
                </div>
                <Users className="h-8 w-8 text-primary-600" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Taux de réussite</p>
                  <h3 className="text-2xl font-bold">85%</h3>
                </div>
                <TrendingUp className="h-8 w-8 text-primary-600" />
              </div>
            </div>
          </div>

          {/* Actions rapides */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link to="/centre/formateurs" className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                Gérer les formateurs
              </Link>
              <Link to="/centre/courses" className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                Gérer les formations
              </Link>
              <Link to="/centre/planning" className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                Voir le planning
              </Link>
            </div>
          </div>

          {/* Dernières activités */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Dernières activités</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-primary-100 rounded-full p-2 mr-3">
                      <UserPlus className="w-4 h-4 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Nouveau formateur</p>
                      <p className="text-sm text-gray-500">John Doe</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">Il y a 2 heures</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-green-100 rounded-full p-2 mr-3">
                      <BookOpen className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Formation terminée</p>
                      <p className="text-sm text-gray-500">Développement Web</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">Il y a 5 heures</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-yellow-100 rounded-full p-2 mr-3">
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Salle indisponible</p>
                      <p className="text-sm text-gray-500">Salle 101 en maintenance</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">Il y a 1 jour</span>
                </div>
              </div>
            </div>
          </div>

          {/* Alertes système */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Alertes système</h2>
            <div className="space-y-4">
              <div className="bg-red-50 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-1 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-red-800">Planning</p>
                    <p className="text-sm text-red-700">Conflit d'horaire détecté</p>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-1 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Ressources</p>
                    <p className="text-sm text-yellow-700">Matériel pédagogique manquant</p>
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