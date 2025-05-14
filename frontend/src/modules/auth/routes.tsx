import React from 'react';
import { Route } from 'react-router-dom';
import { LoginForm, RegisterForm } from './components';

export const authRoutes = [
  <Route key="login" path="/login" element={<LoginForm />} />,
  <Route key="register" path="/register" element={<RegisterForm />} />,
  <Route key="connexion" path="/connexion" element={<Connexion />} />
]; 