export interface Enterprise {
  id: string;
  name: string;
  description: string;
  logo: string;
  industry: string;
  size: EnterpriseSize;
  type: EnterpriseType;
  status: EnterpriseStatus;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  contact: {
    email: string;
    phone: string;
    website: string;
  };
  socialMedia: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  employees: Employee[];
  departments: Department[];
  projects: Project[];
  partnerships: Partnership[];
  createdAt: string;
  updatedAt: string;
}

export enum EnterpriseSize {
  MICRO = 'MICRO', // 1-9 employés
  SMALL = 'SMALL', // 10-49 employés
  MEDIUM = 'MEDIUM', // 50-249 employés
  LARGE = 'LARGE', // 250+ employés
}

export enum EnterpriseType {
  STARTUP = 'STARTUP',
  SME = 'SME',
  CORPORATION = 'CORPORATION',
  NON_PROFIT = 'NON_PROFIT',
  GOVERNMENT = 'GOVERNMENT',
  EDUCATIONAL = 'EDUCATIONAL',
}

export enum EnterpriseStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PENDING = 'PENDING',
  SUSPENDED = 'SUSPENDED',
}

export interface Employee {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  role: EmployeeRole;
  status: EmployeeStatus;
  startDate: string;
  endDate?: string;
  skills: string[];
  certifications: Certification[];
}

export enum EmployeeRole {
  ADMINISTRATOR = 'ADMINISTRATOR',
  MANAGER = 'MANAGER',
  SUPERVISOR = 'SUPERVISOR',
  STAFF = 'STAFF',
  INTERN = 'INTERN',
}

export enum EmployeeStatus {
  ACTIVE = 'ACTIVE',
  ON_LEAVE = 'ON_LEAVE',
  TERMINATED = 'TERMINATED',
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface Department {
  id: string;
  name: string;
  description: string;
  manager: string; // Employee ID
  employees: string[]; // Employee IDs
  budget?: number;
  status: DepartmentStatus;
}

export enum DepartmentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  MERGED = 'MERGED',
  SPLIT = 'SPLIT',
}

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  status: ProjectStatus;
  budget: number;
  manager: string; // Employee ID
  team: string[]; // Employee IDs
  departments: string[]; // Department IDs
  milestones: Milestone[];
  risks: Risk[];
}

export enum ProjectStatus {
  PLANNING = 'PLANNING',
  IN_PROGRESS = 'IN_PROGRESS',
  ON_HOLD = 'ON_HOLD',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  status: MilestoneStatus;
  deliverables: Deliverable[];
}

export enum MilestoneStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  DELAYED = 'DELAYED',
}

export interface Deliverable {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  status: DeliverableStatus;
  assignedTo: string; // Employee ID
}

export enum DeliverableStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  COMPLETED = 'COMPLETED',
}

export interface Risk {
  id: string;
  name: string;
  description: string;
  impact: RiskImpact;
  probability: RiskProbability;
  status: RiskStatus;
  mitigationPlan?: string;
  assignedTo: string; // Employee ID
}

export enum RiskImpact {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum RiskProbability {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

export enum RiskStatus {
  IDENTIFIED = 'IDENTIFIED',
  ANALYZED = 'ANALYZED',
  MITIGATED = 'MITIGATED',
  ACCEPTED = 'ACCEPTED',
}

export interface Partnership {
  id: string;
  name: string;
  description: string;
  type: PartnershipType;
  status: PartnershipStatus;
  startDate: string;
  endDate?: string;
  partnerEnterprise: string; // Enterprise ID
  contactPerson: string; // Employee ID
  agreements: Agreement[];
}

export enum PartnershipType {
  STRATEGIC = 'STRATEGIC',
  TECHNICAL = 'TECHNICAL',
  MARKETING = 'MARKETING',
  RESEARCH = 'RESEARCH',
  TRAINING = 'TRAINING',
}

export enum PartnershipStatus {
  PROPOSED = 'PROPOSED',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  TERMINATED = 'TERMINATED',
}

export interface Agreement {
  id: string;
  name: string;
  description: string;
  type: AgreementType;
  status: AgreementStatus;
  startDate: string;
  endDate?: string;
  documentUrl?: string;
}

export enum AgreementType {
  NDA = 'NDA',
  MOU = 'MOU',
  CONTRACT = 'CONTRACT',
  LICENSE = 'LICENSE',
}

export enum AgreementStatus {
  DRAFT = 'DRAFT',
  REVIEW = 'REVIEW',
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  TERMINATED = 'TERMINATED',
}

export interface EnterpriseState {
  enterprises: Enterprise[];
  currentEnterprise: Enterprise | null;
  isLoading: boolean;
  error: string | null;
} 