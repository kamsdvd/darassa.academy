import React from 'react';
import { useParams } from 'react-router-dom';
import PageTransition from '../../components/shared/PageTransition';

// Données de test (à remplacer par des données réelles plus tard)
const jobDetail = {
  id: 1,
  title: "Développeur Full Stack React/Node.js",
  company: "Tech Solutions",
  location: "Paris",
  type: "CDI",
  salary: "45-60k€",
  description: `Nous recherchons un développeur Full Stack expérimenté pour rejoindre notre équipe dynamique.

Description du poste :
- Développement de nouvelles fonctionnalités pour notre plateforme SaaS
- Maintenance et amélioration des fonctionnalités existantes
- Participation aux choix techniques et architecturaux
- Collaboration étroite avec l'équipe produit

Compétences requises :
- Maîtrise de React.js et Node.js
- Expérience avec les bases de données SQL et NoSQL
- Connaissance des principes de CI/CD
- Bon niveau en anglais technique

Avantages :
- Télétravail partiel possible
- Mutuelle d'entreprise
- Tickets restaurant
- Formation continue
- Équipe internationale`,
  requirements: [
    "3+ ans d'expérience en développement web",
    "Maîtrise de React.js et Node.js",
    "Expérience avec les bases de données SQL et NoSQL",
    "Connaissance des principes de CI/CD",
    "Bon niveau en anglais technique"
  ],
  benefits: [
    "Télétravail partiel possible",
    "Mutuelle d'entreprise",
    "Tickets restaurant",
    "Formation continue",
    "Équipe internationale"
  ],
  companyDescription: "Tech Solutions est une entreprise innovante spécialisée dans le développement de solutions SaaS pour les entreprises. Avec plus de 100 clients dans toute l'Europe, nous connaissons une croissance rapide et recherchons de nouveaux talents pour renforcer nos équipes.",
  postedAt: "Il y a 2 jours",
};

const JobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* En-tête */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {jobDetail.title}
                  </h1>
                  <p className="text-lg text-gray-600 mb-4">
                    {jobDetail.company} • {jobDetail.location}
                  </p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
                      {jobDetail.type}
                    </span>
                    <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
                      {jobDetail.salary}
                    </span>
                  </div>
                </div>
                <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Postuler
                </button>
              </div>
            </div>

            {/* Corps */}
            <div className="p-6 space-y-6">
              {/* Description */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Description du poste</h2>
                <div className="prose max-w-none">
                  {jobDetail.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-600">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>

              {/* Prérequis */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Prérequis</h2>
                <ul className="list-disc list-inside space-y-2">
                  {jobDetail.requirements.map((req, index) => (
                    <li key={index} className="text-gray-600">{req}</li>
                  ))}
                </ul>
              </section>

              {/* Avantages */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Avantages</h2>
                <ul className="list-disc list-inside space-y-2">
                  {jobDetail.benefits.map((benefit, index) => (
                    <li key={index} className="text-gray-600">{benefit}</li>
                  ))}
                </ul>
              </section>

              {/* À propos de l'entreprise */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">À propos de {jobDetail.company}</h2>
                <p className="text-gray-600">{jobDetail.companyDescription}</p>
              </section>
            </div>

            {/* Pied de page */}
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Publié {jobDetail.postedAt}
                </span>
                <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Postuler maintenant
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default JobDetail; 