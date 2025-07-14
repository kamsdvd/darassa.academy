import { courses as staticCourses } from '../data/courses';
import { Course } from '../types/course';

// Données locales modifiables en mémoire pour simuler les mutations
let memoryCourses: Course[] = [...staticCourses];

function paginate(array: Course[], page = 1, limit = 6, category?: string) {
  let filtered = array;
  if (category) {
    filtered = filtered.filter(c => c.category === category);
  }
  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    data: filtered.slice(start, end),
    meta: {
      total,
      totalPages,
      currentPage: page,
      limit,
    },
  };
}

export const CourseService = {
  getAll: async (params?: { page?: number; limit?: number; category?: string }) => {
    const { page = 1, limit = 6, category } = params || {};
    return Promise.resolve(paginate(memoryCourses, page, limit, category));
  },

  getById: async (id: string) => {
    const course = memoryCourses.find(c => String(c.id) === String(id));
    return Promise.resolve(course || null);
  },

  create: async (courseData: Partial<Course>) => {
    const newCourse: Course = {
      ...courseData,
      id: String(Date.now()),
      imageUrl: courseData.imageUrl || '',
    } as Course;
    memoryCourses.unshift(newCourse);
    console.log('[MOCK] Création de cours', newCourse);
    return Promise.resolve(newCourse);
  },

  update: async (id: string, courseData: Partial<Course>) => {
    const idx = memoryCourses.findIndex(c => String(c.id) === String(id));
    if (idx !== -1) {
      memoryCourses[idx] = { ...memoryCourses[idx], ...courseData };
      console.log('[MOCK] Mise à jour du cours', memoryCourses[idx]);
      return Promise.resolve(memoryCourses[idx]);
    }
    return Promise.reject(new Error('Cours non trouvé'));
  },

  delete: async (id: string) => {
    memoryCourses = memoryCourses.filter(c => String(c.id) !== String(id));
    console.log('[MOCK] Suppression du cours', id);
    return Promise.resolve();
  },
};
