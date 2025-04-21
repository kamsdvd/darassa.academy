import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Briefcase, Search } from 'lucide-react';

const OpportunitesHero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-blue-800/50"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/20 rounded-full">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Opportunités Professionnelles
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Découvrez les meilleures opportunités d'emploi et de carrière pour développer votre avenir professionnel
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="relative max-w-md mx-auto w-full">
              <input
                type="text"
                placeholder="Rechercher un emploi..."
                className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </div>
            <Link 
              to="/entreprises/recrutement" 
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors whitespace-nowrap"
            >
              Publier une offre
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OpportunitesHero; 