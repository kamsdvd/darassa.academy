import React from 'react';
import { LazyImage } from '../shared/LazyImage';
import { Skeleton } from '../shared/Skeleton';
import { Link } from 'react-router-dom';

interface Formation {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  duration: string;
  price: number;
  category: string;
}

interface FormationCardProps {
  formation?: Formation;
  isLoading?: boolean;
}

export const FormationCard: React.FC<FormationCardProps> = ({
  formation,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Skeleton variant="rectangular" height={200} className="w-full" />
        <div className="p-4 space-y-4">
          <Skeleton variant="text" width="80%" height={24} />
          <Skeleton variant="text" width="100%" height={40} />
          <div className="flex justify-between items-center mt-4">
            <Skeleton variant="text" width={100} height={24} />
            <Skeleton variant="rectangular" width={120} height={36} className="rounded-md" />
          </div>
        </div>
      </div>
    );
  }

  if (!formation) return null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <LazyImage
        src={formation.imageUrl || (formation as any).image}
        alt={formation.title}
        className="w-full h-48"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{formation.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{formation.description}</p>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Durée: {formation.duration}
          </div>
          <Link 
            to={`/formations/${formation.id}`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            En savoir plus
          </Link>
        </div>
      </div>
    </div>
  );
}; 