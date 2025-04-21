import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, Briefcase, GraduationCap, Users, MapPin, Calendar } from 'lucide-react';
import PageTransition from '../../components/shared/PageTransition';

// Types
type JobType = 'CDI' | 'CDD' | 'Stage' | 'Freelance';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: JobType;
  description: string;
  requirements: string[];
  salary?: string;
  postedDate: string;
  logo?: string;
  responsibilities?: string[];
  benefits?: string[];
}

// Données de test (à remplacer par des données réelles)
const jobs: Job[] = [
  {
    id: '1',
    title: 'Développeur Full Stack Senior',
    company: 'Tech Solutions SARL',
    location: 'Kinshasa, RDC',
    type: 'CDI',
    description: 'Nous recherchons un développeur full stack senior pour rejoindre notre équipe et participer au développement de nos applications web.',
    requirements: [
      '5+ ans d\'expérience en développement web',
      'Maîtrise de React et Node.js',
      'Expérience avec les bases de données SQL et NoSQL',
      'Bonnes pratiques de développement et tests',
    ],
    responsibilities: [
      'Développement d\'applications web modernes',
      'Collaboration avec l\'équipe design et produit',
      'Mentorat des développeurs juniors',
      'Participation aux revues de code',
    ],
    benefits: [
      'Salaire compétitif',
      'Assurance maladie',
      'Formation continue',
      'Environnement de travail flexible',
    ],
    salary: '2000-3000 USD',
    postedDate: '2024-04-14',
  },
  // ... autres offres d'emploi
];

const jobTypeIcons = {
  CDI: Building2,
  CDD: Briefcase,
  Stage: GraduationCap,
  Freelance: Users,
};

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const job = jobs.find(j => j.id === id);
  
  if (!job) {
    return (
      <PageTransition>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Offre non trouvée</h1>
            <p className="text-gray-600 mb-8">L'offre d'emploi que vous recherchez n'existe pas ou a été supprimée.</p>
            <button
              onClick={() => navigate('/opportunites')}
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux offres
            </button>
          </div>
        </div>
      </PageTransition>
    );
  }

  const Icon = jobTypeIcons[job.type];

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate('/opportunites')}
          className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour aux offres
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                <p className="text-xl text-gray-600 mb-4">{job.company}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Icon className="w-4 h-4 mr-1" />
                    {job.type}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Publié le {new Date(job.postedDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
              {job.salary && (
                <div className="mt-4 sm:mt-0">
                  <div className="text-primary-600 font-semibold text-lg">{job.salary}</div>
                </div>
              )}
            </div>

            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description du poste</h2>
              <p className="text-gray-600 mb-6">{job.description}</p>

              {job.responsibilities && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Responsabilités</h2>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    {job.responsibilities.map((resp, index) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Prérequis</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  {job.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>

              {job.benefits && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Avantages</h2>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    {job.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors">
                Postuler maintenant
              </button>
              <button className="flex-1 px-6 py-3 border border-primary-600 text-primary-600 rounded-full hover:bg-primary-50 transition-colors">
                Sauvegarder l'offre
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default JobDetail; 