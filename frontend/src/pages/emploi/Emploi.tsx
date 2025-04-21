import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../../components/shared/PageTransition';
import JobSearch from '../../components/emploi/JobSearch';
import JobList from '../../components/emploi/JobList';

const Emploi: React.FC = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Trouvez votre prochain emploi
            </h1>
            <p className="text-xl text-gray-600">
              Des milliers d'opportunités professionnelles vous attendent
            </p>
          </div>
          
          <JobSearch />
          <JobList />
        </div>
      </div>
    </PageTransition>
  );
};

export default Emploi; 