import axios from 'axios';
import {
  Job,
  JobStatus,
  JobApplication,
  ApplicationStatus,
  Interview,
  InterviewStatus
} from '../types/job.types';
import { authService } from '../../auth/services/auth.service';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

class JobService {
  private getAuthHeader() {
    const token = authService.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // Offres d'emploi
  async getJobs(params?: {
    status?: JobStatus;
    type?: string;
    location?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const response = await axios.get(`${API_URL}/jobs`, {
      params,
      headers: this.getAuthHeader()
    });
    return response.data;
  }

  async getJobById(jobId: string): Promise<Job> {
    const response = await axios.get(`${API_URL}/jobs/${jobId}`, {
      headers: this.getAuthHeader()
    });
    return response.data;
  }

  async createJob(job: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>): Promise<Job> {
    const response = await axios.post(`${API_URL}/jobs`, job, {
      headers: this.getAuthHeader()
    });
    return response.data;
  }

  async updateJob(jobId: string, job: Partial<Job>): Promise<Job> {
    const response = await axios.patch(`${API_URL}/jobs/${jobId}`, job, {
      headers: this.getAuthHeader()
    });
    return response.data;
  }

  async updateJobStatus(jobId: string, status: JobStatus): Promise<Job> {
    const response = await axios.patch(
      `${API_URL}/jobs/${jobId}/status`,
      { status },
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  // Candidatures
  async getApplications(jobId: string): Promise<JobApplication[]> {
    const response = await axios.get(`${API_URL}/jobs/${jobId}/applications`, {
      headers: this.getAuthHeader()
    });
    return response.data;
  }

  async getApplicationById(jobId: string, applicationId: string): Promise<JobApplication> {
    const response = await axios.get(
      `${API_URL}/jobs/${jobId}/applications/${applicationId}`,
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  async createApplication(
    jobId: string,
    application: Omit<JobApplication, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<JobApplication> {
    const response = await axios.post(
      `${API_URL}/jobs/${jobId}/applications`,
      application,
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  async updateApplication(
    jobId: string,
    applicationId: string,
    application: Partial<JobApplication>
  ): Promise<JobApplication> {
    const response = await axios.patch(
      `${API_URL}/jobs/${jobId}/applications/${applicationId}`,
      application,
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  async updateApplicationStatus(
    jobId: string,
    applicationId: string,
    status: ApplicationStatus
  ): Promise<JobApplication> {
    const response = await axios.patch(
      `${API_URL}/jobs/${jobId}/applications/${applicationId}/status`,
      { status },
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  // Entretiens
  async scheduleInterview(
    jobId: string,
    applicationId: string,
    interview: Omit<Interview, 'id'>
  ): Promise<Interview> {
    const response = await axios.post(
      `${API_URL}/jobs/${jobId}/applications/${applicationId}/interview`,
      interview,
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  async updateInterview(
    jobId: string,
    applicationId: string,
    interviewId: string,
    interview: Partial<Interview>
  ): Promise<Interview> {
    const response = await axios.patch(
      `${API_URL}/jobs/${jobId}/applications/${applicationId}/interview/${interviewId}`,
      interview,
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  async updateInterviewStatus(
    jobId: string,
    applicationId: string,
    interviewId: string,
    status: InterviewStatus
  ): Promise<Interview> {
    const response = await axios.patch(
      `${API_URL}/jobs/${jobId}/applications/${applicationId}/interview/${interviewId}/status`,
      { status },
      {
        headers: this.getAuthHeader()
      }
    );
    return response.data;
  }

  // Documents
  async uploadDocument(
    jobId: string,
    applicationId: string,
    file: File
  ): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(
      `${API_URL}/jobs/${jobId}/applications/${applicationId}/documents`,
      formData,
      {
        headers: {
          ...this.getAuthHeader(),
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return response.data;
  }

  async deleteDocument(
    jobId: string,
    applicationId: string,
    documentId: string
  ): Promise<void> {
    await axios.delete(
      `${API_URL}/jobs/${jobId}/applications/${applicationId}/documents/${documentId}`,
      {
        headers: this.getAuthHeader()
      }
    );
  }
}

export const jobService = new JobService(); 