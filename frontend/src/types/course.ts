export interface Course { // MODIFIÉ
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

  startDate?: string;
  endDate?: string;
  location?: string;
  maxStudents?: number;
  status?: string;

  features?: string[];

  sessions?: SessionFrontend[];
}

export interface SessionFrontend {
  id: string;
  titre: string;
  description?: string;
  type: 'presentiel' | 'hybride' | 'en_ligne' | string;
  dateDebutFormatted: string;
  dureeFormatted: string;
  formateurName?: string;
  formateurAvatar?: string;
  lienMeet?: string;
  salle?: {
    nom: string;
    capacite?: number;
  };
}
