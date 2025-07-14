import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { Course } from '@/types/course'; // MODIFIÉ
import LoadingSpinner from '@/modules/common/components/LoadingSpinner';
import { courses as staticCourses } from '../../data/courses'; // Importation des données statiques

// --- Constants ---
const STATIC_CATEGORIES = [
  "Bureautique", "Intelligence Artificielle", "Langues", "Design",
  "Développement Web", "Gestion de Projets", "Business et Management",
  "Analyse de Données", "Base de Données", "Ingénierie des Réseaux",
  "Administration Systèmes"
];
const COLOR_PALETTE = [
  "#0ea5e9", // primary-500
  "#c026d3", // secondary-600
  "#0284c7", // primary-600
  "#a21caf", // secondary-700
  "#0369a1", // primary-700
  "#86198f", // secondary-800
];

const generateColorSvg = (id: string | number) => {
  const stringId = String(id);
  const hash = stringId.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
  const colorIndex = Math.abs(hash) % COLOR_PALETTE.length;
  const color = COLOR_PALETTE[colorIndex];
  const svg = `<svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg"><rect width="600" height="400" fill="${color}"/></svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// --- Child Components ---
const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
    >
      <div className="relative h-48">
        <img
          src={course.imageUrl || generateColorSvg(course.id)}
          alt={course.title}
          className="w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).src = generateColorSvg(course.id); }}
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-blue-600">{course.category}</span>
          <span className="text-sm text-gray-500">{course.duration}</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
        <p className="text-gray-600 mb-4 flex-grow">
          {course.description.substring(0, 100)}{course.description.length > 100 ? '...' : ''}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-sm font-medium text-gray-700">Niveau : {course.level}</span>
          <div className="flex items-center space-x-2">
            <Link to={`/courses/${course.id}`} className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              En savoir plus
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Pagination: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
  isLoading: boolean;
}> = ({ currentPage, totalPages, onPageChange, isLoading }) => {
  return (
    <div className="mt-12 flex justify-center items-center space-x-2">
      <button
        onClick={() => onPageChange(prev => Math.max(1, prev - 1))}
        disabled={currentPage === 1 || isLoading}
        className="px-4 py-2 border rounded-lg disabled:opacity-50"
      >
        Précédent
      </button>
      <span>Page {currentPage} sur {totalPages}</span>
      <button
        onClick={() => onPageChange(prev => Math.min(totalPages, prev + 1))}
        disabled={currentPage === totalPages || isLoading}
        className="px-4 py-2 border rounded-lg disabled:opacity-50"
      >
        Suivant
      </button>
    </div>
  );
};


// --- Main Component ---
function CourseList() { // MODIFIÉ
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  const filteredCourses = selectedCategory
    ? staticCourses.filter(course => course.category === selectedCategory)
    : staticCourses;

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const coursesToDisplay = filteredCourses.slice(startIndex, endIndex);

  const isLoading = false;
  const isError = false;
  const error = null;
  const isFetching = false;

  const meta = {
    currentPage,
    totalPages,
    totalItems: filteredCourses.length,
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">Nos Cours</h2> {/* MODIFIÉ */}
          <select
            value={selectedCategory || ""}
            onChange={(e) => {
              setSelectedCategory(e.target.value || undefined);
              setCurrentPage(1);
            }}
            className="w-full md:w-64 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Toutes les catégories</option>
            {STATIC_CATEGORIES.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {isFetching && <div className="text-center text-gray-500 py-4">Mise à jour...</div>}

        {!isFetching && coursesToDisplay.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            <p>Aucun cours trouvé pour les critères sélectionnés.</p> {/* MODIFIÉ */}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coursesToDisplay.map((course: Course) => ( // MODIFIÉ
              <CourseCard key={course.id} course={course} /> // MODIFIÉ
            ))}
          </div>
        )}

        {meta && meta.totalPages > 1 && (
          <Pagination
            currentPage={meta.currentPage}
            totalPages={meta.totalPages}
            onPageChange={setCurrentPage}
            isLoading={isFetching}
          />
        )}
      </div>
    </section>
  );
};

export default CourseList; // MODIFIÉ
