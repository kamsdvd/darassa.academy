import React from 'react';
import { ChevronRight } from 'lucide-react';
import Section from '../shared/Section';
import Card from '../shared/Card';
import Button from '../shared/Button';

const blogPosts = [
  {
    title: 'Les métiers tech les plus recherchés en RDC',
    excerpt: 'Découvrez les opportunités d\'emploi dans le secteur technologique en République Démocratique du Congo...',
    image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&q=80',
    date: '12 Mars 2024',
  },
  {
    title: 'Comment devenir développeur web en 6 mois',
    excerpt: 'Un guide pratique pour vous lancer dans une carrière de développeur web, même sans expérience préalable...',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80',
    date: '8 Mars 2024',
  },
  {
    title: 'Le succès de nos étudiants en Data Science',
    excerpt: 'Témoignages et parcours de nos anciens étudiants qui excellent maintenant dans le domaine de la data...',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80',
    date: '5 Mars 2024',
  },
];

const Blog: React.FC = () => {
  return (
    <Section>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Derniers Articles</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Restez informé des dernières tendances et opportunités dans le domaine de la tech.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <Card key={index} hover className="overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <p className="text-sm text-gray-500 mb-2">{post.date}</p>
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <Button
                variant="primary"
                size="sm"
                icon={ChevronRight}
                iconPosition="right"
              >
                Lire la suite
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button
          variant="primary"
          size="lg"
          icon={ChevronRight}
          iconPosition="right"
        >
          Voir tous les articles
        </Button>
      </div>
    </Section>
  );
};

export default Blog; 