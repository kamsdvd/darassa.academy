import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "Comment puis-je m'inscrire sur Darassa Academy ?",
      answer: "Pour vous inscrire, cliquez sur le bouton 'S'inscrire' en haut à droite de la page. Vous pourrez choisir entre un compte apprenant ou formateur. Remplissez le formulaire avec vos informations personnelles et suivez les instructions pour finaliser votre inscription."
    },
    {
      question: "Comment fonctionne le système de paiement ?",
      answer: "Nous acceptons les cartes de crédit et les virements bancaires. Les paiements sont sécurisés et traités par notre partenaire de paiement. Vous recevrez une facture par email après chaque transaction."
    },
    {
      question: "Puis-je accéder aux cours hors ligne ?",
      answer: "Oui, avec notre application PWA, vous pouvez télécharger les cours pour les consulter hors ligne. Cependant, certaines fonctionnalités comme les quiz et les interactions avec les formateurs nécessitent une connexion internet."
    },
    {
      question: "Comment devenir formateur sur la plateforme ?",
      answer: "Pour devenir formateur, créez un compte formateur et soumettez votre profil avec vos qualifications et expériences. Notre équipe examinera votre candidature et vous guidera dans le processus d'approbation."
    },
    {
      question: "Quelle est la politique de remboursement ?",
      answer: "Nous offrons une garantie de remboursement de 30 jours si vous n'êtes pas satisfait de votre formation. Contactez notre service client pour initier le processus de remboursement."
    },
    {
      question: "Comment puis-je contacter le support ?",
      answer: "Notre équipe de support est disponible 7j/7 via email à support@darassa.academy. Vous pouvez également utiliser notre chat en ligne pendant les heures de bureau."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 py-12"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-center mb-8">
            Questions Fréquentes
          </h1>
          <p className="text-center text-gray-600 mb-12">
            Trouvez des réponses aux questions les plus courantes sur Darassa Academy
          </p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-lg">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-gray-600">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Vous ne trouvez pas la réponse à votre question ?
            </p>
            <a
              href="/contact"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
            >
              Contactez-nous
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FAQ; 