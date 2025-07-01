import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link'; // For navigation
import { useFormations, FrontendPaginatedFormations, useDeleteFormation } from '../../hooks/useFormations.ts'; // CORRECTED PATH
import { Formation } from '../../types/formation.ts'; // CORRECTED PATH
import { Trash2 } from 'lucide-react'; // Icon for delete button

// Categories might become dynamic later, for now static for the filter
const staticCategories = [
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

// Default image if formation.imageUrl is missing
const fallbackImage = "https://via.placeholder.com/600x400/2563eb/ffffff?text=Formation+Darassa";

const FormationCard: React.FC<{ formation: Formation }> = ({ formation }) => {
  const { mutate: deleteFormation, isLoading: isDeleting } = useDeleteFormation();

  const handleDelete = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la formation "${formation.title}" ?`)) {
      deleteFormation(formation.id, {
        onSuccess: () => {
          // Le hook useDeleteFormation gère déjà l'invalidation des queries.
          // On pourrait ajouter une notification de succès ici si nécessaire.
          console.log(`Formation "${formation.title}" supprimée avec succès.`);
        },
        onError: (error) => {
          // Le hook useDeleteFormation gère déjà le console.error.
          // On pourrait ajouter une notification d'erreur ici.
          console.error(`Erreur lors de la suppression de la formation "${formation.title}":`, error);
          alert(`Erreur lors de la suppression : ${error.message}`);
        }
      });
    }
  };

  return (
  <motion.div
    key={formation.id} // key est généralement mis sur l'élément parent lors du map, pas sur le composant lui-même s'il est défini séparément. Mais ici c'est ok.
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
  >
    <div className="relative h-48">
      <img
        src={formation.imageUrl || fallbackImage}
        alt={formation.title}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = fallbackImage;
        }}
      />
    </div>
    <div className="p-6 flex flex-col flex-grow">
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
      <p className="text-gray-600 mb-4 flex-grow">
        {formation.description.substring(0, 100)}{formation.description.length > 100 ? '...' : ''}
      </p>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-sm font-medium text-gray-700">
          Niveau : {formation.level}
        </span>
        <div className="flex items-center space-x-2">
          <Link href={`/formations/${formation.id}`} passHref>
            <a className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              En savoir plus
            </a>
          </Link>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
            aria-label="Supprimer la formation"
          >
            {isDeleting ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <Trash2 size={16} />
            )}
          </button>
        </div>
      </div>
    </div>
  </motion.div>
  );
};

const FormationList: React.FC = () => {
  // Importer useDeleteFormation ici si la logique de suppression est gérée au niveau de FormationList
  // ou directement dans FormationCard si FormationCard devient un composant plus autonome avec son propre hook.
  // Pour l'instant, la logique sera dans FormationCard.

  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Or make this configurable

  // Pass category and pagination params to the hook
  // The backend service currently has a placeholder for category, and supports 'niveau'
  // For now, we pass 'category' as a param. The hook/service needs to handle it.
  // 'level' could also be a filter here.
  const {
    data: paginatedFormations,
    isLoading,
    isError,
    error
  } = useFormations({
    page: currentPage,
    limit: itemsPerPage,
    category: selectedCategory,
    // level: selectedLevel, // Example if we add level filter
  });

  // TODO: Implement a proper pagination component
  // For now, basic buttons if there are multiple pages
  const renderPagination = () => {
    if (!paginatedFormations || paginatedFormations.meta.totalPages <= 1) {
      return null;
    }
    return (
      <div className="mt-12 flex justify-center items-center space-x-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1 || isLoading}
          className="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          Précédent
        </button>
        <span>Page {paginatedFormations.meta.currentPage} sur {paginatedFormations.meta.totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(paginatedFormations.meta.totalPages, prev + 1))}
          disabled={currentPage === paginatedFormations.meta.totalPages || isLoading}
          className="px-4 py-2 border rounded-lg disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    );
  };

  if (isLoading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <p>Chargement des formations...</p>
          {/* You could add a spinner component here */}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 text-center text-red-500">
          <p>Erreur lors du chargement des formations : {error?.message}</p>
        </div>
      </section>
    );
  }

  const formationsToDisplay = paginatedFormations?.data || [];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Nos Formations</h2>
          <select
            value={selectedCategory || ""}
            onChange={(e) => {
              setSelectedCategory(e.target.value || undefined);
              setCurrentPage(1); // Reset to first page on filter change
            }}
            className="w-full md:w-64 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Toutes les catégories</option>
            {staticCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {formationsToDisplay.length === 0 && !isLoading && (
          <div className="text-center text-gray-500 py-10">
            <p>Aucune formation trouvée pour les critères sélectionnés.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {formationsToDisplay.map((formation) => (
            // Si la logique de suppression est dans FormationCard, pas besoin de passer de props ici pour cela.
            <FormationCard key={formation.id} formation={formation} />
          ))}
        </div>
        {renderPagination()}
      </div>
    </section>
  );
};

export default FormationList;