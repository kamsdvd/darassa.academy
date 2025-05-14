import { Middleware } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

export const errorMiddleware: Middleware = (store) => (next) => (action) => {
  // Vérifier si l'action contient une erreur
  if (action.type.endsWith('/rejected')) {
    const error = action.payload?.message || 'Une erreur est survenue';
    toast.error(error);
  }

  // Vérifier si l'action est un succès
  if (action.type.endsWith('/fulfilled')) {
    const successMessage = action.meta?.arg?.successMessage;
    if (successMessage) {
      toast.success(successMessage);
    }
  }

  return next(action);
}; 