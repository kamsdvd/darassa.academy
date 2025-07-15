import { useQuery } from '@tanstack/react-query';
import { CourseService } from '../services/courseService';
import { Course } from '../types/course';

export function useCourseById(id?: string) {
  return useQuery<Course | null, Error>({
    queryKey: ['course', id],
    queryFn: () => (id ? CourseService.getById(id) : Promise.resolve(null)),
    enabled: !!id,
  });
}
