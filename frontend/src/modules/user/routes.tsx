import React from 'react';
import { Route } from 'react-router-dom';
import { UserProfile, UserPreferences } from './components';

export const userRoutes = [
  <Route key="profile" path="/profile" element={<UserProfile />} />,
  <Route key="preferences" path="/preferences" element={<UserPreferences />} />
]; 