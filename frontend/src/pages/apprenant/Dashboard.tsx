import React from 'react';
import { useStore } from '../../store/useStore';
import PageTransition from '../../components/shared/PageTransition';
import { 
  Calendar,
  BookOpen,
  FileText,
  Clock,
  TrendingUp,
  Award,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ApprenantDashboard: React.FC = () => {
  const { user } = useStore();

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Tableau de bord apprenant
          </h1>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-primary-50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-primary-600">Cours aujourd'hui</p>
                  <p className="text-2xl font-bold text-primary-900">2</p>
                </div>
                <div className="bg-primary-100 rounded-full p-3">
                  <Calendar className="w-6 h-6 text-primary-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-primary-600">
                <Clock className="w-4 h-4 mr-1" />
                <span>Prochain cours dans 1h</span>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Formations en cours</p>
                  <p className="text-2xl font-bold text-green-900">3</p>
                </div>
                <div className="bg-green-100 rounded-full p-3">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>Progression moyenne: 65%</span>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Évaluations</p>
                  <p className="text-2xl font-bold text-blue-900">4</p>
                </div>
                <div className="bg-blue-100 rounded-full p-3">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-blue-600">
                <span>Moyenne: 15/20</span>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-600">Certificats</p>
                  <p className="text-2xl font-bold text-yellow-900">1</p>
                </div>
                <div className="bg-yellow-100 rounded-full p-3">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-yellow-600">
                <span>2 en cours d'obtention</span>
              </div>
            </div>
          </div>

          {/* Actions rapides */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
                <Calendar className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Emploi du temps</h3>
              <p className="text-sm text-gray-500 mb-4">Consultez votre planning</p>
              <Link to="/apprenant/planning" className="text-primary-600 hover:text-primary-900 text-sm font-medium">
                Voir le planning →
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Ressources</h3>
              <p className="text-sm text-gray-500 mb-4">Accédez aux supports de cours</p>
              <Link to="/apprenant/ressources" className="text-green-600 hover:text-green-900 text-sm font-medium">
                Voir les ressources →
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Mes évaluations</h3>
              <p className="text-sm text-gray-500 mb-4">Consultez vos résultats</p>
              <Link to="/apprenant/evaluations" className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                Voir les résultats →
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
                    <p className="text-sm font-medium text-gray-900">Développement Web</p>
                    <p className="text-sm text-gray-500">Salle B12 - 14:00 - 16:00</p>
                  </div>
                  <div className="bg-primary-100 rounded-full px-3 py-1">
                    <span className="text-sm font-medium text-primary-600">Dans 1h</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Base de données</p>
                    <p className="text-sm text-gray-500">Salle A05 - 16:30 - 18:30</p>
                  </div>
                  <div className="bg-gray-100 rounded-full px-3 py-1">
                    <span className="text-sm font-medium text-gray-600">Dans 3h30</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progression des formations */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Progression des formations</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-900">Développement Web</p>
                  <span className="text-sm font-medium text-primary-600">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-gray-900">Base de données</p>
                  <span className="text-sm font-medium text-primary-600">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ApprenantDashboard; 