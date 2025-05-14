import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

interface EnrollCourseResponse {
  success: boolean;
  message: string;
}

export function useEnrollCourse() {
  const queryClient = useQueryClient();

  const { mutate: enrollCourse, isLoading } = useMutation(
    async (courseId: string) => {
      const response = await fetch(`/api/courses/${courseId}/enroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'inscription au cours');
      }

      return response.json() as Promise<EnrollCourseResponse>;
    },
    {
      onSuccess: (data) => {
        toast.success(data.message);
        queryClient.invalidateQueries(['course']);
        queryClient.invalidateQueries(['enrolledCourses']);
      },
      onError: (error: Error) => {
        toast.error(error.message);
      },
    }
  );

  return {
    enrollCourse,
    isEnrolling: isLoading,
  };
} 