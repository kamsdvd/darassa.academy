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

// --- Helper: Mapper function (Simplified Placeholder) ---
const mapBackendFormationToFrontend = (backendFormation: any): Formation => {
  // This is a simplified placeholder. Detailed mapping is complex and needed here.
  return {
    id: backendFormation._id || backendFormation.id,
    title: backendFormation.titre || 'N/A',
    description: backendFormation.description || 'N/A',
    imageUrl: backendFormation.imageUrl || (backendFormation.documents?.[0]?.url) || '/default-formation-image.png',
    duration: `${backendFormation.duree || 0} heures`,
    price: backendFormation.prix || 0,
    category: backendFormation.categoryFromLogic || 'N/A', // Placeholder; 'category' is not directly on IFormation
    instructor: {
      name: backendFormation.formateurs?.[0]?.firstName ? `${backendFormation.formateurs[0].firstName} ${backendFormation.formateurs[0].lastName}`.trim() : 'Instructeur inconnu',
      title: 'Formateur', // Placeholder
      avatar: backendFormation.formateurs?.[0]?.profilePicture || '/default-avatar.png', // Placeholder
    },
    level: 'Débutant', // Needs proper mapping from backendFormation.niveau (e.g., 'debutant' -> 'Débutant')
    language: 'Français', // Placeholder; 'language' is not on IFormation
    prerequisites: backendFormation.prerequis || [],
    objectives: backendFormation.objectifs || [],
    syllabus: backendFormation.modules?.map((mod: any) => ({ title: mod.titre, content: mod.contenu || [] })) || [],
    rating: backendFormation.averageRating || 0, // Placeholder; needs calculation or backend field
    reviews: backendFormation.reviewCount || 0, // Placeholder
    enrolledStudents: backendFormation.inscriptions?.length || 0,
    lastUpdated: backendFormation.updatedAt ? new Date(backendFormation.updatedAt).toLocaleDateString() : new Date().toLocaleDateString(),
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

// TODO: Add hooks for mutations (create, update, delete) using useMutation.
// These would call FormationService methods and handle cache invalidation.
// Example: queryClient.invalidateQueries(['formations']) after a successful mutation.
```
