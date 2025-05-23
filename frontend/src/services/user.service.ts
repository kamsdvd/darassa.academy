import axios from 'axios';
import { User } from '../types/user';

const API_URL = 'http://localhost:5000/api';

// Intercepteur global pour ajouter le token à chaque requête
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  userType: 'admin' | 'centre_manager' | 'formateur' | 'etudiant' | 'demandeur' | 'entreprise';
  isActive: boolean;
  isEmailVerified: boolean;
  phone?: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userType: User['userType'];
  phone?: string;
}

export interface UpdateUserData {
  email?: string;
  firstName?: string;
  lastName?: string;
  userType?: User['userType'];
  phone?: string;
  profilePicture?: string;
}

class UserService {
  private readonly baseUrl = `${API_URL}/users`;

  async getAllUsers(params?: { page?: number; limit?: number; userType?: string; isActive?: boolean }) {
    try {
      const response = await axios.get(this.baseUrl, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async getUserById(id: string) {
    const response = await axios.get(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async createUser(userData: CreateUserData) {
    const response = await axios.post(this.baseUrl, userData);
    return response.data;
  }

  async updateUser(id: string, userData: UpdateUserData) {
    const response = await axios.put(`${this.baseUrl}/${id}`, userData);
    return response.data;
  }

  async deleteUser(id: string) {
    const response = await axios.delete(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async toggleUserStatus(id: string) {
    const response = await axios.patch(`${this.baseUrl}/${id}/disable`);
    return response.data;
  }

  async changeUserRole(id: string, userType: User['userType']) {
    const response = await axios.patch(`${this.baseUrl}/${id}/role`, { userType });
    return response.data;
  }
}

export const userService = new UserService(); 