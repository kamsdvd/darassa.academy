import React from 'react';
import { motion } from 'framer-motion';

const CourseHero: React.FC = () => {
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
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Nos Formations Professionnelles
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Développez vos compétences avec nos formations de qualité, conçues pour répondre aux besoins du marché du travail
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-700 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Découvrir nos formations
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors">
              Nous contacter
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CourseHero; 