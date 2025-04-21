import React from 'react';
import { motion } from 'framer-motion';

const ConditionsUtilisation: React.FC = () => {
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
            Conditions d'Utilisation
          </h1>

          <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptation des conditions</h2>
              <p className="text-gray-600">
                En accédant et en utilisant le site Darassa Academy, vous acceptez d'être lié par les présentes conditions 
                d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Description du service</h2>
              <p className="text-gray-600">
                Darassa Academy est une plateforme d'apprentissage en ligne qui propose :
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                <li>Des cours en ligne</li>
                <li>Des formations certifiantes</li>
                <li>Des ressources pédagogiques</li>
                <li>Des interactions avec des formateurs</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Inscription et compte</h2>
              <p className="text-gray-600">
                Pour accéder à certains services, vous devez créer un compte. Vous vous engagez à :
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                <li>Fournir des informations exactes et complètes</li>
                <li>Maintenir la confidentialité de vos identifiants</li>
                <li>Ne pas créer de compte multiple</li>
                <li>Ne pas usurper l'identité d'un tiers</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Paiements et remboursements</h2>
              <p className="text-gray-600">
                Les conditions de paiement et de remboursement sont les suivantes :
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                <li>Les prix sont indiqués en euros TTC</li>
                <li>Le paiement est sécurisé via nos prestataires</li>
                <li>Un remboursement est possible sous 30 jours</li>
                <li>Les promotions sont soumises à conditions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Propriété intellectuelle</h2>
              <p className="text-gray-600">
                Tout le contenu disponible sur Darassa Academy (cours, vidéos, textes, logos, etc.) est protégé par 
                les droits de propriété intellectuelle. Vous vous engagez à :
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                <li>Ne pas reproduire le contenu sans autorisation</li>
                <li>Ne pas partager vos accès</li>
                <li>Respecter les droits des auteurs</li>
                <li>Utiliser le contenu uniquement à des fins personnelles</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Responsabilités</h2>
              <p className="text-gray-600">
                Darassa Academy ne peut être tenu responsable :
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                <li>Des interruptions temporaires du service</li>
                <li>Des problèmes techniques indépendants de notre volonté</li>
                <li>Du contenu généré par les utilisateurs</li>
                <li>Des dommages indirects liés à l'utilisation du service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Résiliation</h2>
              <p className="text-gray-600">
                Nous nous réservons le droit de suspendre ou supprimer un compte en cas de :
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-2">
                <li>Non-respect des présentes conditions</li>
                <li>Comportement frauduleux</li>
                <li>Non-paiement des services</li>
                <li>Inactivité prolongée</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Modifications</h2>
              <p className="text-gray-600">
                Nous nous réservons le droit de modifier ces conditions à tout moment. Les utilisateurs seront 
                informés des changements significatifs.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Contact</h2>
              <p className="text-gray-600">
                Pour toute question concernant ces conditions, contactez-nous à :<br />
                Email : legal@darassa.academy
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ConditionsUtilisation; 