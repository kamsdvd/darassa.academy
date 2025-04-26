import React, { useState } from 'react';
import { 
  Search,
  Filter,
  MapPin,
  Building,
  Calendar,
  Briefcase,
  GraduationCap,
  ExternalLink
} from 'lucide-react';
import PageTransition from '../../components/common/PageTransition';

const UserOpportunites: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Données de test pour les opportunités
  const opportunites = [
    {
      id: 1,
      titre: 'Développeur Frontend React',
      entreprise: 'Tech Solutions SARL',
      type: 'emploi',
      lieu: 'Casablanca, Maroc',
      date: 'Publié le 15 Mars 2024',
      description: 'Nous recherchons un développeur Frontend React expérimenté pour rejoindre notre équipe...',
      salaire: '15 000 - 20 000 MAD',
      competences: ['React', 'TypeScript', 'Tailwind CSS', 'Git'],
      lien: 'https://example.com/emploi-1'
    },
    {
      id: 2,
      titre: 'Formation en Développement Web Full Stack',
      entreprise: 'Digital Academy',
      type: 'formation',
      lieu: 'En ligne',
      date: 'Début: 1 Avril 2024',
      description: 'Formation intensive de 6 mois en développement web full stack...',
      duree: '6 mois',
      competences: ['HTML/CSS', 'JavaScript', 'Node.js', 'MongoDB'],
      lien: 'https://example.com/formation-1'
    },
    {
      id: 3,
      titre: 'Développeur Backend Node.js',
      entreprise: 'Innovation Tech',
      type: 'emploi',
      lieu: 'Rabat, Maroc',
      date: 'Publié le 10 Mars 2024',
      description: 'Nous cherchons un développeur Backend Node.js pour développer nos API...',
      salaire: '18 000 - 25 000 MAD',
      competences: ['Node.js', 'Express', 'MongoDB', 'API REST'],
      lien: 'https://example.com/emploi-2'
    }
  ];

  // Filtrer les opportunités en fonction de la recherche et du filtre
  const filteredOpportunites = opportunites.filter(opportunite => {
    const matchesSearch = opportunite.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunite.entreprise.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === 'all') return matchesSearch;
    return matchesSearch && opportunite.type === filterType;
  });

  return (
    <PageTransition>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Opportunités
          </h1>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher une opportunité..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <select
              className="appearance-none pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">Tous les types</option>
              <option value="emploi">Emplois</option>
              <option value="formation">Formations</option>
            </select>
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>

        {/* Liste des opportunités */}
        <div className="space-y-4">
          {filteredOpportunites.map(opportunite => (
            <div key={opportunite.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    {opportunite.type === 'emploi' ? (
                      <Briefcase className="h-5 w-5 text-blue-500" />
                    ) : (
                      <GraduationCap className="h-5 w-5 text-green-500" />
                    )}
                    <h3 className="text-lg font-medium text-gray-900">{opportunite.titre}</h3>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Building className="h-4 w-4 mr-1" />
                    <span>{opportunite.entreprise}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{opportunite.lieu}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{opportunite.date}</span>
                  </div>
                </div>
                <a
                  href={opportunite.lien}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                >
                  Voir les détails
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </div>
              
              <p className="mt-4 text-gray-600">{opportunite.description}</p>
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900">Compétences requises:</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {opportunite.competences.map((competence, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {competence}
                    </span>
                  ))}
                </div>
              </div>
              
              {opportunite.type === 'emploi' && (
                <div className="mt-4 text-sm text-gray-600">
                  <span className="font-medium">Salaire:</span> {opportunite.salaire}
                </div>
              )}
              
              {opportunite.type === 'formation' && (
                <div className="mt-4 text-sm text-gray-600">
                  <span className="font-medium">Durée:</span> {opportunite.duree}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default UserOpportunites; 