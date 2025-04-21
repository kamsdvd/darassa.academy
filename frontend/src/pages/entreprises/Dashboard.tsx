import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  GraduationCap, 
  BookOpen, 
  Users, 
  Settings, 
  Plus,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import PageTransition from '../../components/shared/PageTransition';

interface JobOffer {
  id: string;
  title: string;
  type: string;
  location: string;
  postedDate: string;
  applications: number;
}

interface Training {
  id: string;
  title: string;
  participants: number;
  startDate: string;
  status: 'upcoming' | 'in-progress' | 'completed';
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'training' | 'lms'>('jobs');

  // Sample data - replace with API calls
  const jobOffers: JobOffer[] = [
    {
      id: '1',
      title: 'Développeur Full Stack',
      type: 'CDI',
      location: 'Kinshasa',
      postedDate: '2024-03-15',
      applications: 12
    },
    {
      id: '2',
      title: 'Designer UI/UX',
      type: 'CDD',
      location: 'Kinshasa',
      postedDate: '2024-03-14',
      applications: 8
    }
  ];

  const trainings: Training[] = [
    {
      id: '1',
      title: 'Formation Microsoft Office',
      participants: 15,
      startDate: '2024-04-01',
      status: 'upcoming'
    },
    {
      id: '2',
      title: 'Formation Leadership',
      participants: 20,
      startDate: '2024-03-20',
      status: 'in-progress'
    }
  ];

  const renderJobOffers = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Offres d'emploi</h3>
        <Link
          to="/entreprises/offres/nouvelle"
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle offre
        </Link>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Titre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Localisation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date de publication
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Candidatures
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobOffers.map((job) => (
              <tr key={job.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{job.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{job.type}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{job.location}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{job.postedDate}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{job.applications}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-primary-600 hover:text-primary-900 mr-3">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-primary-600 hover:text-primary-900 mr-3">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTraining = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Formations</h3>
        <Link
          to="/entreprises/formations/nouvelle"
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle formation
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trainings.map((training) => (
          <div key={training.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-medium text-gray-900">{training.title}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  {training.participants} participants
                </p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                training.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                training.status === 'in-progress' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {training.status === 'upcoming' ? 'À venir' :
                 training.status === 'in-progress' ? 'En cours' :
                 'Terminée'}
              </span>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Date de début: {training.startDate}
              </p>
              <div className="flex space-x-2">
                <button className="text-primary-600 hover:text-primary-900">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="text-primary-600 hover:text-primary-900">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLMS = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">LMS Entreprise</h3>
        <Link
          to="/entreprises/lms/configuration"
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          <Settings className="w-4 h-4 mr-2" />
          Configuration
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
            <Users className="w-6 h-6 text-primary-600" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">Utilisateurs</h4>
          <p className="text-sm text-gray-500 mb-4">
            Gérez les accès et les permissions de vos employés
          </p>
          <Link
            to="/entreprises/lms/utilisateurs"
            className="text-primary-600 hover:text-primary-900 text-sm font-medium"
          >
            Gérer les utilisateurs →
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
            <BookOpen className="w-6 h-6 text-primary-600" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">Contenu</h4>
          <p className="text-sm text-gray-500 mb-4">
            Personnalisez et gérez votre catalogue de formations
          </p>
          <Link
            to="/entreprises/lms/contenu"
            className="text-primary-600 hover:text-primary-900 text-sm font-medium"
          >
            Gérer le contenu →
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-lg mb-4">
            <GraduationCap className="w-6 h-6 text-primary-600" />
          </div>
          <h4 className="text-lg font-medium text-gray-900 mb-2">Rapports</h4>
          <p className="text-sm text-gray-500 mb-4">
            Suivez la progression et les résultats de vos équipes
          </p>
          <Link
            to="/entreprises/lms/rapports"
            className="text-primary-600 hover:text-primary-900 text-sm font-medium"
          >
            Voir les rapports →
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="mt-2 text-gray-600">
            Gérez vos offres d'emploi, formations et accès LMS
          </p>
        </div>

        <div className="mb-8">
          <nav className="flex space-x-4">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'jobs'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Briefcase className="w-4 h-4 inline-block mr-2" />
              Offres d'emploi
            </button>
            <button
              onClick={() => setActiveTab('training')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'training'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <GraduationCap className="w-4 h-4 inline-block mr-2" />
              Formations
            </button>
            <button
              onClick={() => setActiveTab('lms')}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'lms'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <BookOpen className="w-4 h-4 inline-block mr-2" />
              LMS
            </button>
          </nav>
        </div>

        <div className="mt-8">
          {activeTab === 'jobs' && renderJobOffers()}
          {activeTab === 'training' && renderTraining()}
          {activeTab === 'lms' && renderLMS()}
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard; 