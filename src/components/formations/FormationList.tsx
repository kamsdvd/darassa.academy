import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { formations } from '../../data/formations';

const categories = [
  "Bureautique",
  "Intelligence Artificielle",
  "Langues",
  "Design",
  "Développement Web",
  "Gestion de Projets",
  "Business et Management",
  "Analyse de Données",
  "Base de Données",
  "Ingénierie des Réseaux",
  "Administration Systèmes"
];

// Image par défaut pour toutes les formations
const defaultImage = "https://via.placeholder.com/600x400/2563eb/ffffff?text=Formation+Darassa";

const FormationList: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const filteredFormations = selectedCategory
    ? formations.filter(formation => formation.category === selectedCategory)
    : formations;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-64 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Toutes les formations</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFormations.map((formation) => (
            <motion.div
              key={formation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <img
                  src={defaultImage}
                  alt={formation.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://via.placeholder.com/600x400/2563eb/ffffff?text=Formation+Darassa";
                  }}
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                  {formation.price}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-600">
                    {formation.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formation.duration}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {formation.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {formation.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Niveau : {formation.level}
                  </span>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    En savoir plus
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FormationList; 