import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { 
  BookOpen, 
  Clock, 
  Calendar, 
  MapPin, 
  Search, 
  Filter,
  ChevronRight,
  CheckCircle,
  Clock as ClockIcon,
  AlertCircle
} from 'lucide-react';
import PageTransition from '../../components/shared/PageTransition';

const UserFormations: React.FC = () => {
  const { user } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Données fictives pour l'exemple
  const formations = [
    {
      id: 1,
      title: 'Développement Web Frontend',
      description: 'Apprenez HTML, CSS, JavaScript et React pour créer des sites web modernes',
      startDate: '2023-05-15',
      endDate: '2023-07-15',
      duration: '60 heures',
      location: 'Centre de formation',
      status: 'completed',
      progress: 100,
      instructor: 'Jean Dupont'
    },
    {
      id: 2,
      title: 'Base de données SQL',
      description: 'Maîtrisez les bases de données relationnelles avec SQL',
      startDate: '2023-08-01',
      endDate: '2023-09-30',
      duration: '40 heures',
      location: 'Centre de formation',
      status: 'in_progress',
      progress: 65,
      instructor: 'Marie Martin'
    },
    {
      id: 3,
      title: 'Développement Mobile avec React Native',
      description: 'Créez des applications mobiles multiplateformes',
      startDate: '2023-10-15',
      endDate: '2023-12-15',
      duration: '50 heures',
      location: 'Centre de formation',
      status: 'upcoming',
      progress: 0,
      instructor: 'Pierre Durand'
    },
    {
      id: 4,
      title: 'DevOps et CI/CD',
      description: 'Automatisez le déploiement et l\'intégration continue',
      startDate: '2024-01-10',
      endDate: '2024-03-10',
      duration: '45 heures',
      location: 'Centre de formation',
      status: 'upcoming',
      progress: 0,
      instructor: 'Sophie Bernard'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'upcoming':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Terminée';
      case 'in_progress':
        return 'En cours';
      case 'upcoming':
        return 'À venir';
      default:
        return 'Inconnu';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'in_progress':
        return <ClockIcon className="h-4 w-4" />;
      case 'upcoming':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const filteredFormations = formations.filter(formation => {
    const matchesSearch = formation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         formation.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || formation.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Mes formations
          </h1>
          <div className="text-sm text-gray-500">
            {formations.length} formation{formations.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Rechercher une formation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex-shrink-0">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Tous les statuts</option>
              <option value="completed">Terminées</option>
              <option value="in_progress">En cours</option>
              <option value="upcoming">À venir</option>
            </select>
          </div>
        </div>

        {/* Liste des formations */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {filteredFormations.map((formation) => (
              <li key={formation.id}>
                <a href={`/user/formations/${formation.id}`} className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="p-2 bg-primary-100 rounded-full mr-4">
                          <BookOpen className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-primary-600 truncate">
                            {formation.title}
                          </p>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                            {formation.description}
                          </p>
                        </div>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(formation.status)}`}>
                          <span className="flex items-center">
                            {getStatusIcon(formation.status)}
                            <span className="ml-1">{getStatusText(formation.status)}</span>
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <p>
                            {new Date(formation.startDate).toLocaleDateString()} - {new Date(formation.endDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <p>{formation.duration}</p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                          <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <p>{formation.location}</p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-500 mr-2">Formateur:</span>
                          <span className="text-sm text-gray-900">{formation.instructor}</span>
                        </div>
                      </div>
                    </div>
                    {formation.status === 'in_progress' && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-500">Progression</span>
                          <span className="text-xs font-medium text-gray-500">{formation.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-primary-600 h-1.5 rounded-full" 
                            style={{ width: `${formation.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PageTransition>
  );
};

export default UserFormations; 