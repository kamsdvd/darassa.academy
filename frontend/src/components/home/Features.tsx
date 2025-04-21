import React from 'react';
import { BookOpen, Building2, Globe2 } from 'lucide-react';
import Section from '../shared/Section';
import Card from '../shared/Card';

const features = [
  {
    icon: BookOpen,
    title: 'Formation Hybride',
    description: 'Cours en ligne et en présentiel pour une expérience d\'apprentissage optimale',
  },
  {
    icon: Building2,
    title: 'Emploi Garanti',
    description: 'Un réseau d\'entreprises partenaires pour votre insertion professionnelle',
  },
  {
    icon: Globe2,
    title: 'Certifications Reconnues',
    description: 'Des diplômes reconnus internationalement dans votre domaine',
  },
];

const Features: React.FC = () => {
  return (
    <Section>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Pourquoi choisir Darassa Academy?</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} hover className="text-center">
            <feature.icon className="w-12 h-12 text-[#007BFF] mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Features; 