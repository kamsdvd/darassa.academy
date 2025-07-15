import React, { useState, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourseById } from '@/hooks/useCourse';
import Layout from '@/components/layout/Layout';
import LoadingFallback from '@/components/common/LoadingFallback';
import { Clock, Calendar, MapPin, Users, BookOpen, CheckCircle, ChevronRight, AlertCircle, Video, UsersRound, MapPinned } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { SessionFrontend } from '@/types/course';


const CourseDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useStore(); // For enrollment button state
  const [activeTab, setActiveTab] = useState('overview');

  // Use the correct hook for fetching a single course by ID
  const { data: course, isLoading, isError, error } = useCourseById(id);

  if (isLoading) return <LoadingFallback message="Chargement de la formation..." />;
  if (isError) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-red-600 mb-2">Erreur de chargement</h2>
          <p className="text-gray-600">{error?.message || "Une erreur est survenue lors de la récupération des détails de la formation."}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retour
          </button>
        </div>
      </Layout>
    );
  }
  if (!course && !isLoading) { // Handle case where course is not found after loading
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-yellow-600 mb-2">Formation non trouvée</h2>
          <p className="text-gray-600">Désolé, la formation que vous cherchez n'existe pas ou plus.</p>
          <button
            onClick={() => navigate('/courses')} // Navigate to list page
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Voir toutes les formations
          </button>
        </div>
      </Layout>
    );
  }

  // Ensure course is not null before proceeding (already handled by above checks but good for TS)
  if (!course) return null;

  const handleEnroll = async () => {
    if (!user) {
      navigate(`/auth/Connexion?redirect=${encodeURIComponent(window.location.pathname)}`); // Corrected path
      return;
    }
    // TODO: Implement enrollment logic using course.id
    console.log(`Attempting to enroll in course: ${course.id}`);
    alert(`Logique d'inscription pour "${course.title}" à implémenter.`);
  };

  // Fallback image if imageUrl is not available
  const COLOR_PALETTE = [
    "#0ea5e9", // primary-500
    "#c026d3", // secondary-600
    "#0284c7", // primary-600
    "#a21caf", // secondary-700
    "#0369a1", // primary-700
    "#86198f", // secondary-800
  ];

  const generateColorSvg = (id: string | number) => {
    const stringId = String(id);
    const hash = stringId.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
    const colorIndex = Math.abs(hash) % COLOR_PALETTE.length;
    const color = COLOR_PALETTE[colorIndex];
    const svg = `<svg width="1200" height="600" viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="600" fill="${color}"/></svg>`;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };

  const fallbackImage = generateColorSvg(course.id);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* En-tête de la formation */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative h-[300px] md:h-[400px] lg:h-[500px]"> {/* Responsive height */}
            <img
              src={course.imageUrl || generateColorSvg(course.id)}
              alt={course.title}
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = generateColorSvg(course.id); }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mb-4">{course.title}</h1>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm md:text-base">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 flex-shrink-0" />
                  {/* Using lastUpdated as a proxy for date, as startDate is not mapped yet */}
                  <span>Dernière MàJ: {course.lastUpdated}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>{course.enrolledStudents} participants</span>
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
                <nav className="flex -mb-px overflow-x-auto"> {/* Added overflow-x-auto for smaller screens */}
                  {['overview', 'curriculum', 'sessions', 'instructor', 'reviews'].map((tab) => ( // Added 'sessions' tab
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
                    <p className="text-gray-600 mb-6">{course.description}</p>
                    
                    <h3 className="text-xl font-semibold mb-4">Ce que vous allez apprendre</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {course.objectives?.map((objective, index) => (
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
                      {Array.isArray(course.syllabus) && course.syllabus.length > 0 ? (
                        course.syllabus.map((module, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <h3 className="text-lg font-semibold mb-2">{module.title}</h3>
                            {Array.isArray(module.content) && module.content.length > 0 ? (
                              <ul className="space-y-2">
                                {module.content.map((lessonTitle, lessonIndex) => (
                                  <li key={lessonIndex} className="flex items-center text-gray-600">
                                    <ChevronRight className="h-4 w-4 mr-2 flex-shrink-0" />
                                    <span>{lessonTitle}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : <p className="text-gray-500 text-sm">Contenu du module bientôt disponible.</p>}
                          </div>
                        ))
                      ) : <p className="text-gray-500">Le programme détaillé sera bientôt disponible.</p>}
                    </div>
                  </div>
                )}

                {activeTab === 'sessions' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Sessions Planifiées</h2>
                    {Array.isArray(course.sessions) && course.sessions.length > 0 ? (
                      <div className="space-y-6">
                        {course.sessions.map((session: SessionFrontend) => (
                          <div key={session.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow bg-gray-50">
                            <h3 className="text-xl font-semibold text-primary-700 mb-2">{session.titre}</h3>
                            {session.description && <p className="text-gray-600 mb-3 text-sm whitespace-pre-wrap">{session.description}</p>}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-800">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2 text-primary-500 flex-shrink-0" />
                                <span>{session.dateDebutFormatted}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2 text-primary-500 flex-shrink-0" />
                                <span>Durée : {session.dureeFormatted}</span>
                              </div>
                              <div className="flex items-center capitalize">
                                {session.type === 'en_ligne' && <Video className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />}
                                {session.type === 'presentiel' && <MapPinned className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0" />}
                                {session.type === 'hybride' && <UsersRound className="h-4 w-4 mr-2 text-purple-500 flex-shrink-0" />}
                                <span>Type : <span className="font-medium">{session.type}</span></span>
                              </div>
                              {session.formateurName && (
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 mr-2 text-primary-500 flex-shrink-0" />
                                  <span>Formateur : {session.formateurName}</span>
                                </div>
                              )}
                              {session.salle?.nom && (
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-2 text-primary-500 flex-shrink-0" />
                                  <span>Salle : {session.salle.nom} {session.salle.capacite ? `(${session.salle.capacite} places)` : ''}</span>
                                </div>
                              )}
                            </div>
                            {(session.type === 'en_ligne' || session.type === 'hybride') && session.lienMeet && (
                              <div className="mt-4">
                                <a
                                  href={session.lienMeet}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                  <Video className="h-5 w-5 mr-2" />
                                  Rejoindre la session en ligne
                                </a>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">Aucune session planifiée pour le moment.</p>
                    )}
                  </div>
                )}

                {activeTab === 'instructor' && course.instructor && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Votre instructeur</h2>
                    <div className="flex items-start space-x-4">
                      <img
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-semibold">{course.instructor.name}</h3>
                        <p className="text-gray-600 mb-2">{course.instructor.title}</p>
                        <p className="text-gray-600">{course.instructor.bio}</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Avis des participants</h2>
                    {course.reviews?.length > 0 ? (
                      <div className="space-y-6">
                        {course.reviews.map((review, index) => (
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
            <div className="bg-white rounded-lg shadow-md p-6 lg:sticky lg:top-8">
              <div className="text-3xl font-bold text-primary-600 mb-4">
                {course.price} €
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>Durée: {course.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>Début: {course.startDate}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>Lieu: {course.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{course.maxStudents} places disponibles</span>
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
                  {course.features?.map((feature, index) => (
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

export default CourseDetail; 