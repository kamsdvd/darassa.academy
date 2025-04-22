import { create } from 'zustand';

interface User {
  _id: string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'entreprise';
  phone?: string;
  company?: string;
  position?: string;
}

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => {
    console.log('Setting user in store:', user); // Debug log
    if (user) {
      // S'assurer que l'ID est correctement défini
      if (!user._id && (user as any).id) {
        user = { ...user, _id: (user as any).id };
      }
    }
    set({ user, isAuthenticated: !!user });
    console.log('Store updated, isAuthenticated:', !!user); // Debug log
  },
  logout: () => {
    console.log('Logging out user'); // Debug log
    set({ user: null, isAuthenticated: false });
  },
})); 