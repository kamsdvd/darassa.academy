import axios from 'axios';
import { Formation } from '../types/formation';
import { API_CONFIG } from '../config/api.config.ts';
import { mapFrontendFormationToBackendPayload, mapBackendFormationToFrontend } from '../hooks/useFormations.ts'; // Import mappers

interface FormationParams {
  category?: string;
  level?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

interface PaginatedResponse<T> {
  data: T[];
  // Frontend expected pagination structure
  meta?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
  // Backend actual pagination structure (as of current backend implementation)
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  }
}

export class FormationService {
  private static instance: FormationService;
  // private baseUrl = '/api/formations'; // Old base URL
  private coursesBaseUrl = `${API_CONFIG.BASE_URL}/courses`; // Corrected base URL

  private constructor() {}

  static getInstance(): FormationService {
    if (!FormationService.instance) {
      FormationService.instance = new FormationService();
    }
    return FormationService.instance;
  }

  async getFormations(params?: FormationParams): Promise<PaginatedResponse<Formation>> {
    // Note: The backend returns IFormation[] and a specific pagination structure.
    // Mapping to frontend Formation type and PaginatedResponse structure (with meta)
    // will be needed, likely in a React Query hook using this service.
    const response = await axios.get(this.coursesBaseUrl, { params });
    const backendData = response.data;

    // Use the detailed mapper for each item
    const mappedData: Formation[] = backendData.data.map(mapBackendFormationToFrontend);

    return {
      data: mappedData,
      // Map backend pagination to frontend meta structure
      meta: {
        currentPage: backendData.pagination.page,
        totalPages: backendData.pagination.pages,
        totalItems: backendData.pagination.total,
        itemsPerPage: backendData.pagination.limit,
      },
    };
  }

  async getFormationById(id: string): Promise<Formation> {
    // Note: The backend returns IFormation.
    // Mapping to frontend Formation type will be needed.
    const response = await axios.get(`${this.coursesBaseUrl}/${id}`);
    const backendData = response.data; // Assuming this is { success: boolean, data: IFormation }

    // Use the detailed mapper
    return mapBackendFormationToFrontend(backendData.data);
  }

  async createFormation(formationData: Partial<Formation>): Promise<Formation> {
    const backendPayload = mapFrontendFormationToBackendPayload(formationData);
    const response = await axios.post(this.coursesBaseUrl, backendPayload);
    // Map the backend response (which should be IFormation-like) back to frontend Formation type
    return mapBackendFormationToFrontend(response.data.data);
  }

  async updateFormation(id: string, formationData: Partial<Formation>): Promise<Formation> {
    const backendPayload = mapFrontendFormationToBackendPayload(formationData);
    const response = await axios.put(`${this.coursesBaseUrl}/${id}`, backendPayload);
    // Map the backend response back to frontend Formation type
    return mapBackendFormationToFrontend(response.data.data);
  }

  async deleteFormation(id: string): Promise<void> {
    await axios.delete(`${this.coursesBaseUrl}/${id}`);
  }
} 