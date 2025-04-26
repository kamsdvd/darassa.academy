import React, { useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';
import { 
  BookOpen, 
  Award, 
  Briefcase, 
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  Users,
  Building,
  FileText,
  BarChart,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  CheckSquare
} from 'lucide-react';
import PageTransition from '../../components/shared/PageTransition';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Enregistrer les composants Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Types pour les données
interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: number;
  color: string;
}

interface QuickActionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

interface CourseCardProps {
  title: string;
  group: string;
  room: string;
  time: string;
  location: string;
}

// Composants réutilisables
const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900 mt-1">{value}</p>
        {trend !== undefined && (
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

const QuickAction: React.FC<QuickActionProps> = ({ title, description, icon, href, color }) => (
  <a href={href} className="block p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className={`p-3 bg-${color}-50 rounded-full`}>
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <ChevronRight className="h-5 w-5 text-gray-400" />
    </div>
  </a>
);

const CourseCard: React.FC<CourseCardProps> = ({ title, group, room, time, location }) => (
  <div className="p-6 border-b border-gray-200 last:border-b-0">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{group} - {room}</p>
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
      </div>
    </div>
  </div>
);

const UserDashboard = () => {
  const { user } = useStore();

  const renderDashboard = () => {
    switch (user?.userType) {
      case 'admin':
        return renderAdminDashboard();
      case 'centre_manager':
        return renderCentreManagerDashboard();
      case 'formateur':
        return renderFormateurDashboard();
      case 'etudiant':
        return renderStudentDashboard();
      case 'entreprise':
        return renderEntrepriseDashboard();
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-900">Tableau de bord non disponible</h2>
            <p className="mt-2 text-gray-600">Veuillez contacter l'administrateur pour plus d'informations.</p>
          </div>
        );
    }
  };

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Utilisateurs"
          value="1,234"
          icon={<Users className="h-6 w-6 text-blue-500" />}
          trend={12}
          color="blue"
        />
        <StatCard
          title="Centres"
          value="45"
          icon={<Building className="h-6 w-6 text-green-500" />}
          trend={5}
          color="green"
        />
        <StatCard
          title="Formations"
          value="789"
          icon={<BookOpen className="h-6 w-6 text-purple-500" />}
          trend={-2}
          color="purple"
        />
        <StatCard
          title="Rapports"
          value="56"
          icon={<FileText className="h-6 w-6 text-orange-500" />}
          trend={8}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Statistiques des utilisateurs</h3>
          <div className="h-64">
            <Line
              data={{
                labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
                datasets: [
                  {
                    label: 'Nouveaux utilisateurs',
                    data: [65, 59, 80, 81, 56, 55],
                    borderColor: 'rgb(59, 130, 246)',
                    tension: 0.1
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">État des centres</h3>
          <div className="h-64">
            <Doughnut
              data={{
                labels: ['Actifs', 'En attente', 'Inactifs'],
                datasets: [
                  {
                    data: [300, 50, 100],
                    backgroundColor: [
                      'rgb(34, 197, 94)',
                      'rgb(234, 179, 8)',
                      'rgb(239, 68, 68)'
                    ]
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickAction
          title="Gérer les utilisateurs"
          description="Ajouter, modifier ou supprimer des utilisateurs"
          icon={<Users className="h-6 w-6 text-blue-500" />}
          href="/admin/users"
          color="blue"
        />
        <QuickAction
          title="Gérer les centres"
          description="Gérer les centres de formation"
          icon={<Building className="h-6 w-6 text-green-500" />}
          href="/admin/centres"
          color="green"
        />
        <QuickAction
          title="Voir les rapports"
          description="Consulter les rapports et statistiques"
          icon={<FileText className="h-6 w-6 text-orange-500" />}
          href="/admin/reports"
          color="orange"
        />
      </div>
    </div>
  );

  const renderCentreManagerDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Formateurs"
          value="12"
          icon={<Users className="h-6 w-6 text-blue-500" />}
          trend={2}
          color="blue"
        />
        <StatCard
          title="Formations actives"
          value="8"
          icon={<BookOpen className="h-6 w-6 text-green-500" />}
          trend={1}
          color="green"
        />
        <StatCard
          title="Étudiants"
          value="156"
          icon={<Users className="h-6 w-6 text-purple-500" />}
          trend={15}
          color="purple"
        />
        <StatCard
          title="Salles"
          value="6"
          icon={<Building className="h-6 w-6 text-orange-500" />}
          trend={0}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Formations en cours</h3>
          <div className="h-64">
            <Bar
              data={{
                labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
                datasets: [
                  {
                    label: 'Formations',
                    data: [4, 6, 5, 7, 4, 2],
                    backgroundColor: 'rgb(59, 130, 246)'
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Alertes</h3>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
              <AlertCircle className="h-6 w-6 text-yellow-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-yellow-800">Salle 3 non utilisée aujourd'hui</p>
                <p className="text-xs text-yellow-600">Considérer la réaffectation</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-green-50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-green-800">Tous les formateurs sont disponibles</p>
                <p className="text-xs text-green-600">Planification optimale possible</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickAction
          title="Gérer les formateurs"
          description="Ajouter ou modifier les formateurs"
          icon={<Users className="h-6 w-6 text-blue-500" />}
          href="/centre/formateurs"
          color="blue"
        />
        <QuickAction
          title="Gérer les formations"
          description="Planifier et gérer les formations"
          icon={<BookOpen className="h-6 w-6 text-green-500" />}
          href="/centre/formations"
          color="green"
        />
        <QuickAction
          title="Emploi du temps"
          description="Voir et modifier l'emploi du temps"
          icon={<Calendar className="h-6 w-6 text-orange-500" />}
          href="/centre/emploi-du-temps"
          color="orange"
        />
      </div>
    </div>
  );

  const renderFormateurDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Cours aujourd'hui"
          value="3"
          icon={<BookOpen className="h-6 w-6 text-blue-500" />}
          color="blue"
        />
        <StatCard
          title="Étudiants"
          value="45"
          icon={<Users className="h-6 w-6 text-green-500" />}
          color="green"
        />
        <StatCard
          title="Ressources"
          value="12"
          icon={<FileText className="h-6 w-6 text-purple-500" />}
          color="purple"
        />
        <StatCard
          title="Évaluations"
          value="5"
          icon={<CheckSquare className="h-6 w-6 text-orange-500" />}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Prochains cours</h3>
          <div className="space-y-4">
            <CourseCard
              title="Développement Web"
              group="Groupe A"
              room="Salle 3"
              time="09:00 - 12:00"
              location="Centre de formation"
            />
            <CourseCard
              title="Design UI/UX"
              group="Groupe B"
              room="Salle 1"
              time="14:00 - 17:00"
              location="Centre de formation"
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Tâches à faire</h3>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-blue-50 rounded-lg">
              <CheckSquare className="h-6 w-6 text-blue-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-blue-800">Préparer les supports de cours</p>
                <p className="text-xs text-blue-600">Pour le cours de demain</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-green-50 rounded-lg">
              <CheckSquare className="h-6 w-6 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-green-800">Évaluer les projets</p>
                <p className="text-xs text-green-600">5 projets en attente</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickAction
          title="Mes cours"
          description="Voir et gérer mes cours"
          icon={<BookOpen className="h-6 w-6 text-blue-500" />}
          href="/formateur/cours"
          color="blue"
        />
        <QuickAction
          title="Ressources"
          description="Gérer les ressources pédagogiques"
          icon={<FileText className="h-6 w-6 text-green-500" />}
          href="/formateur/ressources"
          color="green"
        />
        <QuickAction
          title="Évaluations"
          description="Gérer les évaluations"
          icon={<CheckSquare className="h-6 w-6 text-orange-500" />}
          href="/formateur/evaluations"
          color="orange"
        />
      </div>
    </div>
  );

  const renderStudentDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Formations suivies"
          value="3"
          icon={<BookOpen className="h-6 w-6 text-blue-500" />}
          color="blue"
        />
        <StatCard
          title="Certificats"
          value="2"
          icon={<Award className="h-6 w-6 text-green-500" />}
          color="green"
        />
        <StatCard
          title="Opportunités"
          value="5"
          icon={<Briefcase className="h-6 w-6 text-purple-500" />}
          color="purple"
        />
        <StatCard
          title="Prochains cours"
          value="2"
          icon={<Calendar className="h-6 w-6 text-orange-500" />}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Prochains cours</h3>
          <div className="space-y-4">
            <CourseCard
              title="Développement Web"
              group="Groupe A"
              room="Salle 3"
              time="09:00 - 12:00"
              location="Centre de formation"
            />
            <CourseCard
              title="Design UI/UX"
              group="Groupe B"
              room="Salle 1"
              time="14:00 - 17:00"
              location="Centre de formation"
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Opportunités récentes</h3>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-blue-50 rounded-lg">
              <Briefcase className="h-6 w-6 text-blue-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-blue-800">Stage en développement web</p>
                <p className="text-xs text-blue-600">Tech Solutions Inc.</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-green-50 rounded-lg">
              <Briefcase className="h-6 w-6 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-green-800">Projet freelance UI/UX</p>
                <p className="text-xs text-green-600">Design Studio</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickAction
          title="Mes formations"
          description="Voir mes formations en cours"
          icon={<BookOpen className="h-6 w-6 text-blue-500" />}
          href="/user/formations"
          color="blue"
        />
        <QuickAction
          title="Mes certificats"
          description="Consulter mes certificats"
          icon={<Award className="h-6 w-6 text-green-500" />}
          href="/user/certificats"
          color="green"
        />
        <QuickAction
          title="Opportunités"
          description="Voir les opportunités"
          icon={<Briefcase className="h-6 w-6 text-orange-500" />}
          href="/user/opportunites"
          color="orange"
        />
      </div>
    </div>
  );

  const renderEntrepriseDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Employés"
          value="25"
          icon={<Users className="h-6 w-6 text-blue-500" />}
          trend={2}
          color="blue"
        />
        <StatCard
          title="Formations"
          value="8"
          icon={<BookOpen className="h-6 w-6 text-green-500" />}
          trend={1}
          color="green"
        />
        <StatCard
          title="Certificats"
          value="15"
          icon={<Award className="h-6 w-6 text-purple-500" />}
          trend={3}
          color="purple"
        />
        <StatCard
          title="Rapports"
          value="12"
          icon={<FileText className="h-6 w-6 text-orange-500" />}
          trend={0}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Formations en cours</h3>
          <div className="space-y-4">
            <CourseCard
              title="Développement Web"
              group="Équipe Dev"
              room="Salle 3"
              time="09:00 - 12:00"
              location="Centre de formation"
            />
            <CourseCard
              title="Design UI/UX"
              group="Équipe Design"
              room="Salle 1"
              time="14:00 - 17:00"
              location="Centre de formation"
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Statistiques de formation</h3>
          <div className="h-64">
            <Bar
              data={{
                labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
                datasets: [
                  {
                    label: 'Employés formés',
                    data: [12, 19, 15, 17, 22, 24],
                    backgroundColor: 'rgb(59, 130, 246)'
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <QuickAction
          title="Gérer les employés"
          description="Gérer les employés et leurs formations"
          icon={<Users className="h-6 w-6 text-blue-500" />}
          href="/entreprise/employes"
          color="blue"
        />
        <QuickAction
          title="Formations"
          description="Voir et planifier les formations"
          icon={<BookOpen className="h-6 w-6 text-green-500" />}
          href="/entreprise/formations"
          color="green"
        />
        <QuickAction
          title="Rapports"
          description="Consulter les rapports de formation"
          icon={<FileText className="h-6 w-6 text-orange-500" />}
          href="/entreprise/rapports"
          color="orange"
        />
      </div>
    </div>
  );

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Bonjour, {user?.firstName || 'Utilisateur'}
          </h1>
          <p className="mt-2 text-gray-600">
            Bienvenue sur votre tableau de bord personnel
          </p>
        </div>

        {renderDashboard()}
      </div>
    </PageTransition>
  );
};

export default UserDashboard; 