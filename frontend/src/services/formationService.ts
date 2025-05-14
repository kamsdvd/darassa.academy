import axios from 'axios';
import { Formation } from '../types/formation';

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
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export class FormationService {
  private static instance: FormationService;
  private baseUrl = '/api/formations';

  private constructor() {}

  static getInstance(): FormationService {
    if (!FormationService.instance) {
      FormationService.instance = new FormationService();
    }
    return FormationService.instance;
  }

  async getFormations(params?: FormationParams): Promise<PaginatedResponse<Formation>> {
    const { data } = await axios.get(this.baseUrl, { params });
    return data;
  }

  async getFormationById(id: string): Promise<Formation> {
    const { data } = await axios.get(`${this.baseUrl}/${id}`);
    return data;
  }

  async createFormation(formationData: Partial<Formation>): Promise<Formation> {
    const { data } = await axios.post(this.baseUrl, formationData);
    return data;
  }

  async updateFormation(id: string, formationData: Partial<Formation>): Promise<Formation> {
    const { data } = await axios.put(`${this.baseUrl}/${id}`, formationData);
    return data;
  }

  async deleteFormation(id: string): Promise<void> {
    await axios.delete(`${this.baseUrl}/${id}`);
  }
} 