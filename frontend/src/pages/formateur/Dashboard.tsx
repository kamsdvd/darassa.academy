import React from 'react';
import { useStore } from '../../store/useStore';
import PageTransition from '../../components/shared/PageTransition';
import { 
  Users, 
  BookOpen, 
  Calendar,
  FileText,
  Award,
  Clock,
  AlertCircle,
  TrendingUp,
  UserPlus,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FormateurDashboard: React.FC = () => {
  const { user } = useStore();

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Tableau de bord du formateur
          </h1>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Formations en cours</p>
                  <h3 className="text-2xl font-bold">3</h3>
                </div>
                <BookOpen className="h-8 w-8 text-primary-600" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Apprenants</p>
                  <h3 className="text-2xl font-bold">45</h3>
                </div>
                <Users className="h-8 w-8 text-primary-600" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Heures de formation</p>
                  <h3 className="text-2xl font-bold">120</h3>
                </div>
                <Clock className="h-8 w-8 text-primary-600" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Taux de réussite</p>
                  <h3 className="text-2xl font-bold">92%</h3>
                </div>
                <TrendingUp className="h-8 w-8 text-primary-600" />
              </div>
            </div>
          </div>

          {/* Actions rapides */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link to="/formateur/cours" className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                Gérer mes cours
              </Link>
              <Link to="/formateur/planning" className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                Voir mon planning
              </Link>
              <Link to="/formateur/ressources" className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                Ressources pédagogiques
              </Link>
            </div>
          </div>

          {/* Prochains cours */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Prochains cours</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-primary-100 rounded-full p-2 mr-3">
                      <Calendar className="w-4 h-4 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Développement Web</p>
                      <p className="text-sm text-gray-500">Aujourd'hui, 14h00 - 17h00</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">Salle 101</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-primary-100 rounded-full p-2 mr-3">
                      <Calendar className="w-4 h-4 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Design UI/UX</p>
                      <p className="text-sm text-gray-500">Demain, 09h00 - 12h00</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">Salle 203</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-primary-100 rounded-full p-2 mr-3">
                      <Calendar className="w-4 h-4 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Marketing Digital</p>
                      <p className="text-sm text-gray-500">Jeudi, 13h00 - 16h00</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">Salle 105</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tâches à faire */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Tâches à faire</h2>
            <div className="space-y-4">
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-1 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Évaluation</p>
                    <p className="text-sm text-yellow-700">Corriger les devoirs du module React</p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start">
                  <FileText className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Préparation</p>
                    <p className="text-sm text-blue-700">Préparer le support de cours pour UI/UX</p>
                  </div>
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
                    <p className="text-sm text-red-700">Conflit d'horaire détecté pour le cours de jeudi</p>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-1 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Ressources</p>
                    <p className="text-sm text-yellow-700">Mise à jour du matériel pédagogique requise</p>
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

export default FormateurDashboard; 