import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import PageTransition from '../../components/shared/PageTransition';
import { 
  Briefcase, 
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
  MessageSquare,
  Search,
  Building,
  Users
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

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  status?: 'applied' | 'interview' | 'rejected' | 'saved';
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

const JobCard: React.FC<JobCardProps> = ({ title, company, location, type, salary, status = 'applied' }) => {
  const statusColors = {
    applied: 'bg-blue-50 text-blue-800',
    interview: 'bg-green-50 text-green-800',
    rejected: 'bg-red-50 text-red-800',
    saved: 'bg-gray-50 text-gray-800'
  };
  
  const statusText = {
    applied: 'Candidature envoyée',
    interview: 'Entretien prévu',
    rejected: 'Refusé',
    saved: 'Sauvegardé'
  };
  
  return (
    <div className="p-6 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors duration-150">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{company}</p>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Briefcase className="h-4 w-4 mr-1" />
            <span>{type}</span>
          </div>
          {salary && (
            <p className="text-sm text-gray-500 mt-1">{salary}</p>
          )}
        </div>
        <div className="text-right">
          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status]}`}>
            {statusText[status]}
          </div>
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

const DemandeurDashboard: React.FC = () => {
  const { user } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Tableau de bord demandeur d'emploi
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
              title="Candidatures"
              value="12"
              icon={<FileText className="h-6 w-6 text-primary-600" />}
              color="primary"
              loading={isLoading}
            />
            <StatCard
              title="Entretiens"
              value="3"
              icon={<Calendar className="h-6 w-6 text-primary-600" />}
              color="primary"
              loading={isLoading}
            />
            <StatCard
              title="Offres sauvegardées"
              value="8"
              icon={<Bookmark className="h-6 w-6 text-primary-600" />}
              color="primary"
              loading={isLoading}
            />
            <StatCard
              title="Entreprises suivies"
              value="5"
              icon={<Building className="h-6 w-6 text-primary-600" />}
              color="primary"
              loading={isLoading}
            />
          </div>

          {/* Actions rapides */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <QuickAction
              title="Rechercher des offres"
              description="Parcourez les dernières offres d'emploi"
              icon={<Search className="h-6 w-6 text-primary-600" />}
              href="/emploi/recherche"
              color="primary"
              loading={isLoading}
            />
            <QuickAction
              title="Mon CV"
              description="Gérez votre CV et vos documents"
              icon={<FileText className="h-6 w-6 text-primary-600" />}
              href="/demandeur/cv"
              color="primary"
              loading={isLoading}
            />
            <QuickAction
              title="Mes candidatures"
              description="Suivez l'état de vos candidatures"
              icon={<CheckSquare className="h-6 w-6 text-primary-600" />}
              href="/demandeur/candidatures"
              color="primary"
              loading={isLoading}
            />
          </div>

          {/* Dernières candidatures */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Dernières candidatures</h2>
            <div className="bg-white rounded-lg shadow">
              <JobCard
                title="Développeur Full Stack"
                company="Tech Solutions"
                location="Paris"
                type="CDI"
                salary="45-55K€"
                status="interview"
              />
              <JobCard
                title="Designer UI/UX"
                company="Creative Agency"
                location="Lyon"
                type="CDI"
                salary="40-50K€"
                status="applied"
              />
              <JobCard
                title="Product Manager"
                company="StartupX"
                location="Remote"
                type="CDI"
                salary="50-65K€"
                status="saved"
              />
            </div>
          </div>

          {/* Activités récentes */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Activités récentes</h2>
            <div className="space-y-4">
              <ActivityItem
                title="Entretien prévu"
                description="Entretien avec Tech Solutions pour le poste de Développeur Full Stack"
                icon={<Calendar className="h-5 w-5 text-blue-600" />}
                iconColor="blue"
                time="Dans 2 jours"
              />
              <ActivityItem
                title="Candidature envoyée"
                description="Votre candidature pour Designer UI/UX a été envoyée"
                icon={<CheckCircle className="h-5 w-5 text-green-600" />}
                iconColor="green"
                time="Il y a 1 jour"
              />
              <ActivityItem
                title="Offre sauvegardée"
                description="Vous avez sauvegardé l'offre de Product Manager"
                icon={<Bookmark className="h-5 w-5 text-primary-600" />}
                iconColor="primary"
                time="Il y a 2 jours"
              />
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default DemandeurDashboard; 