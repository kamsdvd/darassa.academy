import React from 'react';
import PageTransition from '../../components/shared/PageTransition';

const Blog: React.FC = () => {
  return (
    <PageTransition>
      <div className="min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog</h1>
          <p className="text-xl text-gray-600 mb-12">
            Découvrez nos derniers articles, conseils et actualités sur le développement web et le marketing digital.
          </p>
          {/* Le contenu détaillé sera ajouté plus tard */}
        </div>
      </div>
    </PageTransition>
  );
};

export default Blog; 