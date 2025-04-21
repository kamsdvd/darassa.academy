import React from 'react';
import { useStore } from '../../store/useStore';
import PageTransition from '../../components/shared/PageTransition';

const Dashboard: React.FC = () => {
  const { user } = useStore();

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Bienvenue, {user?.name}!
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Carte des formations */}
            <div className="bg-primary-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-primary-900 mb-4">
                Mes formations
              </h2>
              <p className="text-primary-700 mb-4">
                Accédez à vos formations en cours et suivez votre progression.
              </p>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors">
                Voir mes formations
              </button>
            </div>

            {/* Carte des certificats */}
            <div className="bg-green-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-green-900 mb-4">
                Mes certificats
              </h2>
              <p className="text-green-700 mb-4">
                Consultez et téléchargez vos certificats obtenus.
              </p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors">
                Voir mes certificats
              </button>
            </div>

            {/* Carte du profil */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-900 mb-4">
                Mon profil
              </h2>
              <p className="text-blue-700 mb-4">
                Mettez à jour vos informations personnelles et préférences.
              </p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Gérer mon profil
              </button>
            </div>
          </div>

          {/* Section des formations recommandées */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Formations recommandées
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Placeholder pour les formations recommandées */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                <h3 className="text-lg font-semibold mb-2">Formation 1</h3>
                <p className="text-gray-600 mb-4">Description de la formation...</p>
                <button className="text-primary-600 hover:text-primary-700">
                  En savoir plus →
                </button>
              </div>
              {/* Ajoutez d'autres formations recommandées ici */}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard; 