import React, { Suspense, lazy } from 'react';

// Lazy load components
const Hero = lazy(() => import('../components/home/Hero'));
const Stats = lazy(() => import('../components/home/Stats'));
const Features = lazy(() => import('../components/home/Features'));
const Courses = lazy(() => import('../components/home/Courses'));
const Testimonials = lazy(() => import('../components/home/Testimonials'));
const Partners = lazy(() => import('../components/home/Partners'));
const MLMProgram = lazy(() => import('../components/home/MLMProgram'));
const Blog = lazy(() => import('../components/home/Blog'));
const FAQ = lazy(() => import('../components/home/FAQ'));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#007BFF]"></div>
  </div>
);

const Home: React.FC = () => {
  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        <Hero />
      </Suspense>
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