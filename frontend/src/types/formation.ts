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
    // Potentially add: description?: string; duration?: number | string;
  }[];
  rating: number;
  reviews: number;
  enrolledStudents: number;
  lastUpdated: string; // Formatted date string

  // Fields often used in detail pages, mapped from backend
  startDate?: string; // Formatted date string from IFormation.dateDebut
  endDate?: string; // Formatted date string from IFormation.dateFin
  location?: string; // Derived from IFormation.centreFormation.adresse or specific field
  maxStudents?: number; // From IFormation.placesDisponibles
  status?: string; // From IFormation.statut, mapped to human-readable if needed

  // instructor might have more fields if available from backend User model
  // instructor.bio?: string;

  // features could be mapped from IFormation.competences or a dedicated field
  // features?: string[];
} 