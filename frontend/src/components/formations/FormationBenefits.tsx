import React from 'react';
import { motion } from 'framer-motion';

const benefits = [
  {
    id: 1,
    title: 'Formateurs Experts',
    description: 'Des formateurs expérimentés et passionnés par leur domaine',
    icon: '👨‍🏫',
  },
  {
    id: 2,
    title: 'Projets Pratiques',
    description: 'Des projets concrets pour mettre en pratique vos connaissances',
    icon: '💼',
  },
  {
    id: 3,
    title: 'Certification',
    description: 'Une certification reconnue à la fin de votre formation',
    icon: '🎓',
  },
  {
    id: 4,
    title: 'Support Continu',
    description: 'Un accompagnement personnalisé tout au long de votre formation',
    icon: '🤝',
  },
  {
    id: 5,
    title: 'Réseau Professionnel',
    description: "Accès à notre réseau d'entreprises partenaires",
    icon: '🌐',
  },
  {
    id: 6,
    title: 'Flexibilité',
    description: 'Des formations adaptées à votre emploi du temps',
    icon: '⏰',
  },
];

const FormationBenefits: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Pourquoi Choisir Nos Formations ?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les avantages qui font la différence dans nos formations professionnelles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FormationBenefits; 