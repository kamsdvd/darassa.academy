import React from 'react';
import { useParams } from 'react-router-dom';
import PageTransition from '../../components/shared/PageTransition';

// Données de test (à remplacer par des données réelles plus tard)
const projectDetail = {
  id: 1,
  title: "Développement d'une application web e-commerce",
  category: "Développement Web",
  budget: "3000-5000€",
  duration: "2-3 mois",
  description: `Nous recherchons un développeur expérimenté pour créer une application e-commerce complète.

Description du projet :
- Développement d'une plateforme e-commerce moderne et responsive
- Intégration avec des systèmes de paiement (Stripe, PayPal)
- Gestion des produits et des catégories
- Système de panier et de commande
- Interface d'administration complète
- Optimisation des performances et du SEO

Technologies requises :
- React.js pour le frontend
- Node.js et Express pour le backend
- MongoDB pour la base de données
- Redux pour la gestion d'état
- Intégration de passerelles de paiement
- Déploiement sur AWS ou similaire`,
  skills: ["React", "Node.js", "MongoDB", "Redux", "Stripe", "AWS"],
  requirements: [
    "3+ ans d'expérience en développement web",
    "Portfolio de projets similaires",
    "Excellente communication",
    "Disponibilité pour des réunions régulières",
    "Capacité à respecter les délais"
  ],
  clientInfo: {
    name: "E-Shop Solutions",
    location: "France",
    projectsPosted: 12,
    memberSince: "2022",
    rating: 4.8,
  },
  postedAt: "Il y a 1 jour",
  proposals: 5,
  attachments: [
    "Cahier des charges.pdf",
    "Maquettes UI.sketch"
  ]
};

const ProjectDetail: React.FC = () => {
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
                    {projectDetail.title}
                  </h1>
                  <div className="flex gap-2 items-center text-gray-600 mb-4">
                    <span className="font-medium">{projectDetail.category}</span>
                    <span>•</span>
                    <span>Publié {projectDetail.postedAt}</span>
                    <span>•</span>
                    <span>{projectDetail.proposals} propositions</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
                      Budget: {projectDetail.budget}
                    </span>
                    <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
                      Durée: {projectDetail.duration}
                    </span>
                  </div>
                </div>
                <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Soumettre une proposition
                </button>
              </div>
            </div>

            {/* Corps */}
            <div className="p-6 space-y-6">
              {/* Description */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Description du projet</h2>
                <div className="prose max-w-none">
                  {projectDetail.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-600">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>

              {/* Compétences requises */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Compétences requises</h2>
                <div className="flex flex-wrap gap-2">
                  {projectDetail.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              {/* Prérequis */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Prérequis</h2>
                <ul className="list-disc list-inside space-y-2">
                  {projectDetail.requirements.map((req, index) => (
                    <li key={index} className="text-gray-600">{req}</li>
                  ))}
                </ul>
              </section>

              {/* Pièces jointes */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Pièces jointes</h2>
                <div className="space-y-2">
                  {projectDetail.attachments.map((attachment, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                    >
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        />
                      </svg>
                      <span className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">
                        {attachment}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* À propos du client */}
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">À propos du client</h2>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    <span className="font-medium">Entreprise:</span> {projectDetail.clientInfo.name}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Localisation:</span> {projectDetail.clientInfo.location}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Projets publiés:</span> {projectDetail.clientInfo.projectsPosted}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Membre depuis:</span> {projectDetail.clientInfo.memberSince}
                  </p>
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-gray-600">Note:</span>
                    <span className="text-yellow-400">{'★'.repeat(Math.floor(projectDetail.clientInfo.rating))}</span>
                    <span className="text-gray-400">{'★'.repeat(5 - Math.floor(projectDetail.clientInfo.rating))}</span>
                    <span className="text-gray-600">({projectDetail.clientInfo.rating})</span>
                  </div>
                </div>
              </section>
            </div>

            {/* Pied de page */}
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  <span className="font-medium">Budget estimé:</span> {projectDetail.budget}
                </div>
                <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Soumettre une proposition
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProjectDetail; 