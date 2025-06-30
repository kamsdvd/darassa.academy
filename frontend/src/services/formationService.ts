import axios from 'axios';
import { Formation } from '../types/formation';
import { API_CONFIG } from '../config/api.config.ts';

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
    const backendData = response.data; // Assuming this is { success: boolean, data: IFormation[], pagination: { page, limit, total, pages } }

    // Placeholder for mapping - actual mapping logic is more complex
    const mappedData: Formation[] = backendData.data.map((item: any) => ({
      ...item, // Spread raw item
      id: item._id, // Example: map _id to id
      // TODO: Add full mapping for all fields from IFormation to frontend Formation
    }));

    return {
      data: mappedData, // This should be mapped to frontend Formation[]
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

    // Placeholder for mapping
    const mappedData: Formation = {
      ...backendData.data, // Spread raw item
      id: backendData.data._id,
      // TODO: Add full mapping
    };
    return mappedData;
  }

  async createFormation(formationData: Partial<Formation>): Promise<Formation> {
    // Note: formationData is Partial<frontend Formation>. May need mapping before sending to backend.
    // Backend will return IFormation. Mapping to frontend Formation type will be needed.
    const { data } = await axios.post(this.coursesBaseUrl, formationData);
    // TODO: Map response data.data to frontend Formation
    return data.data;
  }

  async updateFormation(id: string, formationData: Partial<Formation>): Promise<Formation> {
    // Note: formationData is Partial<frontend Formation>. May need mapping.
    // Backend will return IFormation. Mapping to frontend Formation type will be needed.
    const { data } = await axios.put(`${this.coursesBaseUrl}/${id}`, formationData);
    // TODO: Map response data.data to frontend Formation
    return data.data;
  }

  async deleteFormation(id: string): Promise<void> {
    await axios.delete(`${this.coursesBaseUrl}/${id}`);
  }
} 