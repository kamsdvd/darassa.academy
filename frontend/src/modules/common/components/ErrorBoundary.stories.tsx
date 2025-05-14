import React from 'react';
import ErrorBoundary from './ErrorBoundary';

export default {
  title: 'Common/ErrorBoundary',
  component: ErrorBoundary,
};

const ProblematicComponent = () => {
  throw new Error('Erreur de test !');
};

export const Default = () => (
  <ErrorBoundary>
    <ProblematicComponent />
  </ErrorBoundary>
);

export const WithCustomFallback = () => (
  <ErrorBoundary fallback={<div>Une erreur custom est survenue.</div>}>
    <ProblematicComponent />
  </ErrorBoundary>
); 