import React from 'react';
import LoadingSpinner from './LoadingSpinner';

export default {
  title: 'Common/LoadingSpinner',
  component: LoadingSpinner,
};

export const Default = () => <LoadingSpinner />;

export const FullScreen = () => <LoadingSpinner fullScreen message="Chargement complet..." />; 