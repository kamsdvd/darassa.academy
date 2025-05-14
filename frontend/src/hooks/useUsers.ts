import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserService } from '../services/userService';

export const useUsers = () => {
  const queryClient = useQueryClient();
  const userService = UserService.getInstance();

  const getUsers = (params?: { role?: string; search?: string }) => {
    return useQuery({
      queryKey: ['users', params],
      queryFn: () => userService.getUsers(params),
    });
  };

  const getUserById = (id: string) => {
    return useQuery({
      queryKey: ['user', id],
      queryFn: () => userService.getUserById(id),
      enabled: !!id,
    });
  };

  const createUser = () => {
    return useMutation({
      mutationFn: (data: any) => userService.createUser(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
      },
    });
  };

  const updateUser = () => {
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: any }) => 
        userService.updateUser(id, data),
      onSuccess: (_, { id }) => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
        queryClient.invalidateQueries({ queryKey: ['user', id] });
      },
    });
  };

  const deleteUser = () => {
    return useMutation({
      mutationFn: (id: string) => userService.deleteUser(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
      },
    });
  };

  return {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
  };
}; 