import React from 'react';
import PageTransition from '../../components/shared/PageTransition';
import FormationHero from '../../components/formations/FormationHero';
import FormationCategories from '../../components/formations/FormationCategories';
import FormationList from '../../components/formations/FormationList';
import FormationBenefits from '../../components/formations/FormationBenefits';
import FormationTestimonials from '../../components/formations/FormationTestimonials';
import FormationFAQ from '../../components/formations/FormationFAQ';

const Formations: React.FC = () => {
  return (
    <PageTransition>
      <div className="min-h-screen">
        <FormationHero />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FormationCategories />
          <FormationList />
          <FormationBenefits />
          <FormationTestimonials />
          <FormationFAQ />
        </div>
      </div>
    </PageTransition>
  );
};

export default Formations; 