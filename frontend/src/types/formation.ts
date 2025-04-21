export interface Formation {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  duration: string;
  price: number;
  category: string;
  instructor: {
    name: string;
    title: string;
    avatar: string;
  };
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  language: string;
  prerequisites: string[];
  objectives: string[];
  syllabus: {
    title: string;
    content: string[];
  }[];
  rating: number;
  reviews: number;
  enrolledStudents: number;
  lastUpdated: string;
} 