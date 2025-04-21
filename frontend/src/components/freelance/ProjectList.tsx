import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Données de test (à remplacer par des données réelles plus tard)
const projects = [
  {
    id: 1,
    title: "Développement d'une application web e-commerce",
    category: "Développement Web",
    budget: "3000-5000€",
    duration: "2-3 mois",
    description: "Nous recherchons un développeur expérimenté pour créer une application e-commerce complète avec React et Node.js...",
    skills: ["React", "Node.js", "MongoDB", "Redux"],
    postedAt: "Il y a 1 jour",
    proposals: 5,
  },
  {
    id: 2,
    title: "Création d'une identité visuelle complète",
    category: "Design",
    budget: "1000-2000€",
    duration: "2-4 semaines",
    description: "Création d'un logo, charte graphique et supports de communication pour une nouvelle startup...",
    skills: ["Logo Design", "Branding", "Adobe Creative Suite"],
    postedAt: "Il y a 3 jours",
    proposals: 8,
  },
  {
    id: 3,
    title: "Campagne marketing sur les réseaux sociaux",
    category: "Marketing Digital",
    budget: "800-1500€",
    duration: "1 mois",
    description: "Mise en place et gestion d'une campagne marketing sur Facebook, Instagram et LinkedIn...",
    skills: ["Social Media Marketing", "Content Creation", "Analytics"],
    postedAt: "Il y a 5 heures",
    proposals: 3,
  },
];

const ProjectList: React.FC = () => {
  return (
    <div className="space-y-6">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  <Link 
                    to={`/freelance/${project.id}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {project.title}
                  </Link>
                </h3>
                <div className="flex gap-2 items-center text-sm text-gray-600">
                  <span className="font-medium">{project.category}</span>
                  <span>•</span>
                  <span>Publié {project.postedAt}</span>
                  <span>•</span>
                  <span>{project.proposals} propositions</span>
                </div>
              </div>

              <p className="text-gray-600">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Budget:</span>
                  <span className="text-sm text-gray-600">{project.budget}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Durée:</span>
                  <span className="text-sm text-gray-600">{project.duration}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <Link 
              to={`/freelance/${project.id}`}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Voir les détails
            </Link>
            <Link
              to={`/freelance/${project.id}`}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Soumettre une proposition
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProjectList; 