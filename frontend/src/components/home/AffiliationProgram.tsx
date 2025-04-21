import React from 'react';
import { Link } from 'react-router-dom';

const AffiliationProgram: React.FC = () => {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Programme d'affiliation
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Développez votre réseau et gagnez des revenus attractifs en rejoignant notre programme de partenariat
          </p>
          <Link
            to="/affiliation"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            En savoir plus
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AffiliationProgram; 