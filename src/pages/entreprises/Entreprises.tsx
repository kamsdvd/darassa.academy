import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  Briefcase, 
  Building2, 
  FileText, 
  Search, 
  Shield, 
  Award,
  Clock,
  Globe,
  BarChart,
  ArrowRight
} from 'lucide-react';
import PageTransition from '../../components/shared/PageTransition';
import EntreprisesHero from '../../components/entreprises/EntreprisesHero';

const Entreprises: React.FC = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <EntreprisesHero />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* LMS Enterprise */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold ml-4">LMS Enterprise</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Plateforme d'apprentissage en ligne personnalisée pour vos équipes. 
                Gérez les formations, suivez les progrès et mesurez les résultats.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-gray-600">
                  <Shield className="w-4 h-4 mr-2 text-primary-600" />
                  Accès sécurisé et personnalisé
                </li>
                <li className="flex items-center text-gray-600">
                  <BarChart className="w-4 h-4 mr-2 text-primary-600" />
                  Tableaux de bord analytiques
                </li>
                <li className="flex items-center text-gray-600">
                  <Globe className="w-4 h-4 mr-2 text-primary-600" />
                  Contenu multilingue
                </li>
              </ul>
              <Link
                to="/entreprises/lms"
                className="inline-flex items-center text-primary-600 hover:text-primary-700"
              >
                En savoir plus
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            {/* Formation Entreprise */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <Users className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold ml-4">Formation Entreprise</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Programmes de formation sur mesure pour développer les compétences 
                de vos collaborateurs et améliorer la performance de votre entreprise.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-gray-600">
                  <Award className="w-4 h-4 mr-2 text-primary-600" />
                  Formations certifiantes
                </li>
                <li className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2 text-primary-600" />
                  Horaires flexibles
                </li>
                <li className="flex items-center text-gray-600">
                  <Building2 className="w-4 h-4 mr-2 text-primary-600" />
                  Formation en entreprise
                </li>
              </ul>
              <Link
                to="/entreprises/formation"
                className="inline-flex items-center text-primary-600 hover:text-primary-700"
              >
                En savoir plus
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            {/* Recrutement */}
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <Briefcase className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold ml-4">Recrutement</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Accédez à notre base de talents qualifiés et publiez vos offres d'emploi. 
                Trouvez les meilleurs profils pour votre entreprise.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-gray-600">
                  <Search className="w-4 h-4 mr-2 text-primary-600" />
                  Recherche avancée de profils
                </li>
                <li className="flex items-center text-gray-600">
                  <FileText className="w-4 h-4 mr-2 text-primary-600" />
                  Gestion des candidatures
                </li>
                <li className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2 text-primary-600" />
                  Base de talents qualifiés
                </li>
              </ul>
              <Link
                to="/entreprises/recrutement"
                className="inline-flex items-center text-primary-600 hover:text-primary-700"
              >
                En savoir plus
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-primary-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              Prêt à transformer votre entreprise ?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Créez votre compte entreprise dès aujourd'hui et accédez à tous nos services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/entreprises/inscription"
                className="px-8 py-3 bg-white text-primary-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Créer un compte
              </Link>
              <Link
                to="/entreprises/demo"
                className="px-8 py-3 bg-primary-700 text-white rounded-full font-semibold hover:bg-primary-800 transition-colors"
              >
                Demander une démo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Entreprises; 