import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { FormationService, FormationParams, PaginatedResponse as ServicePaginatedResponse } from '../services/formationService.ts';
import { Formation } from '../types/formation.ts'; // Frontend specific Formation type

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
const mapBackendFormationToFrontend = (backendFormation: any): Formation => {
  if (!backendFormation) {
    // Return a default or empty Formation object if backendFormation is null/undefined
    // This can prevent errors in components if the API unexpectedly returns no data for an ID.
    // However, useFormationById should ideally not call this if data is null (React Query handles error/null states).
    // This is more of a defensive check if the function were called directly with potentially null data.
    return {
      id: '', title: 'Formation non disponible', description: '', imageUrl: '/default-formation-image.png',
      duration: 'N/A', price: 0, category: 'N/A',
      instructor: { name: 'N/A', title: 'N/A', avatar: '/default-avatar.png' },
      level: 'Débutant', language: 'N/A', prerequisites: [], objectives: [], syllabus: [],
      rating: 0, reviews: 0, enrolledStudents: 0, lastUpdated: new Date().toLocaleDateString(),
      status: 'N/A',
    };
  }

  const {
    _id,
    titre,
    description,
    documents,
    duree, // number
    prix,
    category, // Now available from backend
    formateurs, // Array, populated
    niveau, // enum
    // language - Still missing in IFormation
    prerequis,
    objectifs,
    modules, // Array of IModule
    evaluations, // Array of IEvaluationFormation
    inscriptions, // Array of IInscription
    updatedAt,
    dateDebut,
    dateFin,
    centreFormation, // Populated
    placesDisponibles,
    statut, // enum
    competences, // in IFormation, will map to 'features'
  } = backendFormation;

  // Image URL Logic
  let imageUrl = '/default-formation-image.png'; // Fallback
  if (documents && documents.length > 0) {
    const imageDoc = documents.find((doc: any) => doc.type === 'image_principale' || doc.type === 'thumbnail');
    if (imageDoc) {
      imageUrl = imageDoc.url;
    } else if (documents[0].url) { // Fallback to first document URL if no specific image type
      imageUrl = documents[0].url;
    }
  }

  // Duration Logic
  const durationString = typeof duree === 'number' && duree > 0 ? `${duree} heures` : 'Durée non spécifiée';

  // Instructor Logic
  let instructor = {
    name: 'Instructeur non assigné',
    title: 'Formateur Expert', // Placeholder - No direct source from backend User model yet
    avatar: '/default-avatar.png',
    // bio: 'Bio non disponible' // Placeholder - No direct source
  };
  if (formateurs && formateurs.length > 0 && formateurs[0]) {
    const mainInstructor = formateurs[0]; // Assuming the first one is the primary
    instructor.name = (`${mainInstructor.firstName || ''} ${mainInstructor.lastName || ''}`).trim() || 'Instructeur non assigné';
    // instructor.title = mainInstructor.professionalTitle || 'Formateur Expert'; // If User model had 'professionalTitle'
    instructor.avatar = mainInstructor.profilePicture || '/default-avatar.png'; // If User model had 'profilePicture'
    // instructor.bio = mainInstructor.bio || 'Bio non disponible'; // If User model had 'bio'
  }

  // Level Mapping
  let frontendLevel: 'Débutant' | 'Intermédiaire' | 'Avancé' = 'Débutant';
  if (niveau) {
    switch (niveau.toLowerCase()) {
      case 'debutant': frontendLevel = 'Débutant'; break;
      case 'intermediaire': frontendLevel = 'Intermédiaire'; break;
      case 'avance':
      case 'expert':
        frontendLevel = 'Avancé'; break;
      default: break; // Keep Débutant or handle as error/log
    }
  }

  // Syllabus Mapping
  const syllabus = Array.isArray(modules) ? modules.map((mod: any) => ({
    title: mod.titre || 'Module sans titre',
    content: Array.isArray(mod.contenu) ? mod.contenu : [],
    // description: mod.description, // Potentially add to frontend type
    // duration: mod.duree ? `${mod.duree}h` : undefined // Potentially add to frontend type
  })) : [];

  // Rating and Reviews Logic
  let calculatedRating = 0;
  const reviewsCount = Array.isArray(evaluations) ? evaluations.length : 0;
  if (reviewsCount > 0) {
    const totalRating = evaluations.reduce((sum: number, evalItem: any) => sum + (typeof evalItem.note === 'number' ? evalItem.note : 0), 0);
    calculatedRating = reviewsCount > 0 ? parseFloat((totalRating / reviewsCount).toFixed(1)) : 0;
  }

  // Enrolled Students
  const enrolledStudentsCount = Array.isArray(inscriptions) ? inscriptions.length : 0;

  // Dates
  const dateFormatter = (dateInput: any): string | undefined => {
    if (!dateInput) return undefined;
    try {
      return new Date(dateInput).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {
      return undefined; // Or 'Date invalide'
    }
  };
  const lastUpdatedString = dateFormatter(updatedAt) || 'Date inconnue';
  const startDateString = dateFormatter(dateDebut);
  const endDateString = dateFormatter(dateFin);

  // Location
  const locationString = centreFormation?.nom
    ? `${centreFormation.nom}${centreFormation.adresse ? `, ${centreFormation.adresse}` : ''}`
    : 'Lieu non spécifié / En ligne';

  // Status mapping
  let statusString = statut || 'Statut inconnu'; // Default if statut is undefined
  if (statut) {
    switch(statut.toLowerCase()){
      case 'planifiee': statusString = 'Planifiée'; break;
      case 'en_cours': statusString = 'En cours'; break;
      case 'terminee': statusString = 'Terminée'; break;
      case 'annulee': statusString = 'Annulée'; break;
      default: statusString = statut; // Keep original if not matched
    }
  }

  // Features
  const features = Array.isArray(competences) ? competences : [];

  return {
    id: _id?.toString() || backendFormation.id || '',
    title: titre || 'Titre non disponible',
    description: description || 'Description non disponible',
    imageUrl: imageUrl,
    duration: durationString,
    price: typeof prix === 'number' ? prix : 0,
    category: category || 'Non catégorisée', // Mapped from backend
    instructor: instructor,
    level: frontendLevel,
    language: 'Français', // Placeholder - Still no backend source for this
    prerequisites: Array.isArray(prerequis) ? prerequis : [],
    objectives: Array.isArray(objectifs) ? objectifs : [],
    syllabus: syllabus,
    rating: calculatedRating,
    reviews: reviewsCount,
    enrolledStudents: enrolledStudentsCount,
    lastUpdated: lastUpdatedString,
    startDate: startDateString,
    endDate: endDateString,
    location: locationString,
    maxStudents: typeof placesDisponibles === 'number' ? placesDisponibles : 0,
    status: statusString,
    features: features, // Mapped from competences
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

  return useQuery<ServicePaginatedResponse<any>, Error, FrontendPaginatedFormations>(
    ['formations', params],
    async () => formationService.getFormations(params),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      select: (serviceData) => {
        return {
          data: serviceData.data.map(mapBackendFormationToFrontend),
          meta: serviceData.meta || {
            currentPage: 1, totalPages: 1, totalItems: serviceData.data.length, itemsPerPage: serviceData.data.length
          }
        };
      },
    }
  );
};

// Hook to fetch a single formation by ID
export const useFormationById = (id: string | undefined): UseQueryResult<Formation, Error> => {
  const formationService = FormationService.getInstance();

  return useQuery<any, Error, Formation>(
    ['formation', id],
    async () => {
      if (!id) throw new Error("ID de formation non fourni.");
      return formationService.getFormationById(id);
    },
    {
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      select: (serviceData) => {
        return mapBackendFormationToFrontend(serviceData);
      },
    }
  );
};

import { useMutation, useQueryClient, UseMutationResult } from '@tanstack/react-query';

// ... (keep existing useQuery hooks and mapBackendFormationToFrontend function)

// Hook for Creating a Formation
export const useCreateFormation = (): UseMutationResult<
  Formation, // Type of data returned by the mutationFn
  Error, // Type of error
  Partial<Formation>, // Type of variables passed to the mutate function (formData)
  unknown // Type of context (optional)
> => {
  const queryClient = useQueryClient();
  const formationService = FormationService.getInstance();

  return useMutation<Formation, Error, Partial<Formation>>(
    async (formationData: Partial<Formation>) => {
      // Rappel: formationService.createFormation attend Partial<Formation> (type frontend)
      // et est supposé retourner le type Formation (frontend) après mapping interne si nécessaire.
      // Si le backend attend IFormation et que createFormation ne fait pas le mapping,
      // un mapping inverse (Frontend Formation -> Backend IFormation-like) serait nécessaire ici.
      return formationService.createFormation(formationData);
    },
    {
      onSuccess: (data) => {
        // Invalidate and refetch the list of formations
        queryClient.invalidateQueries(['formations']);
        // Optionally, you could also set this newly created formation into the cache
        // for its specific ID if you navigate to its detail page immediately.
        // queryClient.setQueryData(['formation', data.id], data);

        // TODO: Implement success notification (e.g., toast message)
        console.log('Formation created successfully:', data);
      },
      onError: (error: Error) => {
        // TODO: Implement error notification
        console.error('Error creating formation:', error.message);
      },
    }
  );
};

// Hook for Updating a Formation
interface UpdateFormationVariables {
  id: string;
  data: Partial<Formation>;
}

export const useUpdateFormation = (): UseMutationResult<
  Formation, // Type of data returned by the mutationFn
  Error, // Type of error
  UpdateFormationVariables, // Type of variables passed to the mutate function
  unknown // Type of context
> => {
  const queryClient = useQueryClient();
  const formationService = FormationService.getInstance();

  return useMutation<Formation, Error, UpdateFormationVariables>(
    async ({ id, data }) => {
      // Rappel: formationService.updateFormation attend Partial<Formation> (type frontend)
      // et est supposé retourner le type Formation (frontend) après mapping.
      return formationService.updateFormation(id, data);
    },
    {
      onSuccess: (updatedFormationData, variables) => {
        // Invalidate the list of formations
        queryClient.invalidateQueries(['formations']);
        // Invalidate the specific formation query to refetch its details
        queryClient.invalidateQueries(['formation', variables.id]);
        // Optionally, directly update the cache for this specific formation
        // queryClient.setQueryData(['formation', variables.id], updatedFormationData);

        // TODO: Implement success notification
        console.log(`Formation ${variables.id} updated successfully:`, updatedFormationData);
      },
      onError: (error: Error, variables) => {
        // TODO: Implement error notification
        console.error(`Error updating formation ${variables.id}:`, error.message);
      },
    }
  );
};

// Hook for Deleting a Formation
export const useDeleteFormation = (): UseMutationResult<
  void, // Type of data returned by the mutationFn (deleteFormation returns void)
  Error, // Type of error
  string, // Type of variables passed to the mutate function (formationId)
  unknown // Type of context
> => {
  const queryClient = useQueryClient();
  const formationService = FormationService.getInstance();

  return useMutation<void, Error, string>(
    async (formationId: string) => {
      return formationService.deleteFormation(formationId);
    },
    {
      onSuccess: (data, formationId) => {
        // Invalidate the list of formations
        queryClient.invalidateQueries(['formations']);
        // Remove the specific formation query from cache as it no longer exists
        queryClient.removeQueries(['formation', formationId]);

        // TODO: Implement success notification
        console.log(`Formation ${formationId} deleted successfully.`);
      },
      onError: (error: Error, formationId) => {
        // TODO: Implement error notification
        console.error(`Error deleting formation ${formationId}:`, error.message);
      },
    }
  );
};
```
