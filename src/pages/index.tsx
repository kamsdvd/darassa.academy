import { MainLayout } from '../components/layout/MainLayout';
import { useCourses } from '../api/hooks/useCourses';

export default function Home() {
  const { getCourses } = useCourses();
  const { data: courses, isLoading, error } = getCourses;

  return (
    <MainLayout>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Bienvenue sur Darassa Academy</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <p>Chargement des cours...</p>
          ) : error ? (
            <p className="text-red-500">Une erreur est survenue lors du chargement des cours.</p>
          ) : (
            courses?.map((course) => (
              <div key={course.id} className="border rounded-lg overflow-hidden">
                {course.thumbnail && (
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{course.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-indigo-600">
                      {course.price} €
                    </span>
                    <span className="text-sm text-gray-500">
                      {course.duration} heures
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
} 