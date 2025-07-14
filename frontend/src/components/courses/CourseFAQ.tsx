import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    id: 1,
    question: "Quels sont les prérequis pour suivre une formation ?",
    answer: "Les prérequis varient selon la formation. En général, nous demandons une motivation forte et une bonne base en informatique. Pour les formations techniques, des connaissances de base dans le domaine sont recommandées.",
  },
  {
    id: 2,
    question: "Comment se déroulent les formations ?",
    answer: "Nos formations se déroulent en présentiel ou en ligne selon votre choix. Elles combinent théorie et pratique avec des projets concrets. Vous bénéficiez d'un accompagnement personnalisé tout au long de votre parcours.",
  },
  {
    id: 3,
    question: "Quelle est la durée des formations ?",
    answer: "La durée varie selon la formation, de 1 à 6 mois. Chaque formation comprend un nombre d'heures défini et peut être suivie à votre rythme dans certains cas.",
  },
  {
    id: 4,
    question: "Les formations sont-elles certifiantes ?",
    answer: "Oui, toutes nos formations débouchent sur une certification reconnue. Cette certification atteste de vos compétences et peut être un atout majeur sur votre CV.",
  },
  {
    id: 5,
    question: "Quels sont les modes de paiement acceptés ?",
    answer: "Nous acceptons les paiements par carte bancaire, virement bancaire et dans certains cas, le paiement en plusieurs fois est possible.",
  },
  {
    id: 6,
    question: "Y a-t-il un accompagnement après la formation ?",
    answer: "Oui, nous proposons un accompagnement post-formation de 3 mois. Vous avez accès à notre réseau d'entreprises partenaires et à nos conseillers en insertion professionnelle.",
  },
];

const CourseFAQ: React.FC = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Questions Fréquentes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tout ce que vous devez savoir sur nos formations
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full text-left bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-6 h-6 transform transition-transform ${
                      openId === faq.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                <AnimatePresence>
                  {openId === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-gray-600">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseFAQ; 