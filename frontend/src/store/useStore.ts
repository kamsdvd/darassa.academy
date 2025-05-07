import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => {
        if (!user) {
          set({ user: null, isAuthenticated: false });
          return;
        }

        // S'assurer que user.roles est un tableau
        const roles = Array.isArray(user.roles) ? user.roles : [user.role];

        // Ajouter les rôles automatiques
        if (roles.includes('etudiant') && !roles.includes('demandeur')) {
          roles.push('demandeur');
        }
        if (roles.includes('demandeur') && !roles.includes('etudiant')) {
          roles.push('etudiant');
        }

        // Créer un nouvel objet utilisateur avec les rôles mis à jour
        const updatedUser = {
          ...user,
          roles: roles
        };

        set({ user: updatedUser, isAuthenticated: true });
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
); 