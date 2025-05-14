import { useParams, useNavigate } from 'react-router-dom';
import { useQueryCache } from '../../hooks/useQueryCache';
import { useEnrollCourse } from '../../hooks/useEnrollCourse';
import { useAppSelector } from '../../store';
import { MainLayout } from '../../components/layout/MainLayout';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { OptimizedImage } from '../../components/common/OptimizedImage';
import { CourseReviewForm } from '../../components/courses/CourseReviewForm';
import { motion } from 'framer-motion';

interface CourseSection {
  id: string;
  title: string;
  lessons: {
    id: string;
    title: string;
    duration: number;
    preview: boolean;
  }[];
}

interface CourseReview {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  comment: string;
  date: string;
}

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { enrollCourse, isEnrolling } = useEnrollCourse();

  const { data: course, isLoading, error } = useQueryCache(
    ['course', id],
    `/api/courses/${id}`
  );

  const handleEnroll = () => {
    if (!isAuthenticated) {
      navigate('/connexion', { state: { from: `/courses/${id}` } });
      return;
    }
    enrollCourse(id!);
  };

  const handlePreviewLesson = (lessonId: string) => {
    if (!isAuthenticated) {
      navigate('/connexion', { state: { from: `/courses/${id}` } });
      return;
    }
    navigate(`/courses/${id}/lessons/${lessonId}`);
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner size="large" />
        </div>
      </MainLayout>
    );
  }

  if (error || !course) {
    return (
      <MainLayout>
        <div className="text-center text-red-600">
          Une erreur est survenue lors du chargement du cours.
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <OptimizedImage
                src={course.thumbnail}
                alt={course.title}
                width={800}
                height={450}
                className="w-full h-[450px] object-cover rounded-lg"
              />
            </motion.div>
            
            <h1 className="text-3xl font-bold text-gray-900 mt-6 mb-4">
              {course.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                {course.level}
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                {course.category}
              </span>
              <span className="text-gray-500">
                {course.duration} heures
              </span>
              <div className="flex items-center">
                <span className="text-yellow-400">★</span>
                <span className="ml-1 text-gray-600">
                  {course.rating} ({course.reviewCount} avis)
                </span>
              </div>
            </div>

            {/* Informations instructeur */}
            <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
              <OptimizedImage
                src={course.instructor.avatar}
                alt={course.instructor.name}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="font-semibold text-gray-900">
                  {course.instructor.name}
                </h3>
                <p className="text-gray-600">{course.instructor.title}</p>
              </div>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">
                {course.description}
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Ce que vous allez apprendre
              </h2>
              <ul className="list-disc list-inside space-y-2 mb-6">
                {course.learningObjectives?.map((objective, index) => (
                  <li key={index} className="text-gray-600">
                    {objective}
                  </li>
                ))}
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Prérequis
              </h2>
              <ul className="list-disc list-inside space-y-2 mb-6">
                {course.prerequisites?.map((prerequisite, index) => (
                  <li key={index} className="text-gray-600">
                    {prerequisite}
                  </li>
                ))}
              </ul>

              {/* Contenu du cours */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                  Contenu du cours
                </h2>
                <div className="space-y-4">
                  {course.sections?.map((section: CourseSection) => (
                    <div key={section.id} className="border rounded-lg">
                      <div className="p-4 bg-gray-50 border-b">
                        <h3 className="font-semibold">{section.title}</h3>
                      </div>
                      <div className="divide-y">
                        {section.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
                            onClick={() => lesson.preview && handlePreviewLesson(lesson.id)}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-gray-500">
                                {lesson.preview ? '🔓' : '🔒'}
                              </span>
                              <span>{lesson.title}</span>
                            </div>
                            <span className="text-gray-500">{lesson.duration} min</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Avis */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
                  Avis des étudiants
                </h2>
                
                {isAuthenticated && (
                  <div className="mb-8">
                    <CourseReviewForm courseId={id!} />
                  </div>
                )}

                <div className="space-y-6">
                  {course.reviews?.map((review: CourseReview) => (
                    <div key={review.id} className="border-b pb-6">
                      <div className="flex items-center gap-4 mb-2">
                        <OptimizedImage
                          src={review.user.avatar}
                          alt={review.user.name}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <h4 className="font-medium">{review.user.name}</h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-sm ${
                                  i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                        <span className="text-gray-500 text-sm ml-auto">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-8">
              <div className="p-6">
                <div className="text-3xl font-bold text-gray-900 mb-4">
                  {course.price}€
                </div>

                <Button
                  fullWidth
                  size="lg"
                  className="mb-4"
                  onClick={handleEnroll}
                  disabled={isEnrolling}
                >
                  {isEnrolling
                    ? 'Inscription en cours...'
                    : isAuthenticated
                    ? "S'inscrire au cours"
                    : 'Connectez-vous pour vous inscrire'}
                </Button>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-600">
                      {course.duration} heures de contenu
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-600">
                      Accès à vie
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <span className="text-gray-600">
                      Ressources téléchargeables
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-600">
                      {course.lessonCount} leçons
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-gray-600">
                      {course.enrolledStudents} étudiants inscrits
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
} 