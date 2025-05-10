import axios from 'axios';
import {
  Enterprise,
  EnterpriseStatus,
  Employee,
  EmployeeStatus,
  Department,
  DepartmentStatus,
  Project,
  ProjectStatus,
  Partnership,
  PartnershipStatus,
  Agreement,
  AgreementStatus
} from '../types/enterprise.types';
import { authService } from '../../auth/services/auth.service';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

class EnterpriseService {
  private getAuthHeader() {
    const token = authService.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // Entreprises
  async getEnterprises(params?: {
    status?: EnterpriseStatus;
    type?: string;
    industry?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const response = await axios.get(`${API_URL}/enterprises`, {
      params,
      headers: this.getAuthHeader()
    });
    return response.data;
  }

  async getEnterpriseById(enterpriseId: string): Promise<Enterprise> {
    const response = await axios.get(`${API_URL}/enterprises/${enterpriseId}`, {
      headers: this.getAuthHeader()
    });
    return response.data;
  }

  async createEnterprise(enterprise: Omit<Enterprise, 'id' | 'createdAt' | 'updatedAt'>): Promise<Enterprise> {
    const response = await axios.post(`${API_URL}/enterprises`, enterprise, {
      headers: this.getAuthHeader()
    });
    return response.data;
  }

  async updateEnterprise(
    enterpriseId: string,
    enterprise: Partial<Enterprise>
  ): Promise<Enterprise> {
    const response = await axios.patch(`${API_URL}/enterprises/${enterpriseId}`, enterprise, {
      headers: this.getAuthHeader()
    });
    return response.data;
  }

  async updateEnterpriseStatus(
    enterpriseId: string,
    status: EnterpriseStatus
  ): Promise<Enterprise> {
    const response = await axios.patch(
      `${API_URL}/enterprises/${enterpriseId}/status`,
      { status },
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  // Employés
  async getEmployees(enterpriseId: string): Promise<Employee[]> {
    const response = await axios.get(`${API_URL}/enterprises/${enterpriseId}/employees`, {
      headers: this.getAuthHeader()
    });
    return response.data;
  }

  async addEmployee(
    enterpriseId: string,
    employee: Omit<Employee, 'id'>
  ): Promise<Employee> {
    const response = await axios.post(
      `${API_URL}/enterprises/${enterpriseId}/employees`,
      employee,
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  async updateEmployee(
    enterpriseId: string,
    employeeId: string,
    employee: Partial<Employee>
  ): Promise<Employee> {
    const response = await axios.patch(
      `${API_URL}/enterprises/${enterpriseId}/employees/${employeeId}`,
      employee,
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  async updateEmployeeStatus(
    enterpriseId: string,
    employeeId: string,
    status: EmployeeStatus
  ): Promise<Employee> {
    const response = await axios.patch(
      `${API_URL}/enterprises/${enterpriseId}/employees/${employeeId}/status`,
      { status },
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  // Départements
  async getDepartments(enterpriseId: string): Promise<Department[]> {
    const response = await axios.get(`${API_URL}/enterprises/${enterpriseId}/departments`, {
      headers: this.getAuthHeader()
    });
    return response.data;
  }

  async createDepartment(
    enterpriseId: string,
    department: Omit<Department, 'id'>
  ): Promise<Department> {
    const response = await axios.post(
      `${API_URL}/enterprises/${enterpriseId}/departments`,
      department,
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  async updateDepartment(
    enterpriseId: string,
    departmentId: string,
    department: Partial<Department>
  ): Promise<Department> {
    const response = await axios.patch(
      `${API_URL}/enterprises/${enterpriseId}/departments/${departmentId}`,
      department,
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  async updateDepartmentStatus(
    enterpriseId: string,
    departmentId: string,
    status: DepartmentStatus
  ): Promise<Department> {
    const response = await axios.patch(
      `${API_URL}/enterprises/${enterpriseId}/departments/${departmentId}/status`,
      { status },
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  // Projets
  async getProjects(enterpriseId: string): Promise<Project[]> {
    const response = await axios.get(`${API_URL}/enterprises/${enterpriseId}/projects`, {
      headers: this.getAuthHeader()
    });
    return response.data;
  }

  async createProject(
    enterpriseId: string,
    project: Omit<Project, 'id'>
  ): Promise<Project> {
    const response = await axios.post(
      `${API_URL}/enterprises/${enterpriseId}/projects`,
      project,
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  async updateProject(
    enterpriseId: string,
    projectId: string,
    project: Partial<Project>
  ): Promise<Project> {
    const response = await axios.patch(
      `${API_URL}/enterprises/${enterpriseId}/projects/${projectId}`,
      project,
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  async updateProjectStatus(
    enterpriseId: string,
    projectId: string,
    status: ProjectStatus
  ): Promise<Project> {
    const response = await axios.patch(
      `${API_URL}/enterprises/${enterpriseId}/projects/${projectId}/status`,
      { status },
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  // Partenariats
  async getPartnerships(enterpriseId: string): Promise<Partnership[]> {
    const response = await axios.get(`${API_URL}/enterprises/${enterpriseId}/partnerships`, {
      headers: this.getAuthHeader()
    });
    return response.data;
  }

  async createPartnership(
    enterpriseId: string,
    partnership: Omit<Partnership, 'id'>
  ): Promise<Partnership> {
    const response = await axios.post(
      `${API_URL}/enterprises/${enterpriseId}/partnerships`,
      partnership,
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  async updatePartnership(
    enterpriseId: string,
    partnershipId: string,
    partnership: Partial<Partnership>
  ): Promise<Partnership> {
    const response = await axios.patch(
      `${API_URL}/enterprises/${enterpriseId}/partnerships/${partnershipId}`,
      partnership,
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  async updatePartnershipStatus(
    enterpriseId: string,
    partnershipId: string,
    status: PartnershipStatus
  ): Promise<Partnership> {
    const response = await axios.patch(
      `${API_URL}/enterprises/${enterpriseId}/partnerships/${partnershipId}/status`,
      { status },
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  // Accords
  async getAgreements(enterpriseId: string, partnershipId: string): Promise<Agreement[]> {
    const response = await axios.get(
      `${API_URL}/enterprises/${enterpriseId}/partnerships/${partnershipId}/agreements`,
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  async createAgreement(
    enterpriseId: string,
    partnershipId: string,
    agreement: Omit<Agreement, 'id'>
  ): Promise<Agreement> {
    const response = await axios.post(
      `${API_URL}/enterprises/${enterpriseId}/partnerships/${partnershipId}/agreements`,
      agreement,
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  async updateAgreement(
    enterpriseId: string,
    partnershipId: string,
    agreementId: string,
    agreement: Partial<Agreement>
  ): Promise<Agreement> {
    const response = await axios.patch(
      `${API_URL}/enterprises/${enterpriseId}/partnerships/${partnershipId}/agreements/${agreementId}`,
      agreement,
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  async updateAgreementStatus(
    enterpriseId: string,
    partnershipId: string,
    agreementId: string,
    status: AgreementStatus
  ): Promise<Agreement> {
    const response = await axios.patch(
      `${API_URL}/enterprises/${enterpriseId}/partnerships/${partnershipId}/agreements/${agreementId}/status`,
      { status },
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }
}

export const enterpriseService = new EnterpriseService(); 