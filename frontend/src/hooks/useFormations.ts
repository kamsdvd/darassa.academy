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
    // category - Missing in IFormation
    formateurs, // Array, populated
    niveau, // enum
    // language - Missing in IFormation
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
    // competences - in IFormation, could map to 'features'
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
  const durationString = duree ? `${duree} heures` : 'Durée non spécifiée';

  // Instructor Logic
  let instructor = {
    name: 'Instructeur non assigné',
    title: 'Professionnel', // Placeholder
    avatar: '/default-avatar.png', // Placeholder
    // bio: 'Bio non disponible' // Placeholder
  };
  if (formateurs && formateurs.length > 0 && formateurs[0]) {
    const mainInstructor = formateurs[0];
    instructor.name = `${mainInstructor.firstName || ''} ${mainInstructor.lastName || ''}`.trim() || 'Instructeur non assigné';
    // instructor.title = mainInstructor.title || 'Professionnel'; // If 'title' existed on User model
    instructor.avatar = mainInstructor.profilePicture || '/default-avatar.png';
    // instructor.bio = mainInstructor.bio || 'Bio non disponible'; // If 'bio' existed
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
  const syllabus = modules?.map((mod: any) => ({
    title: mod.titre || 'Module sans titre',
    content: mod.contenu || [],
    // description: mod.description, (Could be added to frontend type if needed)
    // duration: mod.duree ? `${mod.duree}h` : undefined (Could be added)
  })) || [];

  // Rating and Reviews Logic
  let calculatedRating = 0;
  const reviewsCount = evaluations?.length || 0;
  if (reviewsCount > 0) {
    const totalRating = evaluations.reduce((sum: number, evalItem: any) => sum + (evalItem.note || 0), 0);
    calculatedRating = parseFloat((totalRating / reviewsCount).toFixed(1)); // Average rating to 1 decimal place
  }

  // Enrolled Students
  const enrolledStudentsCount = inscriptions?.length || 0;

  // Dates
  const lastUpdatedString = updatedAt ? new Date(updatedAt).toLocaleDateString('fr-FR') : 'Date inconnue';
  const startDateString = dateDebut ? new Date(dateDebut).toLocaleDateString('fr-FR') : undefined;
  const endDateString = dateFin ? new Date(dateFin).toLocaleDateString('fr-FR') : undefined;

  // Location
  // Could be 'En ligne' if centreFormation is null or specific field indicates online
  const locationString = centreFormation?.nom ? `${centreFormation.nom}${centreFormation.adresse ? `, ${centreFormation.adresse}` : ''}` : 'Lieu non spécifié / En ligne';

  // Status mapping (example)
  let statusString = statut;
  switch(statut?.toLowerCase()){
    case 'planifiee': statusString = 'Planifiée'; break;
    case 'en_cours': statusString = 'En cours'; break;
    case 'terminee': statusString = 'Terminée'; break;
    case 'annulee': statusString = 'Annulée'; break;
  }

  return {
    id: _id?.toString() || backendFormation.id || '', // Ensure ID is a string
    title: titre || 'Titre non disponible',
    description: description || 'Description non disponible',
    imageUrl: imageUrl,
    duration: durationString,
    price: prix || 0,
    category: backendFormation.category || 'Non catégorisée', // Placeholder - still needs backend source
    instructor: instructor,
    level: frontendLevel,
    language: backendFormation.language || 'Français', // Placeholder - needs backend source
    prerequisites: prerequis || [],
    objectives: objectifs || [],
    syllabus: syllabus,
    rating: calculatedRating,
    reviews: reviewsCount,
    enrolledStudents: enrolledStudentsCount,
    lastUpdated: lastUpdatedString,
    startDate: startDateString,
    endDate: endDateString,
    location: locationString,
    maxStudents: placesDisponibles, // Assumes placesDisponibles is what's meant by maxStudents
    status: statusString,
    // features: backendFormation.competences || [], // Example if using competences as features
  };
};
// --- End Helper: Mapper function ---

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
