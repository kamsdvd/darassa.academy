import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  Building2, 
  Briefcase, 
  Clock,
  ArrowRight
} from 'lucide-react';
import PageTransition from '../../components/shared/PageTransition';
import OpportunitesHero from '../../components/opportunites/OpportunitesHero';

// Types
interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  postedAt: string;
  description: string;
}

// Mock data
const jobs: Job[] = [
  {
    id: 1,
    title: "Développeur Full Stack",
    company: "Tech Solutions",
    location: "Paris, France",
    type: "CDI",
    postedAt: "Il y a 2 jours",
    description: "Nous recherchons un développeur full stack expérimenté pour rejoindre notre équipe..."
  },
  {
    id: 2,
    title: "Data Analyst",
    company: "Data Insights",
    location: "Lyon, France",
    type: "CDD",
    postedAt: "Il y a 3 jours",
    description: "Un data analyst pour analyser et interpréter des données complexes..."
  },
  {
    id: 3,
    title: "Product Manager",
    company: "Innovation Corp",
    location: "Bordeaux, France",
    type: "CDI",
    postedAt: "Il y a 4 jours",
    description: "Un product manager pour gérer le cycle de vie de nos produits..."
  }
];

const Opportunites: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !selectedLocation || job.location.includes(selectedLocation);
    const matchesType = !selectedType || job.type === selectedType;
    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <PageTransition>
      <div className="min-h-screen">
        <OpportunitesHero />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Rechercher
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="search"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Titre ou entreprise"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Localisation
                </label>
                <select
                  id="location"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="">Toutes les localisations</option>
                  <option value="Paris">Paris</option>
                  <option value="Lyon">Lyon</option>
                  <option value="Bordeaux">Bordeaux</option>
                </select>
              </div>
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Type de contrat
                </label>
                <select
                  id="type"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="">Tous les types</option>
                  <option value="CDI">CDI</option>
                  <option value="CDD">CDD</option>
                  <option value="Stage">Stage</option>
                </select>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredJobs.map(job => (
              <div key={job.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {job.title}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Building2 className="w-4 h-4 mr-2" />
                      {job.company}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {job.location}
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                      {job.type}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  {job.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-2" />
                    {job.postedAt}
                  </div>
                  <Link
                    to={`/opportunites/${job.id}`}
                    className="inline-flex items-center text-primary-600 hover:text-primary-700"
                  >
                    Voir l'offre
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Opportunites; 