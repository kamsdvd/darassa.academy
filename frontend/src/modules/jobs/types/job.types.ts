export interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  location: string;
  type: JobType;
  status: JobStatus;
  experience: ExperienceLevel;
  education: EducationLevel;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  benefits: string[];
  skills: string[];
  department: string;
  enterprise: string; // Enterprise ID
  applications: JobApplication[];
  createdAt: string;
  updatedAt: string;
  deadline: string;
  startDate?: string;
}

export enum JobType {
  FULL_TIME = 'FULL_TIME',
  PART_TIME = 'PART_TIME',
  CONTRACT = 'CONTRACT',
  INTERNSHIP = 'INTERNSHIP',
  FREELANCE = 'FREELANCE',
  TEMPORARY = 'TEMPORARY'
}

export enum JobStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  CLOSED = 'CLOSED',
  ON_HOLD = 'ON_HOLD'
}

export enum ExperienceLevel {
  ENTRY = 'ENTRY',
  JUNIOR = 'JUNIOR',
  MID_LEVEL = 'MID_LEVEL',
  SENIOR = 'SENIOR',
  EXPERT = 'EXPERT'
}

export enum EducationLevel {
  HIGH_SCHOOL = 'HIGH_SCHOOL',
  ASSOCIATE = 'ASSOCIATE',
  BACHELOR = 'BACHELOR',
  MASTER = 'MASTER',
  DOCTORATE = 'DOCTORATE',
  NONE = 'NONE'
}

export interface JobApplication {
  id: string;
  jobId: string;
  candidateId: string;
  status: ApplicationStatus;
  coverLetter: string;
  resume: string;
  documents: Document[];
  interview?: Interview;
  createdAt: string;
  updatedAt: string;
}

export enum ApplicationStatus {
  PENDING = 'PENDING',
  REVIEWING = 'REVIEWING',
  SHORTLISTED = 'SHORTLISTED',
  INTERVIEWED = 'INTERVIEWED',
  OFFERED = 'OFFERED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  WITHDRAWN = 'WITHDRAWN'
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: string;
}

export interface Interview {
  id: string;
  applicationId: string;
  type: InterviewType;
  status: InterviewStatus;
  scheduledAt: string;
  duration: number; // in minutes
  location?: string;
  notes?: string;
  feedback?: string;
  interviewers: string[]; // Employee IDs
}

export enum InterviewType {
  PHONE = 'PHONE',
  VIDEO = 'VIDEO',
  IN_PERSON = 'IN_PERSON',
  TECHNICAL = 'TECHNICAL',
  HR = 'HR'
}

export enum InterviewStatus {
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  RESCHEDULED = 'RESCHEDULED'
}

export interface JobState {
  jobs: Job[];
  currentJob: Job | null;
  loading: boolean;
  error: string | null;
} 