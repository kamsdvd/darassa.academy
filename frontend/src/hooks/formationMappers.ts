import { Formation } from '../types/formation';

/**
 * Map a backend formation object to the frontend Formation type.
 */
export function mapBackendFormationToFrontend(backend: any): Formation {
  return {
    id: backend.id || backend._id || '',
    title: backend.title || backend.titre || '',
    description: backend.description || '',
    imageUrl: backend.imageUrl || backend.image || '',
    duration: backend.duration || backend.duree || '',
    price: backend.price || backend.prix || 0,
    category: backend.category || backend.categorie || '',
    instructor: {
      name: backend.instructor?.name || backend.formateur?.name || '',
      title: backend.instructor?.title || backend.formateur?.title || '',
      avatar: backend.instructor?.avatar || backend.formateur?.avatar || '',
    },
    level: backend.level || backend.niveau || 'Débutant',
    language: backend.language || backend.langue || '',
    prerequisites: backend.prerequisites || backend.prerequis || [],
    objectives: backend.objectives || backend.objectifs || [],
    syllabus: backend.syllabus || backend.programme || [],
    rating: backend.rating || 0,
    reviews: backend.reviews || 0,
    enrolledStudents: backend.enrolledStudents || backend.apprenants || 0,
    lastUpdated: backend.lastUpdated || backend.updatedAt || '',
    startDate: backend.startDate || backend.dateDebut || '',
    endDate: backend.endDate || backend.dateFin || '',
    location: backend.location || backend.centreFormation?.adresse || '',
    maxStudents: backend.maxStudents || backend.placesDisponibles || undefined,
    status: backend.status || backend.statut || '',
    features: backend.features || backend.competences || [],
    sessions: backend.sessions || [],
  };
}

/**
 * Map a frontend Formation object to the backend payload structure.
 */
export function mapFrontendFormationToBackendPayload(frontend: Partial<Formation>): any {
  return {
    id: frontend.id,
    titre: frontend.title,
    description: frontend.description,
    image: frontend.imageUrl,
    duree: frontend.duration,
    prix: frontend.price,
    categorie: frontend.category,
    formateur: frontend.instructor?.name,
    niveau: frontend.level,
    langue: frontend.language,
    prerequis: frontend.prerequisites,
    objectifs: frontend.objectives,
    programme: frontend.syllabus,
    statut: frontend.status,
    competences: frontend.features,
    dateDebut: frontend.startDate,
    dateFin: frontend.endDate,
    placesDisponibles: frontend.maxStudents,
    centreFormation: frontend.location,
    // Add or adjust fields as needed for your backend
  };
}
