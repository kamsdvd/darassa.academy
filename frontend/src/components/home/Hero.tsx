import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../shared/Button';
import { Link } from 'react-router-dom';
import heroImage from '../../assets/images/hero-image.png';

export const Hero: React.FC = () => {
  return (
    <header className="relative min-h-[600px] flex items-center bg-gradient-to-r from-primary-600 to-primary-700">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#007BFF]/90 to-[#007BFF]/70"></div>
        <img 
          src={heroImage}
          alt="Étudiants africains en situation d'apprentissage"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
          Formez-vous aux métiers d'avenir
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl text-white/90">
          Darassa Academy vous offre des formations certifiantes avec une garantie d'emploi en RDC et en Afrique.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/entreprises/inscription">
            <Button
              variant="secondary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
            >
              S'inscrire maintenant
            </Button>
          </Link>
          <Link to="/programme-mlm">
            <Button
              variant="outline"
              size="lg"
            >
              Devenir représentant
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}; 