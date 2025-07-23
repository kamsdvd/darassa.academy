import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../../store/useStore';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useStore();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-primary-600">Darassa</span>
          </Link>

          {/* Navigation principale */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-medium ${
                isActive('/') ? 'text-primary-600' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Accueil
            </Link>
            <Link
              to="/courses"
              className={`text-sm font-medium ${
                isActive('/courses') ? 'text-primary-600' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Formations
            </Link>
            <Link
              to="/opportunites"
              className={`