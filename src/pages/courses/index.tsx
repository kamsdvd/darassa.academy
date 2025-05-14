import { useState, useMemo, useCallback, useEffect } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { useInView } from 'react-intersection-observer';
import { MainLayout } from '../../components/layout/MainLayout';
import { useInfiniteQueryCache } from '../../hooks/useQueryCache';
import { useAppDispatch, useAppSelector } from '../../store';
import { setFilters } from '../../store/slices/courseSlice';
import { LazyLoad } from '../../components/common/LazyLoad';
import { OptimizedImage } from '../../components/common/OptimizedImage';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

const COLUMN_COUNT = 3;
const ROW_HEIGHT = 400;
const COLUMN_WIDTH = 400;
const PAGE_SIZE = 12;

export default function Courses() {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.course);
  const { ref: loadMoreRef, inView } = useInView();

  const [localFilters, setLocalFilters] = useState({
    category: filters.category || '',
    level: filters.level || '',
    priceRange: filters.priceRange || '',
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error
  } = useInfiniteQueryCache(
    ['courses', localFilters],
    '/api/courses',
    {
      params: {
        ...localFilters,
        limit: PAGE_SIZE,
      },
    }
  );

  const handleFilterChange = useCallback((key: string, value: string) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const applyFilters = useCallback(() => {
    dispatch(setFilters(localFilters));
  }, [dispatch, localFilters]);

  const resetFilters = useCallback(() => {
    setLocalFilters({
      category: '',
      level: '',
      priceRange: '',
    });
    dispatch(setFilters({}));
  }, [dispatch]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const courses = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) => page.items);
  }, [data]);

  const Cell = useCallback(({ columnIndex, rowIndex, style }) => {
    const index = rowIndex * COLUMN_COUNT + columnIndex;
    const course = courses[index];

    if (!course) return null;

    return (
      <div style={style}>
        <LazyLoad>
          <div className="bg-white rounded-lg shadow-md overflow-hidden h-full">
            <OptimizedImage
              src={course.thumbnail}
              alt={course.title}
              width={400}
              height={225}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {course.title}
              </h2>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-indigo-600 font-medium">
                  {course.price}€
                </span>
                <span className="text-gray-500">
                  {course.duration} heures
                </span>
              </div>
            </div>
          </div>
        </LazyLoad>
      </div>
    );
  }, [courses]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner size="large" />
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="text-center text-red-600">
          Une erreur est survenue lors du chargement des cours.
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Nos Cours</h1>

        {/* Filtres */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <select
            value={localFilters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Toutes les catégories</option>
            <option value="development">Développement</option>
            <option value="design">Design</option>
            <option value="business">Business</option>
          </select>

          <select
            value={localFilters.level}
            onChange={(e) => handleFilterChange('level', e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Tous les niveaux</option>
            <option value="beginner">Débutant</option>
            <option value="intermediate">Intermédiaire</option>
            <option value="advanced">Avancé</option>
          </select>

          <select
            value={localFilters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Tous les prix</option>
            <option value="0-50">0 - 50€</option>
            <option value="50-100">50 - 100€</option>
            <option value="100+">100€ et plus</option>
          </select>
        </div>

        <div className="flex justify-end gap-4 mb-8">
          <button
            onClick={resetFilters}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Réinitialiser
          </button>
          <button
            onClick={applyFilters}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Appliquer les filtres
          </button>
        </div>

        {/* Liste des cours virtualisée */}
        <div className="h-[800px]">
          <AutoSizer>
            {({ height, width }) => (
              <Grid
                columnCount={COLUMN_COUNT}
                columnWidth={COLUMN_WIDTH}
                height={height}
                rowCount={Math.ceil(courses.length / COLUMN_COUNT)}
                rowHeight={ROW_HEIGHT}
                width={width}
              >
                {Cell}
              </Grid>
            )}
          </AutoSizer>
        </div>

        {/* Infinite scroll trigger */}
        <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
          {isFetchingNextPage && <LoadingSpinner size="medium" />}
        </div>
      </div>
    </MainLayout>
  );
} 