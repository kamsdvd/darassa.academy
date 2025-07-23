import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '../components/RegisterForm';
import { useAuth } from '../hooks/useAuth';

export const RegisterContainer: React.FC = () => {
  const navigate = useNavigate();
  const { register, isLoading, error } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      // Gérer l'erreur localement si besoin
      return;
    }
    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        userType: 'apprenant'
      });
      navigate('/dashboard');
    } catch (err) {
      // L'erreur est déjà gérée dans le hook useAuth
    }
  };

  return (
    <RegisterForm
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error?.message}
    />
  );
}; 