import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '../config';
import { useAppDispatch } from '../../store';
import {
  fetchCoursesStart,
  fetchCoursesSuccess,
  fetchCoursesFailure,
  setCurrentCourse,
} from '../../store/slices/courseSlice';

interface CourseFilters {
  category?: string;
  level?: string;
  priceRange?: [number, number];
  search?: string;
}

export const useCourses = () => {
  const dispatch = useAppDispatch();

  const getCourses = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      dispatch(fetchCoursesStart());
      try {
        const response = await api.get('/courses');
        dispatch(fetchCoursesSuccess(response.data));
        return response.data;
      } catch (error: any) {
        dispatch(fetchCoursesFailure(error.response?.data?.message || 'Une erreur est survenue'));
        throw error;
      }
    },
  });

  const getCourseById = useQuery({
    queryKey: ['course'],
    queryFn: async (id: string) => {
      const response = await api.get(`/courses/${id}`);
      dispatch(setCurrentCourse(response.data));
      return response.data;
    },
  });

  const createCourse = useMutation({
    mutationFn: async (courseData: FormData) => {
      const response = await api.post('/courses', courseData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
  });

  const updateCourse = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      const response = await api.post(`/courses/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
  });

  const deleteCourse = useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/courses/${id}`);
      return response.data;
    },
  });

  return {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
  };
}; 