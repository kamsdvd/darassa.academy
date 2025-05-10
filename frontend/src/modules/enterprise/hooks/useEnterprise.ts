import { useState, useCallback } from 'react';
import { enterpriseService } from '../services/enterprise.service';
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
  AgreementStatus,
  EnterpriseState
} from '../types/enterprise.types';

export const useEnterprise = () => {
  const [state, setState] = useState<EnterpriseState>({
    enterprises: [],
    currentEnterprise: null,
    loading: false,
    error: null
  });

  // Entreprises
  const loadEnterprises = useCallback(async (params?: {
    status?: EnterpriseStatus;
    type?: string;
    industry?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const enterprises = await enterpriseService.getEnterprises(params);
      setState(prev => ({ ...prev, enterprises, loading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
    }
  }, []);

  const loadEnterprise = useCallback(async (enterpriseId: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const enterprise = await enterpriseService.getEnterpriseById(enterpriseId);
      setState(prev => ({ ...prev, currentEnterprise: enterprise, loading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
    }
  }, []);

  const createEnterprise = useCallback(async (enterprise: Omit<Enterprise, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const newEnterprise = await enterpriseService.createEnterprise(enterprise);
      setState(prev => ({
        ...prev,
        enterprises: [...prev.enterprises, newEnterprise],
        loading: false
      }));
      return newEnterprise;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  const updateEnterprise = useCallback(async (enterpriseId: string, enterprise: Partial<Enterprise>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const updatedEnterprise = await enterpriseService.updateEnterprise(enterpriseId, enterprise);
      setState(prev => ({
        ...prev,
        enterprises: prev.enterprises.map(e => (e.id === enterpriseId ? updatedEnterprise : e)),
        currentEnterprise: prev.currentEnterprise?.id === enterpriseId ? updatedEnterprise : prev.currentEnterprise,
        loading: false
      }));
      return updatedEnterprise;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  const updateEnterpriseStatus = useCallback(async (enterpriseId: string, status: EnterpriseStatus) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const updatedEnterprise = await enterpriseService.updateEnterpriseStatus(enterpriseId, status);
      setState(prev => ({
        ...prev,
        enterprises: prev.enterprises.map(e => (e.id === enterpriseId ? updatedEnterprise : e)),
        currentEnterprise: prev.currentEnterprise?.id === enterpriseId ? updatedEnterprise : prev.currentEnterprise,
        loading: false
      }));
      return updatedEnterprise;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  // Employés
  const loadEmployees = useCallback(async (enterpriseId: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const employees = await enterpriseService.getEmployees(enterpriseId);
      setState(prev => ({
        ...prev,
        currentEnterprise: prev.currentEnterprise
          ? { ...prev.currentEnterprise, employees }
          : null,
        loading: false
      }));
      return employees;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  const addEmployee = useCallback(async (enterpriseId: string, employee: Omit<Employee, 'id'>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const newEmployee = await enterpriseService.addEmployee(enterpriseId, employee);
      setState(prev => ({
        ...prev,
        currentEnterprise: prev.currentEnterprise
          ? {
              ...prev.currentEnterprise,
              employees: [...(prev.currentEnterprise.employees || []), newEmployee]
            }
          : null,
        loading: false
      }));
      return newEmployee;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  const updateEmployee = useCallback(async (enterpriseId: string, employeeId: string, employee: Partial<Employee>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const updatedEmployee = await enterpriseService.updateEmployee(enterpriseId, employeeId, employee);
      setState(prev => ({
        ...prev,
        currentEnterprise: prev.currentEnterprise
          ? {
              ...prev.currentEnterprise,
              employees: prev.currentEnterprise.employees?.map(e =>
                e.id === employeeId ? updatedEmployee : e
              )
            }
          : null,
        loading: false
      }));
      return updatedEmployee;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  const updateEmployeeStatus = useCallback(async (enterpriseId: string, employeeId: string, status: EmployeeStatus) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const updatedEmployee = await enterpriseService.updateEmployeeStatus(enterpriseId, employeeId, status);
      setState(prev => ({
        ...prev,
        currentEnterprise: prev.currentEnterprise
          ? {
              ...prev.currentEnterprise,
              employees: prev.currentEnterprise.employees?.map(e =>
                e.id === employeeId ? updatedEmployee : e
              )
            }
          : null,
        loading: false
      }));
      return updatedEmployee;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  // Départements
  const loadDepartments = useCallback(async (enterpriseId: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const departments = await enterpriseService.getDepartments(enterpriseId);
      setState(prev => ({
        ...prev,
        currentEnterprise: prev.currentEnterprise
          ? { ...prev.currentEnterprise, departments }
          : null,
        loading: false
      }));
      return departments;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  const createDepartment = useCallback(async (enterpriseId: string, department: Omit<Department, 'id'>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const newDepartment = await enterpriseService.createDepartment(enterpriseId, department);
      setState(prev => ({
        ...prev,
        currentEnterprise: prev.currentEnterprise
          ? {
              ...prev.currentEnterprise,
              departments: [...(prev.currentEnterprise.departments || []), newDepartment]
            }
          : null,
        loading: false
      }));
      return newDepartment;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  const updateDepartment = useCallback(async (enterpriseId: string, departmentId: string, department: Partial<Department>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const updatedDepartment = await enterpriseService.updateDepartment(enterpriseId, departmentId, department);
      setState(prev => ({
        ...prev,
        currentEnterprise: prev.currentEnterprise
          ? {
              ...prev.currentEnterprise,
              departments: prev.currentEnterprise.departments?.map(d =>
                d.id === departmentId ? updatedDepartment : d
              )
            }
          : null,
        loading: false
      }));
      return updatedDepartment;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  const updateDepartmentStatus = useCallback(async (enterpriseId: string, departmentId: string, status: DepartmentStatus) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const updatedDepartment = await enterpriseService.updateDepartmentStatus(enterpriseId, departmentId, status);
      setState(prev => ({
        ...prev,
        currentEnterprise: prev.currentEnterprise
          ? {
              ...prev.currentEnterprise,
              departments: prev.currentEnterprise.departments?.map(d =>
                d.id === departmentId ? updatedDepartment : d
              )
            }
          : null,
        loading: false
      }));
      return updatedDepartment;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  // Projets
  const loadProjects = useCallback(async (enterpriseId: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const projects = await enterpriseService.getProjects(enterpriseId);
      setState(prev => ({
        ...prev,
        currentEnterprise: prev.currentEnterprise
          ? { ...prev.currentEnterprise, projects }
          : null,
        loading: false
      }));
      return projects;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  const createProject = useCallback(async (enterpriseId: string, project: Omit<Project, 'id'>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const newProject = await enterpriseService.createProject(enterpriseId, project);
      setState(prev => ({
        ...prev,
        currentEnterprise: prev.currentEnterprise
          ? {
              ...prev.currentEnterprise,
              projects: [...(prev.currentEnterprise.projects || []), newProject]
            }
          : null,
        loading: false
      }));
      return newProject;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  const updateProject = useCallback(async (enterpriseId: string, projectId: string, project: Partial<Project>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const updatedProject = await enterpriseService.updateProject(enterpriseId, projectId, project);
      setState(prev => ({
        ...prev,
        currentEnterprise: prev.currentEnterprise
          ? {
              ...prev.currentEnterprise,
              projects: prev.currentEnterprise.projects?.map(p =>
                p.id === projectId ? updatedProject : p
              )
            }
          : null,
        loading: false
      }));
      return updatedProject;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  const updateProjectStatus = useCallback(async (enterpriseId: string, projectId: string, status: ProjectStatus) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const updatedProject = await enterpriseService.updateProjectStatus(enterpriseId, projectId, status);
      setState(prev => ({
        ...prev,
        currentEnterprise: prev.currentEnterprise
          ? {
              ...prev.currentEnterprise,
              projects: prev.currentEnterprise.projects?.map(p =>
                p.id === projectId ? updatedProject : p
              )
            }
          : null,
        loading: false
      }));
      return updatedProject;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  // Partenariats
  const loadPartnerships = useCallback(async (enterpriseId: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const partnerships = await enterpriseService.getPartnerships(enterpriseId);
      setState(prev => ({
        ...prev,
        currentEnterprise: prev.currentEnterprise
          ? { ...prev.currentEnterprise, partnerships }
          : null,
        loading: false
      }));
      return partnerships;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  const createPartnership = useCallback(async (enterpriseId: string, partnership: Omit<Partnership, 'id'>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const newPartnership = await enterpriseService.createPartnership(enterpriseId, partnership);
      setState(prev => ({
        ...prev,
        currentEnterprise: prev.currentEnterprise
          ? {
              ...prev.currentEnterprise,
              partnerships: [...(prev.currentEnterprise.partnerships || []), newPartnership]
            }
          : null,
        loading: false
      }));
      return newPartnership;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  const updatePartnership = useCallback(async (enterpriseId: string, partnershipId: string, partnership: Partial<Partnership>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const updatedPartnership = await enterpriseService.updatePartnership(enterpriseId, partnershipId, partnership);
      setState(prev => ({
        ...prev,
        currentEnterprise: prev.currentEnterprise
          ? {
              ...prev.currentEnterprise,
              partnerships: prev.currentEnterprise.partnerships?.map(p =>
                p.id === partnershipId ? updatedPartnership : p
              )
            }
          : null,
        loading: false
      }));
      return updatedPartnership;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  const updatePartnershipStatus = useCallback(async (enterpriseId: string, partnershipId: string, status: PartnershipStatus) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const updatedPartnership = await enterpriseService.updatePartnershipStatus(enterpriseId, partnershipId, status);
      setState(prev => ({
        ...prev,
        currentEnterprise: prev.currentEnterprise
          ? {
              ...prev.currentEnterprise,
              partnerships: prev.currentEnterprise.partnerships?.map(p =>
                p.id === partnershipId ? updatedPartnership : p
              )
            }
          : null,
        loading: false
      }));
      return updatedPartnership;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  // Accords
  const loadAgreements = useCallback(async (enterpriseId: string, partnershipId: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const agreements = await enterpriseService.getAgreements(enterpriseId, partnershipId);
      setState(prev => ({
        ...prev,
        currentEnterprise: prev.currentEnterprise
          ? {
              ...prev.currentEnterprise,
              partnerships: prev.currentEnterprise.partnerships?.map(p =>
                p.id === partnershipId ? { ...p, agreements } : p
              )
            }
          : null,
        loading: false
      }));
      return agreements;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  const createAgreement = useCallback(async (enterpriseId: string, partnershipId: string, agreement: Omit<Agreement, 'id'>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const newAgreement = await enterpriseService.createAgreement(enterpriseId, partnershipId, agreement);
      setState(prev => ({
        ...prev,
        currentEnterprise: prev.currentEnterprise
          ? {
              ...prev.currentEnterprise,
              partnerships: prev.currentEnterprise.partnerships?.map(p =>
                p.id === partnershipId
                  ? {
                      ...p,
                      agreements: [...(p.agreements || []), newAgreement]
                    }
                  : p
              )
            }
          : null,
        loading: false
      }));
      return newAgreement;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  const updateAgreement = useCallback(async (enterpriseId: string, partnershipId: string, agreementId: string, agreement: Partial<Agreement>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const updatedAgreement = await enterpriseService.updateAgreement(enterpriseId, partnershipId, agreementId, agreement);
      setState(prev => ({
        ...prev,
        currentEnterprise: prev.currentEnterprise
          ? {
              ...prev.currentEnterprise,
              partnerships: prev.currentEnterprise.partnerships?.map(p =>
                p.id === partnershipId
                  ? {
                      ...p,
                      agreements: p.agreements?.map(a =>
                        a.id === agreementId ? updatedAgreement : a
                      )
                    }
                  : p
              )
            }
          : null,
        loading: false
      }));
      return updatedAgreement;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  const updateAgreementStatus = useCallback(async (enterpriseId: string, partnershipId: string, agreementId: string, status: AgreementStatus) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const updatedAgreement = await enterpriseService.updateAgreementStatus(enterpriseId, partnershipId, agreementId, status);
      setState(prev => ({
        ...prev,
        currentEnterprise: prev.currentEnterprise
          ? {
              ...prev.currentEnterprise,
              partnerships: prev.currentEnterprise.partnerships?.map(p =>
                p.id === partnershipId
                  ? {
                      ...p,
                      agreements: p.agreements?.map(a =>
                        a.id === agreementId ? updatedAgreement : a
                      )
                    }
                  : p
              )
            }
          : null,
        loading: false
      }));
      return updatedAgreement;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  return {
    ...state,
    loadEnterprises,
    loadEnterprise,
    createEnterprise,
    updateEnterprise,
    updateEnterpriseStatus,
    loadEmployees,
    addEmployee,
    updateEmployee,
    updateEmployeeStatus,
    loadDepartments,
    createDepartment,
    updateDepartment,
    updateDepartmentStatus,
    loadProjects,
    createProject,
    updateProject,
    updateProjectStatus,
    loadPartnerships,
    createPartnership,
    updatePartnership,
    updatePartnershipStatus,
    loadAgreements,
    createAgreement,
    updateAgreement,
    updateAgreementStatus
  };
}; 