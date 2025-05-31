import React, { useState } from 'react';
// Supprimer l'importation de next/image
// import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean; // Cette prop ne sera plus utilisée directement par <img>
  objectFit?: 'contain' | 'cover' | 'fill'; // Cette prop sera gérée par CSS
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  // priority = false, // Ne plus utiliser cette prop
  objectFit = 'cover',
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        style={{
          objectFit: objectFit, // Appliquer objectFit via style
          width: width ? `${width}px` : '100%', // Gérer width et height
          height: height ? `${height}px` : 'auto',
        }}
        className={`
          block w-full h-full
          duration-700 ease-in-out
          ${isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'}
        `}
        onLoad={() => setIsLoading(false)} // Utiliser onLoad pour détecter le chargement
        // priority={priority} // Supprimer cette prop
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75">
          <div className="w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}; 