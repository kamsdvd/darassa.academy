import { useState, useEffect } from 'react';
import { userService } from '../services/user.service';
import { UserProfile, UpdateUserProfile, UserPreferences, UserState } from '../types/user.types';

export const useUser = () => {
  const [state, setState] = useState<UserState>({
    profile: null,
    preferences: null,
    isLoading: true,
    error: null
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const [profile, preferences] = await Promise.all([
        userService.getUserProfile(),
        userService.getUserPreferences()
      ]);
      setState(prev => ({
        ...prev,
        profile,
        preferences,
        isLoading: false
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Une erreur est survenue'
      }));
    }
  };

  const updateProfile = async (profile: UpdateUserProfile) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const updatedProfile = await userService.updateUserProfile(profile);
      setState(prev => ({
        ...prev,
        profile: updatedProfile,
        isLoading: false
      }));
      return updatedProfile;
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Une erreur est survenue'
      }));
      throw err;
    }
  };

  const updatePreferences = async (preferences: Partial<UserPreferences>) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const updatedPreferences = await userService.updateUserPreferences(preferences);
      setState(prev => ({
        ...prev,
        preferences: updatedPreferences,
        isLoading: false
      }));
      return updatedPreferences;
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Une erreur est survenue'
      }));
      throw err;
    }
  };

  const uploadAvatar = async (file: File) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const { avatarUrl } = await userService.uploadAvatar(file);
      setState(prev => ({
        ...prev,
        profile: prev.profile ? { ...prev.profile, avatar: avatarUrl } : null,
        isLoading: false
      }));
      return avatarUrl;
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Une erreur est survenue'
      }));
      throw err;
    }
  };

  const deleteAccount = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      await userService.deleteAccount();
      setState({
        profile: null,
        preferences: null,
        isLoading: false,
        error: null
      });
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Une erreur est survenue'
      }));
      throw err;
    }
  };

  return {
    ...state,
    updateProfile,
    updatePreferences,
    uploadAvatar,
    deleteAccount,
    refreshUserData: loadUserData
  };
}; 