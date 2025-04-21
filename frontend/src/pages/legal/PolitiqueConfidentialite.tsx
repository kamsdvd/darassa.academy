import React from 'react';
import { motion } from 'framer-motion';

const PolitiqueConfidentialite: React.FC = () => {
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
            Politique de Confidentialité
          </h1>

          <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Collecte des données personnelles</h2>
              <p className="text-gray-600">
                Nous collectons les informations suivantes :
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone</li>
                <li>Données de connexion et d'utilisation</li>
                <li>Informations de paiement (via un prestataire sécurisé)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Utilisation des données</h2>
              <p className="text-gray-600">
                Les données collectées sont utilisées pour :
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                <li>Gérer votre compte et accès aux formations</li>
                <li>Personnaliser votre expérience d'apprentissage</li>
                <li>Vous informer sur nos services et mises à jour</li>
                <li>Traiter vos paiements</li>
                <li>Améliorer nos services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Protection des données</h2>
              <p className="text-gray-600">
                Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données personnelles contre tout accès, 
                modification, divulgation ou destruction non autorisée. Ces mesures incluent le chiffrement des données, 
                les pare-feu et les contrôles d'accès sécurisés.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Partage des données</h2>
              <p className="text-gray-600">
                Nous ne partageons vos données personnelles qu'avec :
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                <li>Nos prestataires de services (hébergement, paiement)</li>
                <li>Les autorités compétentes sur demande légale</li>
                <li>Les formateurs pour les formations auxquelles vous êtes inscrit</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Vos droits</h2>
              <p className="text-gray-600">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                <li>Droit d'accès à vos données</li>
                <li>Droit de rectification</li>
                <li>Droit à l'effacement</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité des données</li>
                <li>Droit d'opposition</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
              <p className="text-gray-600">
                Nous utilisons des cookies pour :
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                <li>Maintenir votre session</li>
                <li>Mémoriser vos préférences</li>
                <li>Analyser l'utilisation du site</li>
                <li>Personnaliser votre expérience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Modifications</h2>
              <p className="text-gray-600">
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. 
                Les modifications entrent en vigueur dès leur publication sur le site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Contact</h2>
              <p className="text-gray-600">
                Pour toute question concernant notre politique de confidentialité, contactez-nous à :<br />
                Email : privacy@darassa.academy
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PolitiqueConfidentialite; 