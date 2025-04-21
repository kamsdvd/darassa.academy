import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Heart } from 'lucide-react';

const APropos: React.FC = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const features = [
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: "Notre Mission",
      description: "Connecter les apprenants aux meilleurs formateurs et créer des opportunités d'apprentissage de qualité."
    },
    {
      icon: <Target className="w-12 h-12 text-primary" />,
      title: "Notre Vision",
      description: "Devenir la plateforme de référence pour l'apprentissage en ligne en Afrique."
    },
    {
      icon: <Award className="w-12 h-12 text-primary" />,
      title: "Nos Valeurs",
      description: "Excellence, Innovation, Accessibilité et Engagement communautaire."
    },
    {
      icon: <Heart className="w-12 h-12 text-primary" />,
      title: "Notre Engagement",
      description: "Nous nous engageons à fournir une expérience d'apprentissage exceptionnelle à tous nos utilisateurs."
    }
  ];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
      className="min-h-screen bg-gray-50"
    >
      {/* Hero Section */}
      <section className="relative py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              À Propos de Darassa Academy
            </h1>
            <p className="text-xl text-gray-100">
              Votre plateforme d'apprentissage en ligne de confiance
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold mb-8 text-center">Notre Histoire</h2>
            <div className="prose prose-lg mx-auto">
              <p className="mb-4">
                Darassa Academy est née de la vision de créer une plateforme d'apprentissage en ligne accessible à tous. 
                Notre mission est de démocratiser l'accès à l'éducation de qualité en connectant les apprenants aux meilleurs formateurs.
              </p>
              <p className="mb-4">
                Depuis notre lancement, nous avons aidé des milliers d'apprenants à atteindre leurs objectifs professionnels 
                et personnels à travers nos formations de qualité.
              </p>
              <p>
                Nous continuons à innover et à améliorer notre plateforme pour offrir la meilleure expérience d'apprentissage possible 
                à notre communauté grandissante.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default APropos; 