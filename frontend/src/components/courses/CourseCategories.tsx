import React from 'react';
import { motion } from 'framer-motion';
import { courses } from '../../data/courses';

const getFormationCount = (category: string) => {
  return courses.filter(f => f.category === category).length;
};

const categories = [
  {
    id: 1,
    title: "Bureautique",
    description: "Maîtrisez les outils bureautiques essentiels",
    icon: "💻",
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: 2,
    title: "Intelligence Artificielle",
    description: "Explorez le monde de l'IA et du Machine Learning",
    icon: "🤖",
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: 3,
    title: "Langues",
    description: "Développez vos compétences linguistiques",
    icon: "🌍",
    color: "bg-green-100 text-green-700",
  },
  {
    id: 4,
    title: "Design",
    description: "Créez des designs modernes et attractifs",
    icon: "🎨",
    color: "bg-pink-100 text-pink-700",
  },
  {
    id: 5,
    title: "Développement Web",
    description: "Créez des applications web modernes",
    icon: "🌐",
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    id: 6,
    title: "Gestion de Projets",
    description: "Gérez efficacement vos projets",
    icon: "📊",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    id: 7,
    title: "Business et Management",
    description: "Développez vos compétences en gestion d'entreprise",
    icon: "💼",
    color: "bg-orange-100 text-orange-700",
  },
  {
    id: 8,
    title: "Analyse de Données",
    description: "Maîtrisez l'analyse et la visualisation des données",
    icon: "📈",
    color: "bg-cyan-100 text-cyan-700",
  },
  {
    id: 9,
    title: "Base de Données",
    description: "Gérez et optimisez vos bases de données",
    icon: "🗄️",
    color: "bg-teal-100 text-teal-700",
  },
  {
    id: 10,
    title: "Ingénierie des Réseaux",
    description: "Concevez et gérez des infrastructures réseaux",
    icon: "🌐",
    color: "bg-red-100 text-red-700",
  },
  {
    id: 11,
    title: "Administration Systèmes",
    description: "Administrez et sécurisez vos systèmes",
    icon: "🔧",
    color: "bg-slate-100 text-slate-700",
  },
];

const CourseCategories: React.FC = () => {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Nos Domaines de Formation
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Découvrez nos différentes catégories de formations adaptées à vos besoins professionnels
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center text-2xl`}>
                {category.icon}
              </div>
              <span className={`${category.color.replace('100', '50')} px-3 py-1 rounded-full text-sm font-medium`}>
                {getFormationCount(category.title)} formations
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {category.title}
            </h3>
            <p className="text-gray-600">
              {category.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CourseCategories; 