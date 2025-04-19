export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'entreprise';
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface UserProfile extends User {
  phone?: string;
  address?: string;
  company?: string;
  position?: string;
} 