import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { LoadingSpinner } from './components/common/LoadingSpinner';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Courses = lazy(() => import('./pages/courses'));
const CourseDetail = lazy(() => import('./pages/courses/[id]'));
const Connexion = lazy(() => import('./pages/auth/Connexion'));
const Register = lazy(() => import('./pages/auth/Register'));

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner size="large" />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:id" element={<CourseDetail />} />
          <Route path="connexion" element={<Connexion />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </Suspense>
  );
} 