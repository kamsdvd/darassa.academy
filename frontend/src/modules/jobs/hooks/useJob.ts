import { useState, useCallback } from 'react';
import { jobService } from '../services/job.service';
import {
  Job,
  JobStatus,
  JobApplication,
  ApplicationStatus,
  Interview,
  InterviewStatus,
  JobState
} from '../types/job.types';

export const useJob = () => {
  const [state, setState] = useState<JobState>({
    jobs: [],
    currentJob: null,
    loading: false,
    error: null
  });

  // Offres d'emploi
  const loadJobs = useCallback(async (params?: {
    status?: JobStatus;
    type?: string;
    location?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const jobs = await jobService.getJobs(params);
      setState(prev => ({ ...prev, jobs, loading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
    }
  }, []);

  const loadJob = useCallback(async (jobId: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const job = await jobService.getJobById(jobId);
      setState(prev => ({ ...prev, currentJob: job, loading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
    }
  }, []);

  const createJob = useCallback(async (job: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const newJob = await jobService.createJob(job);
      setState(prev => ({
        ...prev,
        jobs: [...prev.jobs, newJob],
        loading: false
      }));
      return newJob;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  const updateJob = useCallback(async (jobId: string, job: Partial<Job>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const updatedJob = await jobService.updateJob(jobId, job);
      setState(prev => ({
        ...prev,
        jobs: prev.jobs.map(j => (j.id === jobId ? updatedJob : j)),
        currentJob: prev.currentJob?.id === jobId ? updatedJob : prev.currentJob,
        loading: false
      }));
      return updatedJob;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  const updateJobStatus = useCallback(async (jobId: string, status: JobStatus) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const updatedJob = await jobService.updateJobStatus(jobId, status);
      setState(prev => ({
        ...prev,
        jobs: prev.jobs.map(j => (j.id === jobId ? updatedJob : j)),
        currentJob: prev.currentJob?.id === jobId ? updatedJob : prev.currentJob,
        loading: false
      }));
      return updatedJob;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  // Candidatures
  const loadApplications = useCallback(async (jobId: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const applications = await jobService.getApplications(jobId);
      setState(prev => ({
        ...prev,
        currentJob: prev.currentJob
          ? { ...prev.currentJob, applications }
          : null,
        loading: false
      }));
      return applications;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  const createApplication = useCallback(async (jobId: string, application: Omit<JobApplication, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const newApplication = await jobService.createApplication(jobId, application);
      setState(prev => ({
        ...prev,
        currentJob: prev.currentJob
          ? {
              ...prev.currentJob,
              applications: [...(prev.currentJob.applications || []), newApplication]
            }
          : null,
        loading: false
      }));
      return newApplication;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  const updateApplication = useCallback(async (jobId: string, applicationId: string, application: Partial<JobApplication>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const updatedApplication = await jobService.updateApplication(jobId, applicationId, application);
      setState(prev => ({
        ...prev,
        currentJob: prev.currentJob
          ? {
              ...prev.currentJob,
              applications: prev.currentJob.applications?.map(a =>
                a.id === applicationId ? updatedApplication : a
              )
            }
          : null,
        loading: false
      }));
      return updatedApplication;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  const updateApplicationStatus = useCallback(async (jobId: string, applicationId: string, status: ApplicationStatus) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const updatedApplication = await jobService.updateApplicationStatus(jobId, applicationId, status);
      setState(prev => ({
        ...prev,
        currentJob: prev.currentJob
          ? {
              ...prev.currentJob,
              applications: prev.currentJob.applications?.map(a =>
                a.id === applicationId ? updatedApplication : a
              )
            }
          : null,
        loading: false
      }));
      return updatedApplication;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  // Entretiens
  const scheduleInterview = useCallback(async (jobId: string, applicationId: string, interview: Omit<Interview, 'id'>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const newInterview = await jobService.scheduleInterview(jobId, applicationId, interview);
      setState(prev => ({
        ...prev,
        currentJob: prev.currentJob
          ? {
              ...prev.currentJob,
              applications: prev.currentJob.applications?.map(a =>
                a.id === applicationId
                  ? { ...a, interview: newInterview }
                  : a
              )
            }
          : null,
        loading: false
      }));
      return newInterview;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  const updateInterview = useCallback(async (jobId: string, applicationId: string, interviewId: string, interview: Partial<Interview>) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const updatedInterview = await jobService.updateInterview(jobId, applicationId, interviewId, interview);
      setState(prev => ({
        ...prev,
        currentJob: prev.currentJob
          ? {
              ...prev.currentJob,
              applications: prev.currentJob.applications?.map(a =>
                a.id === applicationId
                  ? { ...a, interview: updatedInterview }
                  : a
              )
            }
          : null,
        loading: false
      }));
      return updatedInterview;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  const updateInterviewStatus = useCallback(async (jobId: string, applicationId: string, interviewId: string, status: InterviewStatus) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const updatedInterview = await jobService.updateInterviewStatus(jobId, applicationId, interviewId, status);
      setState(prev => ({
        ...prev,
        currentJob: prev.currentJob
          ? {
              ...prev.currentJob,
              applications: prev.currentJob.applications?.map(a =>
                a.id === applicationId
                  ? { ...a, interview: updatedInterview }
                  : a
              )
            }
          : null,
        loading: false
      }));
      return updatedInterview;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  // Documents
  const uploadDocument = useCallback(async (jobId: string, applicationId: string, file: File) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const result = await jobService.uploadDocument(jobId, applicationId, file);
      setState(prev => ({ ...prev, loading: false }));
      return result;
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Une erreur est survenue'
      }));
      throw error;
    }
  }, []);

  const deleteDocument = useCallback(async (jobId: string, applicationId: string, documentId: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      await jobService.deleteDocument(jobId, applicationId, documentId);
      setState(prev => ({
        ...prev,
        currentJob: prev.currentJob
          ? {
              ...prev.currentJob,
              applications: prev.currentJob.applications?.map(a =>
                a.id === applicationId
                  ? {
                      ...a,
                      documents: a.documents.filter(d => d.id !== documentId)
                    }
                  : a
              )
            }
          : null,
        loading: false
      }));
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
    loadJobs,
    loadJob,
    createJob,
    updateJob,
    updateJobStatus,
    loadApplications,
    createApplication,
    updateApplication,
    updateApplicationStatus,
    scheduleInterview,
    updateInterview,
    updateInterviewStatus,
    uploadDocument,
    deleteDocument
  };
}; 