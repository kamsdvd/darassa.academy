import React, { useState } from 'react';
import { FormationCard } from '../components/formations/FormationCard';
import { useFormations } from '../hooks/useFormations';

const categories = [
  'Tous',
  'Développement Web',
  'Marketing Digital',
  'Design',
  'Business'
];

export const Formations: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const { formations, loading, error } = useFormations(
    selectedCategory === 'Tous' ? undefined : selectedCategory
  );

  // Afficher les skeletons pendant le chargement
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex overflow-x-auto pb-4 mb-8 gap-4">
          {categories.map((category) => (
            <button
              key={category}
              className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 whitespace-nowrap"
              disabled
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <FormationCard key={index} isLoading={true} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
          Une erreur est survenue lors du chargement des formations.
        </div>
      </div>
    );
  }

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
      
      {formations.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucune formation trouvée dans cette catégorie.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {formations.map((formation) => (
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