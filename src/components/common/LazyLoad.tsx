import React, { Suspense } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface LazyLoadProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const LazyLoad: React.FC<LazyLoadProps> = ({ 
  children, 
  fallback = <LoadingSpinner size="large" className="min-h-[200px]" /> 
}) => {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
}; 