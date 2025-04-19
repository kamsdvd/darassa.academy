import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Données de test (à remplacer par des données réelles plus tard)
const jobs = [
  {
    id: 1,
    title: "Développeur Full Stack React/Node.js",
    company: "Tech Solutions",
    location: "Paris",
    type: "CDI",
    salary: "45-60k€",
    description: "Nous recherchons un développeur Full Stack expérimenté pour rejoindre notre équipe dynamique...",
    postedAt: "Il y a 2 jours",
  },
  {
    id: 2,
    title: "Data Scientist Senior",
    company: "DataCorp",
    location: "Lyon",
    type: "CDI",
    salary: "50-70k€",
    description: "Rejoignez notre équipe de data scientists pour travailler sur des projets innovants...",
    postedAt: "Il y a 3 jours",
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "Creative Agency",
    location: "Bordeaux",
    type: "CDD",
    salary: "35-45k€",
    description: "Nous cherchons un designer talentueux pour concevoir des expériences utilisateur exceptionnelles...",
    postedAt: "Il y a 1 jour",
  },
];

const JobList: React.FC = () => {
  return (
    <div className="space-y-6">
      {jobs.map((job, index) => (
        <motion.div
          key={job.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                <Link 
                  to={`/emploi/${job.id}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {job.title}
                </Link>
              </h3>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium text-gray-900">{job.company}</span> • {job.location}
                </p>
                <p className="text-gray-600">{job.description}</p>
                <div className="flex gap-2 mt-3">
                  <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
                    {job.type}
                  </span>
                  <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
                    {job.salary}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-500">{job.postedAt}</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <Link 
              to={`/emploi/${job.id}`}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Voir plus de détails
            </Link>
            <Link
              to={`/emploi/${job.id}`}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Postuler
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default JobList; 