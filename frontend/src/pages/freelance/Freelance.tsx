import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../../components/shared/PageTransition';
import ProjectSearch from '../../components/freelance/ProjectSearch';
import ProjectList from '../../components/freelance/ProjectList';

const Freelance: React.FC = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Trouvez des projets freelance
            </h1>
            <p className="text-xl text-gray-600">
              Connectez-vous avec des clients du monde entier
            </p>
          </div>
          
          <ProjectSearch />
          <ProjectList />
        </div>
      </div>
    </PageTransition>
  );
};

export default Freelance; 