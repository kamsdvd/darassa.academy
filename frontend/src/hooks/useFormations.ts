import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FormationService, FormationParams } from '../services/formationService.ts';
import { Formation, SessionFrontend } from '../types/formation.ts'; // Frontend specific Formation type, import SessionFrontend

// Define the frontend's expected paginated response structure
export interface FrontendPaginatedFormations {
  data: Formation[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

// --- Helper: Mapper function (Improved) ---
export const mapBackendFormationToFrontend = (backendFormation: any): Formation => {
  // Extraction des champs nécessaires
  const {
    _id,
    titre,
    description,
    documents,
    duree,
    prix,
    category,
    formateurs,
    niveau,
    prerequis,
    objectifs,
    modules,
    evaluations,
    inscriptions,
    updatedAt,
    dateDebut,
    dateFin,
    centreFormation,
    placesDisponibles,
    statut,
    competences,
    sessions
  } = backendFormation;

  // Image URL
  let imageUrl = '/default-formation-image.png';
  if (documents && documents.length > 0) {
    const imageDoc = documents.find((doc: any) => doc.type === 'image_principale' || doc.type === 'thumbnail');
    if (imageDoc) imageUrl = imageDoc.url;
    else if (documents[0].url) imageUrl = documents[0].url;
  }

  // Durée
  const duration = typeof duree === 'number' && duree > 0 ? `${duree} heures` : 'Durée non spécifiée';

  // Formateur principal
  let instructor = { name: 'Instructeur non assigné', title: 'Formateur Expert', avatar: '/default-avatar.png' };
  if (formateurs && formateurs.length > 0 && formateurs[0]) {
    const mainInstructor = formateurs[0];
    instructor.name = (`${mainInstructor.firstName || ''} ${mainInstructor.lastName || ''}`).trim() || 'Instructeur non assigné';
    instructor.avatar = mainInstructor.profilePicture || '/default-avatar.png';
  }

  // Niveau
  let level: 'Débutant' | 'Intermédiaire' | 'Avancé' = 'Débutant';
  if (niveau) {
    switch (niveau.toLowerCase()) {
      case 'debutant': level = 'Débutant'; break;
      case 'intermediaire': level = 'Intermédiaire'; break;
      case 'avance':
      case 'expert': level = 'Avancé'; break;
      default: break;
    }
  }

  // Syllabus
  const syllabus = Array.isArray(modules) ? modules.map((mod: any) => ({
    title: mod.titre || 'Module sans titre',
    content: Array.isArray(mod.contenu) ? mod.contenu : [],
  })) : [];

  // Note et avis
  let rating = 0;
  const reviews = Array.isArray(evaluations) ? evaluations.length : 0;
  if (reviews > 0) {
    const totalRating = evaluations.reduce((sum: number, evalItem: any) => sum + (typeof evalItem.note === 'number' ? evalItem.note : 0), 0);
    rating = reviews > 0 ? parseFloat((totalRating / reviews).toFixed(1)) : 0;
  }

  // Étudiants inscrits
  const enrolledStudents = Array.isArray(inscriptions) ? inscriptions.length : 0;

  // Dates
  const dateFormatter = (dateInput: any): string | undefined => {
    if (!dateInput) return undefined;
    try {
      return new Date(dateInput).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) { return undefined; }
  };
  const lastUpdated = dateFormatter(updatedAt) || 'Date inconnue';
  const startDate = dateFormatter(dateDebut);
  const endDate = dateFormatter(dateFin);

  // Lieu
  const location = centreFormation?.nom
    ? `${centreFormation.nom}${centreFormation.adresse ? `, ${centreFormation.adresse}` : ''}`
    : 'Lieu non spécifié / En ligne';

  // Statut
  let status = statut || 'Statut inconnu';
  if (statut) {
    switch(statut.toLowerCase()){
      case 'planifiee': status = 'Planifiée'; break;
      case 'en_cours': status = 'En cours'; break;
      case 'terminee': status = 'Terminée'; break;
      case 'annulee': status = 'Annulée'; break;
      default: status = statut;
    }
  }

  // Compétences
  const features = Array.isArray(competences) ? competences : [];

  return {
    id: _id?.toString() || backendFormation.id || '',
    title: titre || 'Titre non disponible',
    description: description || 'Description non disponible',
    imageUrl,
    duration,
    price: typeof prix === 'number' ? prix : 0,
    category: category || 'Non catégorisée',
    instructor,
    level,
    language: 'Français',
    prerequisites: Array.isArray(prerequis) ? prerequis : [],
    objectives: Array.isArray(objectifs) ? objectifs : [],
    syllabus,
    rating,
    reviews,
    enrolledStudents,
    lastUpdated,
    startDate,
    endDate,
    location,
    maxStudents: typeof placesDisponibles === 'number' ? placesDisponibles : 0,
    status,
    features,
    sessions: Array.isArray(sessions)
      ? sessions.map(mapBackendSessionToFrontend)
      : undefined,
  };
};

// --- Helper: Mapper function for ISession (backend) to SessionFrontend ---
const mapBackendSessionToFrontend = (backendSession: any): SessionFrontend => {
  if (!backendSession) {
    // Should ideally not happen if called from mapBackendFormationToFrontend's check
    return {
      id: '', titre: 'Session non disponible', type: 'N/A',
      dateDebutFormatted: 'N/A', dureeFormatted: 'N/A'
    };
  }

  const {
    _id,
    titre,
    description,
    type,
    dateDebut,
    duree, // en minutes
    formateur, // Populated: { firstName, lastName, email, profilePicture }
    lienMeet,
    salle,
  } = backendSession;

  // Format dateDebut
  let dateDebutFormatted = 'Date non spécifiée';
  if (dateDebut) {
    try {
      dateDebutFormatted = new Date(dateDebut).toLocaleString('fr-FR', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
      });
    } catch (e) { /* ignore */ }
  }

  // Format duree
  let dureeFormatted = 'Durée non spécifiée';
  if (typeof duree === 'number' && duree > 0) {
    const hours = Math.floor(duree / 60);
    const minutes = duree % 60;
    if (hours > 0 && minutes > 0) {
      dureeFormatted = `${hours}h${minutes < 10 ? '0' : ''}${minutes}`;
    } else if (hours > 0) {
      dureeFormatted = `${hours}h`;
    } else if (minutes > 0) {
      dureeFormatted = `${minutes} min`;
    }
  }

  let formateurName: string | undefined = undefined;
  let formateurAvatar: string | undefined = '/default-avatar.png'; // Default avatar
  if (formateur) {
    formateurName = (`${formateur.firstName || ''} ${formateur.lastName || ''}`).trim() || undefined;
    formateurAvatar = formateur.profilePicture || '/default-avatar.png';
  }

  return {
    id: _id?.toString() || backendSession.id || '',
    titre: titre || 'Session sans titre',
    description: description || undefined,
    type: type || 'N/A',
    dateDebutFormatted: dateDebutFormatted,
    dureeFormatted: dureeFormatted,
    formateurName: formateurName,
    formateurAvatar: formateurAvatar,
    lienMeet: lienMeet || undefined,
    salle: salle ? { nom: salle.nom || 'Salle non spécifiée', capacite: salle.capacite } : undefined,
  };
};
// --- End Helper: Mapper function ---


// --- Helper: Inverse Mapper function (Frontend Formation Data -> Backend Payload) ---
export const mapFrontendFormationToBackendPayload = (frontendData: Partial<Formation>): any => {
  const payload: any = {};

  // Direct string mappings or simple types
  if (frontendData.title !== undefined) payload.titre = frontendData.title;
  if (frontendData.description !== undefined) payload.description = frontendData.description;
  if (frontendData.category !== undefined) payload.category = frontendData.category; // Assumes backend now expects 'category'
  if (frontendData.price !== undefined) payload.prix = frontendData.price;
  if (frontendData.prerequisites !== undefined) payload.prerequis = frontendData.prerequisites;
  if (frontendData.objectives !== undefined) payload.objectifs = frontendData.objectives;
  if (frontendData.features !== undefined) payload.competences = frontendData.features; // 'features' (frontend) maps to 'competences' (backend)
  if (frontendData.googleMeetLink !== undefined) payload.googleMeetLink = frontendData.googleMeetLink;

  // Mappings requiring transformation
  if (frontendData.duration !== undefined) {
    const durationMatch = frontendData.duration.match(/^(\d+)/); // Extract number from "X heures"
    if (durationMatch && durationMatch[1]) {
      payload.duree = parseInt(durationMatch[1], 10);
    }
  }

  if (frontendData.level !== undefined) {
    switch (frontendData.level.toLowerCase()) {
      case 'débutant': payload.niveau = 'debutant'; break;
      case 'intermédiaire': payload.niveau = 'intermediaire'; break;
      case 'avancé': payload.niveau = 'avance'; break; // Ou 'expert' si le formulaire le permet
      default: // Ne rien faire ou loguer une erreur si la valeur n'est pas reconnue
        break;
    }
  }

  if (frontendData.syllabus !== undefined) {
    payload.modules = frontendData.syllabus.map(mod => ({
      titre: mod.title,
      description: mod.title, // Placeholder: IModule backend a 'description', frontend syllabus non. Utiliser titre comme description?
      duree: 1, // Placeholder: IModule backend a 'duree', frontend syllabus non. Mettre une durée par défaut?
      contenu: mod.content,
      // evaluation: [] // Placeholder: IModule backend a 'evaluation', frontend syllabus non.
    }));
  }

  // Champs qui seraient typiquement des IDs et que le formulaire devrait fournir comme tels
  // s'ils sont modifiables via ce payload. Sinon, ils sont gérés par d'autres mécanismes.
  // Exemple: si le formulaire permet de changer le centre de formation via un select d'IDs.
  // if (frontendData.centreFormationId !== undefined) payload.centreFormation = frontendData.centreFormationId;
  // if (frontendData.formateurIds !== undefined) payload.formateurs = frontendData.formateurIds;

  // Champs de date (s'attendant à un format ISO string pour le backend DTO)
  if (frontendData.startDate !== undefined) {
    try {
      payload.dateDebut = new Date(frontendData.startDate).toISOString();
    } catch (e) { /* ignorer si la date n'est pas valide pour le payload */ }
  }
  if (frontendData.endDate !== undefined) {
     try {
      payload.dateFin = new Date(frontendData.endDate).toISOString();
    } catch (e) { /* ignorer */ }
  }

  if (frontendData.maxStudents !== undefined) payload.placesDisponibles = frontendData.maxStudents;
  if (frontendData.status !== undefined) { // Frontend status est déjà mappé en string lisible
     switch (frontendData.status.toLowerCase()) {
      case 'planifiée': payload.statut = 'planifiee'; break;
      case 'en cours': payload.statut = 'en_cours'; break;
      case 'terminée': payload.statut = 'terminee'; break;
      case 'annulée': payload.statut = 'annulee'; break;
      default: // Ne rien faire ou loguer
        break;
    }
  }

  // Le champ 'code' est important pour le backend (unique, requis à la création)
  // Il faudrait s'assurer que le formulaire frontend le gère bien.
  // Si frontendData est un objet Formation complet venant d'un GET, il n'a pas 'code'.
  // Si c'est un formulaire de création, il devrait avoir 'code'.
  // Ce mapping suppose que si 'code' est pertinent, il est dans frontendData.
  if ((frontendData as any).code !== undefined) payload.code = (frontendData as any).code;


  // Ne pas envoyer les champs qui sont purement frontend ou calculés (id, imageUrl, instructor object, rating, reviews, enrolledStudents, lastUpdated, language)
  // Sauf si le backend a un moyen de les interpréter (ex: image upload séparé).

  return payload;
};
// --- End Helper: Inverse Mapper function ---


// Hook to fetch multiple formations
export const useFormations = (params?: FormationParams): UseQueryResult<FrontendPaginatedFormations, Error> => {
  const formationService = FormationService.getInstance();

  return useQuery({
    queryKey: ['formations', params],
    queryFn: async () => {
      const serviceData = await formationService.getFormations(params);
      return {
        data: serviceData.data.map(mapBackendFormationToFrontend),
        meta: serviceData.meta || {
          currentPage: 1, totalPages: 1, totalItems: serviceData.data.length, itemsPerPage: serviceData.data.length
        }
      };
    },
    staleTime: 5 * 60 * 1000,
  });
};

// Hook to fetch a single formation by ID
export const useFormationById = (id: string | undefined): UseQueryResult<Formation, Error> => {
  const formationService = FormationService.getInstance();

  return useQuery({
    queryKey: ['formation', id],
    queryFn: async () => {
      if (!id) throw new Error("ID de formation non fourni.");
      const serviceData = await formationService.getFormationById(id);
      return mapBackendFormationToFrontend(serviceData);
    },
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';

// ... (keep existing useQuery hooks and mapBackendFormationToFrontend function)

// Hook for Creating a Formation
export const useCreateFormation = (): UseMutationResult<
  Formation,
  Error,
  Partial<Formation>,
  unknown
> => {
  const queryClient = useQueryClient();
  const formationService = FormationService.getInstance();

  return useMutation<Formation, Error, Partial<Formation>>({
    mutationFn: async (formationData: Partial<Formation>) => {
      return formationService.createFormation(formationData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['formations'] });
      console.log('Formation created successfully:', data);
    },
    onError: (error: Error) => {
      console.error('Error creating formation:', error.message);
    },
  });
};

// Hook for Updating a Formation
interface UpdateFormationVariables {
  id: string;
  data: Partial<Formation>;
}

export const useUpdateFormation = (): UseMutationResult<
  Formation,
  Error,
  UpdateFormationVariables,
  unknown
> => {
  const queryClient = useQueryClient();
  const formationService = FormationService.getInstance();

  return useMutation<Formation, Error, UpdateFormationVariables>({
    mutationFn: async ({ id, data }) => {
      return formationService.updateFormation(id, data);
    },
    onSuccess: (updatedFormationData, variables) => {
      queryClient.invalidateQueries({ queryKey: ['formations'] });
      queryClient.invalidateQueries({ queryKey: ['formation', variables.id] });
      console.log(`Formation ${variables.id} updated successfully:`, updatedFormationData);
    },
    onError: (error: Error, variables) => {
      console.error(`Error updating formation ${variables.id}:`, error.message);
    },
  });
};

// Hook for Deleting a Formation
export const useDeleteFormation = (): UseMutationResult<
  void,
  Error,
  string,
  unknown
> => {
  const queryClient = useQueryClient();
  const formationService = FormationService.getInstance();

  return useMutation<void, Error, string>({
    mutationFn: async (formationId: string) => {
      return formationService.deleteFormation(formationId);
    },
    onSuccess: (_data, formationId) => {
      queryClient.invalidateQueries({ queryKey: ['formations'] });
      queryClient.removeQueries({ queryKey: ['formation', formationId] });
      console.log(`Formation ${formationId} deleted successfully.`);
    },
    onError: (error: Error, formationId) => {
      console.error(`Error deleting formation ${formationId}:`, error.message);
    },
  });
};
// ...existing code...
