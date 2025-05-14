import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useFormations } from '../../hooks/useFormations';
import Layout from '../../components/layout/Layout';
import LoadingFallback from '../../components/common/LoadingFallback';
import { Clock, Calendar, MapPin, Users, BookOpen, CheckCircle, ChevronRight } from 'lucide-react';
import { useStore } from '../../store/useStore';

const FormationDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useStore();
  const [activeTab, setActiveTab] = useState('overview');

  const { getFormationById } = useFormations();
  const { data: formation, isLoading, error } = getFormationById(id as string);

  if (isLoading) return <LoadingFallback />;
  if (error) return <div>Une erreur est survenue</div>;
  if (!formation) return <div>Formation non trouvée</div>;

  const handleEnroll = async () => {
    if (!user) {
      router.push('/connexion?redirect=' + encodeURIComponent(router.asPath));
      return;
    }
    // TODO: Implement enrollment logic
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* En-tête de la formation */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative h-96">
            <img
              src={formation.thumbnail}
              alt={formation.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h1 className="text-4xl font-bold mb-4">{formation.title}</h1>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{formation.duration}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{formation.startDate}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{formation.location}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{formation.maxStudents} places</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2">
            {/* Onglets */}
            <div className="bg-white rounded-lg shadow-md mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  {['overview', 'curriculum', 'instructor', 'reviews'].map((tab) => (
                    <button
                      key={tab}
                      className={`py-4 px-6 text-sm font-medium ${
                        activeTab === tab
                          ? 'border-b-2 border-primary-500 text-primary-600'
                          : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">À propos de cette formation</h2>
                    <p className="text-gray-600 mb-6">{formation.description}</p>
                    
                    <h3 className="text-xl font-semibold mb-4">Ce que vous allez apprendre</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {formation.objectives?.map((objective, index) => (
                        <div key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-1" />
                          <span>{objective}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'curriculum' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Programme de la formation</h2>
                    <div className="space-y-4">
                      {formation.curriculum?.map((module, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <h3 className="text-lg font-semibold mb-2">{module.title}</h3>
                          <ul className="space-y-2">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <li key={lessonIndex} className="flex items-center text-gray-600">
                                <ChevronRight className="h-4 w-4 mr-2" />
                                <span>{lesson.title}</span>
                                <span className="ml-auto text-sm text-gray-500">{lesson.duration}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'instructor' && formation.instructor && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Votre instructeur</h2>
                    <div className="flex items-start space-x-4">
                      <img
                        src={formation.instructor.avatar}
                        alt={formation.instructor.name}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-semibold">{formation.instructor.name}</h3>
                        <p className="text-gray-600 mb-2">{formation.instructor.title}</p>
                        <p className="text-gray-600">{formation.instructor.bio}</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Avis des participants</h2>
                    {formation.reviews?.length > 0 ? (
                      <div className="space-y-6">
                        {formation.reviews.map((review, index) => (
                          <div key={index} className="border-b pb-6 last:border-b-0">
                            <div className="flex items-center mb-2">
                              <img
                                src={review.user.avatar}
                                alt={review.user.name}
                                className="w-10 h-10 rounded-full mr-3"
                              />
                              <div>
                                <h4 className="font-semibold">{review.user.name}</h4>
                                <div className="flex items-center text-yellow-400">
                                  {[...Array(5)].map((_, i) => (
                                    <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                                      ★
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-600">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">Aucun avis pour le moment</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <div className="text-3xl font-bold text-primary-600 mb-4">
                {formation.price} €
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>Durée: {formation.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>Début: {formation.startDate}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>Lieu: {formation.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{formation.maxStudents} places disponibles</span>
                </div>
              </div>

              <button
                onClick={handleEnroll}
                className="w-full py-3 px-4 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {user ? "S'inscrire maintenant" : "Se connecter pour s'inscrire"}
              </button>

              <div className="mt-6">
                <h3 className="font-semibold mb-2">Cette formation comprend :</h3>
                <ul className="space-y-2">
                  {formation.features?.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FormationDetail; 