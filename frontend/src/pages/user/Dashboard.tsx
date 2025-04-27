import React from 'react';
import { useStore } from '../../store/useStore';
import PageTransition from '../../components/shared/PageTransition';
import { 
  Users, 
  Building, 
  BarChart,
  TrendingUp,
  UserPlus,
  AlertCircle,
  Building2,
  Settings,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { user } = useStore();

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Tableau de bord administrateur
          </h1>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Utilisateurs</p>
                  <h3 className="text-2xl font-bold">1,234</h3>
                </div>
                <Users className="h-8 w-8 text-primary-600" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Centres de formation</p>
                  <h3 className="text-2xl font-bold">45</h3>
                </div>
                <Building2 className="h-8 w-8 text-primary-600" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Formations actives</p>
                  <h3 className="text-2xl font-bold">89</h3>
                </div>
                <BarChart3 className="h-8 w-8 text-primary-600" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Taux de complétion</p>
                  <h3 className="text-2xl font-bold">78%</h3>
                </div>
                <Settings className="h-8 w-8 text-primary-600" />
              </div>
            </div>
          </div>

          {/* Actions rapides */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <button className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                Ajouter un utilisateur
              </button>
              <button className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                Créer un centre
              </button>
              <button className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                Générer un rapport
              </button>
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
                      <p className="text-sm font-medium text-gray-900">Nouveau centre de formation</p>
                      <p className="text-sm text-gray-500">Centre de Formation Dakar</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">Il y a 2 heures</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-yellow-100 rounded-full p-2 mr-3">
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Alerte système</p>
                      <p className="text-sm text-gray-500">Tentatives de connexion suspectes</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">Il y a 5 heures</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-green-100 rounded-full p-2 mr-3">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Nouvelle formation</p>
                      <p className="text-sm text-gray-500">Développement Web Avancé</p>
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
                    <p className="text-sm font-medium text-red-800">Sécurité</p>
                    <p className="text-sm text-red-700">Tentatives de connexion suspectes détectées</p>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-1 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Performance</p>
                    <p className="text-sm text-yellow-700">Temps de réponse élevé sur le serveur</p>
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

export default AdminDashboard; 