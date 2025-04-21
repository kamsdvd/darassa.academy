import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'entreprise';
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
    set({ user, isAuthenticated: !!user });
    console.log('Store updated, isAuthenticated:', !!user); // Debug log
  },
  logout: () => {
    console.log('Logging out user'); // Debug log
    set({ user: null, isAuthenticated: false });
  },
})); 