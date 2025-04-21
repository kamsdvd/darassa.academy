import React from 'react';
import { Code, Database, Palette, LineChart, Camera, Megaphone, ChevronRight } from 'lucide-react';
import Section from '../shared/Section';
import Card from '../shared/Card';
import Button from '../shared/Button';

const courses = [
  { icon: Code, title: 'Développement Web', duration: '6 mois', level: 'Débutant à Avancé', category: 'Tech' },
  { icon: Database, title: 'Data Science', duration: '8 mois', level: 'Intermédiaire', category: 'Tech' },
  { icon: Palette, title: 'Design UI/UX', duration: '4 mois', level: 'Tous niveaux', category: 'Design' },
  { icon: LineChart, title: 'Marketing Digital', duration: '3 mois', level: 'Débutant', category: 'Marketing' },
  { icon: Camera, title: 'Production Audiovisuelle', duration: '6 mois', level: 'Débutant à Avancé', category: 'Média' },
  { icon: Megaphone, title: 'Community Management', duration: '3 mois', level: 'Débutant', category: 'Marketing' },
];

const Courses: React.FC = () => {
  return (
    <Section background="gray">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Nos Formations Populaires</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Découvrez nos formations certifiantes conçues pour vous préparer aux métiers les plus demandés du marché.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <Card key={index} hover>
            <course.icon className="w-12 h-12 text-[#007BFF] mb-4" />
            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
            <div className="text-gray-600 space-y-2">
              <p>Durée: {course.duration}</p>
              <p>Niveau: {course.level}</p>
              <p>Catégorie: {course.category}</p>
            </div>
            <Button
              variant="primary"
              size="sm"
              className="mt-4"
              icon={ChevronRight}
              iconPosition="right"
            >
              En savoir plus
            </Button>
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
          Voir toutes les formations
        </Button>
      </div>
    </Section>
  );
};

export default Courses; 