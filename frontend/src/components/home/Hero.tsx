import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../shared/Button';
import { Link } from 'react-router-dom';
import { LazyImage } from '../shared/LazyImage';
import heroImage from '../../assets/images/hero-image.png';

export const Hero: React.FC = () => {
  return (
    <header className="relative min-h-[600px] flex items-center bg-gradient-to-r from-primary-600 to-primary-700 w-full">
      <div className="absolute inset-0 overflow-hidden">
        <LazyImage 
          src={heroImage}
          alt="Étudiants africains en situation d'apprentissage"
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#007BFF]/90 to-[#007BFF]/70 z-10"></div>
      </div>
      <div className="relative w-full px-4 sm:px-6 lg:px-8 py-24 z-20">
        <div className="max-w-7xl mx-auto">
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
            <Link to="/affiliation">
              <Button
                variant="outline"
                size="lg"
              >
                Programme d'affiliation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}; 