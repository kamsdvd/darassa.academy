import React from 'react';
import { LazyImage } from '../shared/LazyImage';
import { Skeleton } from '../shared/Skeleton';
import { Link } from 'react-router-dom';
import { Course } from '../../types/course';

const COLOR_PALETTE = [
  "#2563eb", // Bleu vif
  "#10b981", // Vert émeraude
  "#f59e42", // Orange doux
  "#f43f5e", // Rose punchy
  "#a21caf", // Violet profond
  "#facc15", // Jaune lumineux
  "#14b8a6", // Turquoise
  "#6366f1", // Indigo
  "#e11d48", // Framboise
  "#fbbf24", // Jaune orangé
];

const generateColorSvg = (id: string | number) => {
  const stringId = String(id);
  const hash = stringId.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
  const colorIndex = Math.abs(hash) % COLOR_PALETTE.length;
  const color = COLOR_PALETTE[colorIndex];
  const svg = `<svg viewBox=\"0 0 1200 600\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"1200\" height=\"600\" fill=\"${color}\"/></svg>`; // No text, no explicit width/height
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

interface CourseCardProps {
  course?: Course;
  isLoading?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
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

  if (!course) return null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <LazyImage
        src={course.imageUrl && course.imageUrl.trim() !== "" ? course.imageUrl : generateColorSvg(course.id)}
        alt={course.title}
        className="w-full h-48"
        placeholderSrc={generateColorSvg(course.id)}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{course.description}</p>
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Durée: {course.duration}
          </div>
          <Link 
            to={`/courses/${course.id}`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            En savoir plus
          </Link>
        </div>
      </div>
    </div>
  );
}; 