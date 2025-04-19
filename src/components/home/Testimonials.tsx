import React from 'react';
import { Quote, Star } from 'lucide-react';
import Section from '../shared/Section';
import Card from '../shared/Card';

const testimonials = [
  {
    name: 'Sarah Mukendi',
    role: 'Développeuse Web',
    company: 'Tech Solutions RDC',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80',
    content: 'Grâce à Darassa Academy, j\'ai pu me reconvertir dans le développement web. La formation pratique et l\'accompagnement personnalisé m\'ont permis de trouver un emploi en seulement 2 mois après ma certification.',
  },
  {
    name: 'Jean Kalala',
    role: 'Data Analyst',
    company: 'Banking Corp',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
    content: 'La formation en Data Science était exactement ce dont j\'avais besoin pour évoluer dans ma carrière. Les projets pratiques et le mentorat ont fait toute la différence.',
  },
  {
    name: 'Marie Tshilumba',
    role: 'UI/UX Designer',
    company: 'Creative Studio',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80',
    content: 'Une expérience d\'apprentissage incroyable ! Les formateurs sont des professionnels passionnés et le programme est parfaitement structuré pour une progression rapide.',
  },
];

const Testimonials: React.FC = () => {
  return (
    <Section>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Ce que disent nos étudiants</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Découvrez les témoignages de nos anciens étudiants qui ont réussi leur reconversion professionnelle.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index} hover>
            <div className="flex items-center gap-4 mb-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                <p className="text-gray-600">{testimonial.role}</p>
                <p className="text-sm text-gray-500">{testimonial.company}</p>
              </div>
            </div>
            <Quote className="w-8 h-8 text-[#007BFF]/20 mb-2" />
            <p className="text-gray-600">{testimonial.content}</p>
            <div className="flex gap-1 mt-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-[#FFC107]" fill="#FFC107" />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Testimonials; 