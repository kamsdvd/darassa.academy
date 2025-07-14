import React, { useState } from 'react';
import { FormationCard } from '../components/formations/FormationCard';
import { formations as staticFormations } from '../data/formations';

// Extraire dynamiquement les catégories à partir des données statiques
const categories = ['Tous', ...Array.from(new Set(staticFormations.map(f => f.category)))];

export const Formations: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');

  // Filtrer les formations selon la catégorie sélectionnée
  const normalize = (str: string) => str.normalize('NFD').replace(/\p{Diacritic}/gu, '').trim().toLowerCase();
  const filteredFormations = selectedCategory === 'Tous'
    ? staticFormations
    : staticFormations.filter(f => f.category && normalize(f.category) === normalize(selectedCategory));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex overflow-x-auto pb-4 mb-8 gap-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors
              ${selectedCategory === category
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      {filteredFormations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucune formation trouvée dans cette catégorie.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFormations.map((formation) => (
            <FormationCard
              key={formation.id}
              formation={formation}
            />
          ))}
        </div>
      )}
    </div>
  );
};