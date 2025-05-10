import axios from 'axios';
import { UserProfile, UpdateUserProfile, UserPreferences } from '../types/user.types';
import { authService } from '../../auth/services/auth.service';

const API_URL = import.meta.env.VITE_API_URL;

class UserService {
  private getAuthHeader() {
    const token = authService.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  async getUserProfile(): Promise<UserProfile> {
    const response = await axios.get(`${API_URL}/users/profile`, {
      headers: this.getAuthHeader()
    });
    return response.data;
  }

  async updateUserProfile(profile: UpdateUserProfile): Promise<UserProfile> {
    const response = await axios.patch(`${API_URL}/users/profile`, profile, {
      headers: this.getAuthHeader()
    });
    return response.data;
  }

  async getUserPreferences(): Promise<UserPreferences> {
    const response = await axios.get(`${API_URL}/users/preferences`, {
      headers: this.getAuthHeader()
    });
    return response.data;
  }

  async updateUserPreferences(preferences: Partial<UserPreferences>): Promise<UserPreferences> {
    const response = await axios.patch(`${API_URL}/users/preferences`, preferences, {
      headers: this.getAuthHeader()
    });
    return response.data;
  }

  async uploadAvatar(file: File): Promise<{ avatarUrl: string }> {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await axios.post(`${API_URL}/users/avatar`, formData, {
      headers: {
        ...this.getAuthHeader(),
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }

  async deleteAccount(): Promise<void> {
    await axios.delete(`${API_URL}/users/account`, {
      headers: this.getAuthHeader()
    });
  }
}

export const userService = new UserService(); 