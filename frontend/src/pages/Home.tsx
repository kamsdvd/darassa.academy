import React, { Suspense } from 'react';

// Lazy load components
const { Hero } = await import('../components/home/Hero');
const Stats = React.lazy(() => import('../components/home/Stats'));
const Features = React.lazy(() => import('../components/home/Features'));
const Courses = React.lazy(() => import('../components/home/Courses'));
const Testimonials = React.lazy(() => import('../components/home/Testimonials'));
const Partners = React.lazy(() => import('../components/home/Partners'));
const MLMProgram = React.lazy(() => import('../components/home/MLMProgram'));
const Blog = React.lazy(() => import('../components/home/Blog'));
const FAQ = React.lazy(() => import('../components/home/FAQ'));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
  </div>
);

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Suspense fallback={<LoadingFallback />}>
        <Stats />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Features />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Courses />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Partners />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <MLMProgram />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Blog />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <FAQ />
      </Suspense>
    </>
  );
};

export default Home; 