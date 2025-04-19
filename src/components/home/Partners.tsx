import React from 'react';
import Section from '../shared/Section';
import Card from '../shared/Card';

const partners = [
  { name: 'Tech Solutions RDC', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80' },
  { name: 'Banking Corp', logo: 'https://images.unsplash.com/photo-1598120290407-1a8dff3a17d3?auto=format&fit=crop&q=80' },
  { name: 'Creative Studio', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80' },
  { name: 'Digital Agency', logo: 'https://images.unsplash.com/photo-1598120290407-1a8dff3a17d3?auto=format&fit=crop&q=80' },
];

const Partners: React.FC = () => {
  return (
    <Section background="gray">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Nos Partenaires</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Ils nous font confiance pour recruter nos talents certifiés.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {partners.map((partner, index) => (
          <Card key={index} hover className="flex items-center justify-center">
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-12 object-contain grayscale hover:grayscale-0 transition-all"
            />
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Partners; 