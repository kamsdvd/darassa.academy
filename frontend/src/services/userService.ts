import axios from 'axios';
import { User } from '../types/user';

export class UserService {
  private static instance: UserService;
  private baseUrl = '/api/users';

  private constructor() {}

  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async getUsers(params?: { role?: string; search?: string }): Promise<User[]> {
    const { data } = await axios.get(this.baseUrl, { params });
    return data;
  }

  async getUserById(id: string): Promise<User> {
    const { data } = await axios.get(`${this.baseUrl}/${id}`);
    return data;
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const { data } = await axios.post(this.baseUrl, userData);
    return data;
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    const { data } = await axios.put(`${this.baseUrl}/${id}`, userData);
    return data;
  }

  async deleteUser(id: string): Promise<void> {
    await axios.delete(`${this.baseUrl}/${id}`);
  }
} 