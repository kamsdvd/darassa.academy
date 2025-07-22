import React from 'react';

interface LoadingFallbackProps {
  message?: string;
}

const LoadingFallback: React.FC<LoadingFallbackProps> = ({ message }) => (
  <div className="min-h-screen flex flex-col items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mb-4"></div>
    {message && <div className="text-lg text-gray-700">{message}</div>}
  </div>
);

export default LoadingFallback;