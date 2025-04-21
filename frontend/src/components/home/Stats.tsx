import React from 'react';
import { GraduationCap, Users, Award } from 'lucide-react';
import Section from '../shared/Section';
import Card from '../shared/Card';

const stats = [
  {
    icon: GraduationCap,
    value: '16+',
    label: 'Filières de formation',
  },
  {
    icon: Users,
    value: '1000+',
    label: 'Étudiants formés',
  },
  {
    icon: Award,
    value: '90%',
    label: 'Taux d\'emploi',
  },
];

const Stats: React.FC = () => {
  return (
    <Section background="gray">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <Card key={index} hover>
            <div className="flex items-center gap-4">
              <stat.icon className="w-12 h-12 text-[#007BFF]" />
              <div>
                <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};

export default Stats; 