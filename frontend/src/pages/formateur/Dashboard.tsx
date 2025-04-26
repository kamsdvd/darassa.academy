import React from 'react';
import { useStore } from '../../store/useStore';
import PageTransition from '../../components/shared/PageTransition';
import { 
  Calendar,
  BookOpen,
  Users,
  FileText,
  Clock,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FormateurDashboard: React.FC = () => {
  const { user } = useStore();

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Tableau de bord formateur
          </h1>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-primary-50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-primary-600">Cours aujourd'hui</p>
                  <p className="text-2xl font-bold text-primary-900">3</p>
                </div>
                <div className="bg-primary-100 rounded-full p-3">
                  <Calendar className="w-6 h-6 text-primary-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-primary-600">
                <Clock className="w-4 h-4 mr-1" />
                <span>Prochain cours dans 30min</span>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Formations actives</p>
                  <p className="text-2xl font-bold text-green-900">4</p>
                </div>
                <div className="bg-green-100 rounded-full p-3">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>2 nouvelles formations</span>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Apprenants</p>
                  <p className="text-2xl font-bold text-blue-900">45</p>
                </div>
                <div className="bg-blue-100 rounded-full p-3">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-blue-600">
                <span>4 groupes</span>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-600">Évaluations en attente</p>
                  <p className="text-2xl font-bold text-yellow-900">8</p>
                </div>
                <div className="bg-yellow-100 rounded-full p-3">
                  <FileText className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-yellow-600">
                <span>À évaluer cette semaine</span>
              </div>
            </div>
          </div>

          {/* Actions rapides */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
                <Calendar className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Planning des cours</h3>
              <p className="text-sm text-gray-500 mb-4">Consultez votre emploi du temps</p>
              <Link to="/formateur/planning" className="text-primary-600 hover:text-primary-900 text-sm font-medium">
                Voir le planning →
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Ressources pédagogiques</h3>
              <p className="text-sm text-gray-500 mb-4">Accédez aux supports de cours</p>
              <Link to="/formateur/ressources" className="text-green-600 hover:text-green-900 text-sm font-medium">
                Voir les ressources →
              </Link>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Évaluations</h3>
              <p className="text-sm text-gray-500 mb-4">Gérez les évaluations des apprenants</p>
              <Link to="/formateur/evaluations" className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                Gérer les évaluations →
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
                    <span className="text-sm font-medium text-primary-600">Dans 30min</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Base de données - Groupe B</p>
                    <p className="text-sm text-gray-500">Salle A05 - 16:30 - 18:30</p>
                  </div>
                  <div className="bg-gray-100 rounded-full px-3 py-1">
                    <span className="text-sm font-medium text-gray-600">Dans 2h30</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Évaluations en attente */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Évaluations en attente</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Développement Web - Groupe A</p>
                    <p className="text-sm text-gray-500">5 apprenants à évaluer</p>
                  </div>
                  <div className="bg-yellow-100 rounded-full px-3 py-1">
                    <span className="text-sm font-medium text-yellow-600">À faire</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Base de données - Groupe B</p>
                    <p className="text-sm text-gray-500">3 apprenants à évaluer</p>
                  </div>
                  <div className="bg-yellow-100 rounded-full px-3 py-1">
                    <span className="text-sm font-medium text-yellow-600">À faire</span>
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