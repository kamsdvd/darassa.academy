export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  bio?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  TRAINER = 'TRAINER',
  STUDENT = 'STUDENT',
  ENTERPRISE = 'ENTERPRISE'
}

export interface UpdateUserProfile {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  bio?: string;
  avatar?: string;
}

export interface UserPreferences {
  id: string;
  userId: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  language: string;
  theme: 'light' | 'dark' | 'system';
}

export interface UserState {
  profile: UserProfile | null;
  preferences: UserPreferences | null;
  isLoading: boolean;
  error: string | null;
} 