import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import PageTransition from '../../components/shared/PageTransition';
import { 
  BookOpen, 
  FileText,
  CheckSquare,
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  CheckCircle,
  XCircle,
  Bell,
  RefreshCw,
  Settings,
  BarChart,
  TrendingUp,
  AlertCircle,
  Award,
  Bookmark,
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Types pour les données
interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: number;
  color: string;
  loading?: boolean;
}

interface QuickActionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
  loading?: boolean;
}

interface CourseCardProps {
  title: string;
  instructor: string;
  room: string;
  time: string;
  location: string;
  status?: 'upcoming' | 'ongoing' | 'completed';
  progress?: number;
}

interface ActivityItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
  time: string;
}

// Composants réutilisables
const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, color, loading = false }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500">{title}</p>
        {loading ? (
          <div className="h-8 w-24 bg-gray-200 animate-pulse rounded mt-1"></div>
        ) : (
          <h3 className="text-2xl font-bold">{value}</h3>
        )}
        {!loading && trend !== undefined && (
          <div className={`flex items-center mt-2 text-sm ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className={`h-4 w-4 mr-1 ${trend >= 0 ? 'rotate-0' : 'rotate-180'}`} />
            <span>{Math.abs(trend)}% {trend >= 0 ? 'augmentation' : 'diminution'}</span>
          </div>
        )}
      </div>
      <div className={`p-3 bg-${color}-50 rounded-full`}>
        {icon}
      </div>
    </div>
  </div>
);

const QuickAction: React.FC<QuickActionProps> = ({ title, description, icon, href, color, loading = false }) => (
  <Link 
    to={href} 
    className="block p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
    aria-label={`Accéder à ${title}`}
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className={`p-3 bg-${color}-50 rounded-full`}>
          {icon}
        </div>
        <div>
          {loading ? (
            <>
              <div className="h-5 w-32 bg-gray-200 animate-pulse rounded"></div>
              <div className="h-4 w-48 bg-gray-200 animate-pulse rounded mt-2"></div>
            </>
          ) : (
            <>
              <h3 className="text-lg font-medium text-gray-900">{title}</h3>
              <p className="text-sm text-gray-500">{description}</p>
            </>
          )}
        </div>
      </div>
      <ChevronRight className="h-5 w-5 text-gray-400" />
    </div>
  </Link>
);

const CourseCard: React.FC<CourseCardProps> = ({ title, instructor, room, time, location, status = 'upcoming', progress }) => {
  const statusColors = {
    upcoming: 'bg-blue-50 text-blue-800',
    ongoing: 'bg-green-50 text-green-800',
    completed: 'bg-gray-50 text-gray-800'
  };
  
  const statusText = {
    upcoming: 'À venir',
    ongoing: 'En cours',
    completed: 'Terminé'
  };
  
  return (
    <div className="p-6 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors duration-150">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">Formateur: {instructor}</p>
          <p className="text-sm text-gray-500">{room}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            <span>{time}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{location}</span>
          </div>
          <div className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status]}`}>
            {statusText[status]}
          </div>
          {progress !== undefined && (
            <div className="mt-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{progress}% complété</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ActivityItem: React.FC<ActivityItemProps> = ({ title, description, icon, iconColor, time }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center">
      <div className={`bg-${iconColor}-100 rounded-full p-2 mr-3`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
    <span className="text-sm text-gray-500">{time}</span>
  </div>
);

const ApprenantDashboard: React.FC = () => {
  const { user } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Tableau de bord apprenant
            </h1>
            <div className="mt-4 md:mt-0 flex items-center space-x-2">
              <span className="text-sm text-gray-500">Dernière mise à jour:</span>
              <span className="text-sm font-medium">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>

          {/* Barre d'outils */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <button 
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-150"
                aria-label="Actualiser"
              >
                <RefreshCw className="h-5 w-5" />
              </button>
              <button 
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-150"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
              </button>
              <button 
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors duration-150"
                aria-label="Paramètres"
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Statistiques rapides */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Cours en cours"
              value="3"
              icon={<BookOpen className="h-6 w-6 text-primary-600" />}
              color="primary"
              loading={isLoading}
            />
            <StatCard
              title="Ressources"
              value="12"
              icon={<FileText className="h-6 w-6 text-primary-600" />}
              color="primary"
              loading={isLoading}
            />
            <StatCard
              title="Évaluations"
              value="5"
              icon={<CheckSquare className="h-6 w-6 text-primary-600" />}
              color="primary"
              loading={isLoading}
            />
            <StatCard
              title="Certificats"
              value="2"
              icon={<Award className="h-6 w-6 text-primary-600" />}
              color="primary"
              loading={isLoading}
            />
          </div>

          {/* Prochains cours et progression */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Prochains cours</h3>
              <div className="space-y-4">
                <CourseCard
                  title="Développement Web"
                  instructor="John Doe"
                  room="Salle 3"
                  time="09:00 - 12:00"
                  location="Centre de formation"
                  status="upcoming"
                />
                <CourseCard
                  title="Design UI/UX"
                  instructor="Jane Smith"
                  room="Salle 1"
                  time="14:00 - 17:00"
                  location="Centre de formation"
                  status="upcoming"
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Progression globale</h3>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                  <BookOpen className="h-6 w-6 text-blue-500 mr-3" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-blue-800">Développement Web</p>
                    <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                    <p className="text-xs text-blue-600 mt-1">75% complété</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-green-50 rounded-lg">
                  <BookOpen className="h-6 w-6 text-green-500 mr-3" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-800">Design UI/UX</p>
                    <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <p className="text-xs text-green-600 mt-1">45% complété</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions rapides */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <QuickAction
                title="Mes cours"
                description="Voir mes cours en cours"
                icon={<BookOpen className="h-6 w-6 text-primary-600" />}
                href="/apprenant/cours"
                color="primary"
                loading={isLoading}
              />
              <QuickAction
                title="Ressources"
                description="Accéder aux ressources"
                icon={<FileText className="h-6 w-6 text-primary-600" />}
                href="/apprenant/ressources"
                color="primary"
                loading={isLoading}
              />
              <QuickAction
                title="Évaluations"
                description="Voir mes évaluations"
                icon={<CheckSquare className="h-6 w-6 text-primary-600" />}
                href="/apprenant/evaluations"
                color="primary"
                loading={isLoading}
              />
              <QuickAction
                title="Planning"
                description="Voir mon planning"
                icon={<Calendar className="h-6 w-6 text-primary-600" />}
                href="/apprenant/planning"
                color="primary"
                loading={isLoading}
              />
              <QuickAction
                title="Certificats"
                description="Voir mes certificats"
                icon={<Award className="h-6 w-6 text-primary-600" />}
                href="/apprenant/certificats"
                color="primary"
                loading={isLoading}
              />
              <QuickAction
                title="Messagerie"
                description="Voir mes messages"
                icon={<MessageSquare className="h-6 w-6 text-primary-600" />}
                href="/apprenant/messages"
                color="primary"
                loading={isLoading}
              />
            </div>
          </div>

          {/* Dernières activités */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Dernières activités</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="space-y-4">
                <ActivityItem
                  title="Cours terminé"
                  description="Développement Web - Module React"
                  icon={<CheckCircle className="w-4 h-4" />}
                  iconColor="green"
                  time="Il y a 2 heures"
                />
                <ActivityItem
                  title="Nouvelle ressource"
                  description="Tutoriel React.js disponible"
                  icon={<FileText className="w-4 h-4" />}
                  iconColor="blue"
                  time="Il y a 1 jour"
                />
                <ActivityItem
                  title="Évaluation soumise"
                  description="Projet React - Évaluation finale"
                  icon={<CheckSquare className="w-4 h-4" />}
                  iconColor="purple"
                  time="Il y a 2 jours"
                />
              </div>
            </div>
          </div>

          {/* Alertes */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Alertes</h2>
            <div className="space-y-4">
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-1 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800">Évaluation à rendre</p>
                    <p className="text-sm text-yellow-700">Projet React à rendre avant le 15/05</p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">Nouveau cours</p>
                    <p className="text-sm text-blue-700">Nouveau module React Native disponible</p>
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

export default ApprenantDashboard; 