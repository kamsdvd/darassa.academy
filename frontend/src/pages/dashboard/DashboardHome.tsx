import React from 'react';
import { 
  Users, 
  BookOpen, 
  Briefcase, 
  FileText, 
  TrendingUp, 
  DollarSign, 
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

// Types pour les statistiques
interface StatCard {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
  color: string;
}

// Types pour les activités récentes
interface Activity {
  id: number;
  type: string;
  description: string;
  time: string;
  user: string;
}

const DashboardHome: React.FC = () => {
  // Données de statistiques
  const stats: StatCard[] = [
    {
      title: "Utilisateurs",
      value: "1,234",
      change: 12.5,
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "Formations",
      value: "45",
      change: 8.2,
      icon: BookOpen,
      color: "bg-green-500"
    },
    {
      title: "Offres d'emploi",
      value: "78",
      change: -3.1,
      icon: Briefcase,
      color: "bg-purple-500"
    },
    {
      title: "Articles de blog",
      value: "32",
      change: 15.7,
      icon: FileText,
      color: "bg-yellow-500"
    }
  ];

  // Données d'activités récentes
  const recentActivities: Activity[] = [
    {
      id: 1,
      type: "formation",
      description: "Nouvelle formation ajoutée : Développement Web Avancé",
      time: "Il y a 2 heures",
      user: "Admin"
    },
    {
      id: 2,
      type: "user",
      description: "Nouvel utilisateur inscrit : John Doe",
      time: "Il y a 3 heures",
      user: "Système"
    },
    {
      id: 3,
      type: "job",
      description: "Nouvelle offre d'emploi publiée : Développeur Full Stack",
      time: "Il y a 5 heures",
      user: "Admin"
    },
    {
      id: 4,
      type: "blog",
      description: "Nouvel article publié : Les tendances du développement web en 2024",
      time: "Il y a 1 jour",
      user: "Admin"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Dernière mise à jour : {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-full ${stat.color} bg-opacity-10`}>
                  <Icon className={`w-6 h-6 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
                <div className="flex items-center">
                  {stat.change >= 0 ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${stat.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {Math.abs(stat.change)}%
                  </span>
                </div>
              </div>
              <h3 className="text-gray-500 text-sm mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Activités récentes */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Activités récentes</h2>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50">
              <div className="flex-shrink-0">
                {activity.type === "formation" && <BookOpen className="w-5 h-5 text-blue-500" />}
                {activity.type === "user" && <Users className="w-5 h-5 text-green-500" />}
                {activity.type === "job" && <Briefcase className="w-5 h-5 text-purple-500" />}
                {activity.type === "blog" && <FileText className="w-5 h-5 text-yellow-500" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <span>{activity.user}</span>
                  <span className="mx-2">•</span>
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome; 