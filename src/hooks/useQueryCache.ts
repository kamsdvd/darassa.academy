import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import axios, { AxiosRequestConfig } from 'axios';
import { mockCourse } from '../mocks/courseData';

interface QueryCacheOptions<T> extends Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'> {
  staleTime?: number;
  cacheTime?: number;
}

export function useQueryCache<T>(
  key: string | string[],
  url: string,
  config?: AxiosRequestConfig,
  options?: QueryCacheOptions<T>
) {
  const queryClient = useQueryClient();

  return useQuery<T>({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: async () => {
      // En développement, retourner les données mock
      if (process.env.NODE_ENV === 'development') {
        // Simuler un délai réseau
        await new Promise(resolve => setTimeout(resolve, 1000));
        return mockCourse as T;
      }

      // En production, faire la vraie requête API
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }
      return response.json();
    },
    staleTime: options?.staleTime || 5 * 60 * 1000, // 5 minutes par défaut
    cacheTime: options?.cacheTime || 30 * 60 * 1000, // 30 minutes par défaut
    ...options,
  });
}

export function useInfiniteQueryCache<T>(
  key: string | string[],
  url: string,
  config?: AxiosRequestConfig,
  options?: QueryCacheOptions<T>
) {
  const queryClient = useQueryClient();

  return useInfiniteQuery<T>({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axios.get(url, {
        ...config,
        params: {
          ...config?.params,
          page: pageParam,
        },
      });
      return data;
    },
    getNextPageParam: (lastPage: any) => lastPage.nextPage,
    staleTime: options?.staleTime || 5 * 60 * 1000,
    cacheTime: options?.cacheTime || 30 * 60 * 1000,
    ...options,
  });
} 