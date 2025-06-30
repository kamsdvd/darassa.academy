import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useFormationById } from '../../../hooks/useFormations.ts'; // Corrected hook import
import Layout from '../../components/layout/Layout.tsx'; // Added .tsx
import LoadingFallback from '../../components/common/LoadingFallback.tsx'; // Added .tsx
import { Clock, Calendar, MapPin, Users, BookOpen, CheckCircle, ChevronRight, AlertCircle } from 'lucide-react'; // Added AlertCircle
import { useStore } from '../../store/useStore.ts'; // Added .ts

const FormationDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useStore(); // For enrollment button state
  const [activeTab, setActiveTab] = useState('overview');

  // Use the correct hook for fetching a single formation by ID
  const { data: formation, isLoading, isError, error } = useFormationById(id as string | undefined);

  if (isLoading) return <LoadingFallback message="Chargement de la formation..." />;
  if (isError) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-red-600 mb-2">Erreur de chargement</h2>
          <p className="text-gray-600">{error?.message || "Une erreur est survenue lors de la récupération des détails de la formation."}</p>
          <button
            onClick={() => router.back()}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retour
          </button>
        </div>
      </Layout>
    );
  }
  if (!formation && !isLoading) { // Handle case where formation is not found after loading
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-yellow-600 mb-2">Formation non trouvée</h2>
          <p className="text-gray-600">Désolé, la formation que vous cherchez n'existe pas ou plus.</p>
          <button
            onClick={() => router.push('/formations')} // Navigate to list page
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Voir toutes les formations
          </button>
        </div>
      </Layout>
    );
  }

  // Ensure formation is not null before proceeding (already handled by above checks but good for TS)
  if (!formation) return null;

  const handleEnroll = async () => {
    if (!user) {
      router.push(`/auth/Connexion?redirect=${encodeURIComponent(router.asPath)}`); // Corrected path
      return;
    }
    // TODO: Implement enrollment logic using formation.id
    console.log(`Attempting to enroll in formation: ${formation.id}`);
    alert(`Logique d'inscription pour "${formation.title}" à implémenter.`);
  };

  // Fallback image if imageUrl is not available
  const fallbackImage = "https://via.placeholder.com/1200x600/2563eb/ffffff?text=Darassa+Academy";

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* En-tête de la formation */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative h-[300px] md:h-[400px] lg:h-[500px]"> {/* Responsive height */}
            <img
              src={formation.imageUrl || fallbackImage}
              alt={formation.title}
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = fallbackImage; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mb-4">{formation.title}</h1>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm md:text-base">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>{formation.duration}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 flex-shrink-0" />
                  {/* Using lastUpdated as a proxy for date, as startDate is not mapped yet */}
                  <span>Dernière MàJ: {formation.lastUpdated}</span>
                </div>
                {/* formation.location is not in current mapped type */}
                {/* <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{formation.location || 'En ligne'}</span>
                </div> */}
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>{formation.enrolledStudents} participants</span>
                  {/* This uses enrolledStudents from mapping, which is based on inscriptions.length */}
                  {/* For placesDisponibles, it would be formation.placesDisponibles from backend if directly mapped */}
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