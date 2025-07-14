import React from 'react';
import PageTransition from '@/components/shared/PageTransition';
import CourseHero from '@/components/courses/CourseHero'; // MODIFIÉ
import CourseCategories from '@/components/courses/CourseCategories'; // MODIFIÉ
import CourseList from '@/components/courses/CourseList'; // MODIFIÉ
import CourseBenefits from '@/components/courses/CourseBenefits'; // MODIFIÉ
import CourseTestimonials from '@/components/courses/CourseTestimonials'; // MODIFIÉ
import CourseFAQ from '@/components/courses/CourseFAQ'; // MODIFIÉ

const Courses: React.FC = () => { // MODIFIÉ
  return (
    <PageTransition>
      <div className="min-h-screen">
        <CourseHero />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CourseCategories />
          <CourseList />
          <CourseBenefits />
          <CourseTestimonials />
          <CourseFAQ />
        </div>
      </div>
    </PageTransition>
  );
};

export default Courses; // MODIFIÉ
