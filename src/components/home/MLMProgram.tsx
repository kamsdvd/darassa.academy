import React from 'react';
import { ChevronRight } from 'lucide-react';
import Button from '../shared/Button';

const MLMProgram: React.FC = () => {
  return (
    <section className="relative py-24">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#007BFF] opacity-90"></div>
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80"
          alt="Programme d'affiliation"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Devenez Représentant Darassa</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Gagnez jusqu'à 1000$ à la fin de votre formation en recommandant nos cours. Rejoignez notre programme d'affiliation dès aujourd'hui !
        </p>
        <Button
          variant="secondary"
          size="lg"
          icon={ChevronRight}
          iconPosition="right"
        >
          Découvrir le programme d'affiliation
        </Button>
      </div>
    </section>
  );
};

export default MLMProgram; 