import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '../config';
import { useAppDispatch } from '../../store';
import { loginSuccess, loginFailure, logout } from '../../store/slices/authSlice';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const login = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      dispatch(loginSuccess(data));
    },
    onError: (error: any) => {
      dispatch(loginFailure(error.response?.data?.message || 'Une erreur est survenue'));
    },
  });

  const register = useMutation({
    mutationFn: async (data: RegisterData) => {
      const response = await api.post('/auth/register', data);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      dispatch(loginSuccess(data));
    },
    onError: (error: any) => {
      dispatch(loginFailure(error.response?.data?.message || 'Une erreur est survenue'));
    },
  });

  const logoutUser = () => {
    localStorage.removeItem('token');
    dispatch(logout());
  };

  return {
    login,
    register,
    logoutUser,
  };
}; 