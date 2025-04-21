import React from 'react';
import { motion } from 'framer-motion';

const MentionsLegales: React.FC = () => {
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
            Mentions Légales
          </h1>

          <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Informations légales</h2>
              <p className="text-gray-600">
                Le site Darassa Academy est édité par :<br />
                Darassa Academy SARL<br />
                Siège social : [Adresse]<br />
                Capital social : [Montant]<br />
                RCS : [Numéro]<br />
                TVA Intracommunautaire : [Numéro]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Hébergement</h2>
              <p className="text-gray-600">
                Le site est hébergé par :<br />
                [Nom de l'hébergeur]<br />
                [Adresse de l'hébergeur]<br />
                [Contact de l'hébergeur]
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Propriété intellectuelle</h2>
              <p className="text-gray-600">
                L'ensemble du contenu du site Darassa Academy (textes, images, vidéos, etc.) est protégé par le droit d'auteur. 
                Toute reproduction ou représentation totale ou partielle de ce site par quelque procédé que ce soit, 
                sans autorisation expresse, est interdite et constituerait une contrefaçon sanctionnée par les articles 
                L.335-2 et suivants du Code de la propriété intellectuelle.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Protection des données personnelles</h2>
              <p className="text-gray-600">
                Conformément à la loi "Informatique et Libertés" du 6 janvier 1978 modifiée et au Règlement Général sur la 
                Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et 
                d'opposition aux données personnelles vous concernant. Pour exercer ces droits, contactez-nous à l'adresse : 
                privacy@darassa.academy
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Cookies</h2>
              <p className="text-gray-600">
                Le site utilise des cookies pour améliorer l'expérience utilisateur. En naviguant sur le site, 
                vous acceptez l'utilisation de cookies conformément à notre politique de confidentialité.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Responsabilité</h2>
              <p className="text-gray-600">
                Darassa Academy s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. 
                Toutefois, Darassa Academy ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations 
                mises à disposition sur ce site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Contact</h2>
              <p className="text-gray-600">
                Pour toute question concernant ces mentions légales, vous pouvez nous contacter à :<br />
                Email : legal@darassa.academy<br />
                Téléphone : [Numéro]
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MentionsLegales; 