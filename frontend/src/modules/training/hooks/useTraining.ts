import { useState, useEffect } from 'react';
import { trainingService } from '../services/training.service';
import {
  Course,
  CourseEnrollment,
  CourseReview,
  CourseState,
  EnrollmentStatus
} from '../types/training.types';

export const useTraining = () => {
  const [state, setState] = useState<CourseState>({
    courses: [],
    currentCourse: null,
    enrollments: [],
    reviews: [],
    isLoading: true,
    error: null
  });

  // Charger les cours
  const loadCourses = async (params?: {
    category?: string;
    level?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const { courses } = await trainingService.getCourses(params);
      setState(prev => ({
        ...prev,
        courses,
        isLoading: false
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Une erreur est survenue'
      }));
    }
  };

  // Charger un cours spécifique
  const loadCourse = async (courseId: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const course = await trainingService.getCourseById(courseId);
      const reviews = await trainingService.getCourseReviews(courseId);
      setState(prev => ({
        ...prev,
        currentCourse: course,
        reviews,
        isLoading: false
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Une erreur est survenue'
      }));
    }
  };

  // Charger les inscriptions
  const loadEnrollments = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const enrollments = await trainingService.getEnrollments();
      setState(prev => ({
        ...prev,
        enrollments,
        isLoading: false
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Une erreur est survenue'
      }));
    }
  };

  // S'inscrire à un cours
  const enrollInCourse = async (courseId: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const enrollment = await trainingService.enrollInCourse(courseId);
      setState(prev => ({
        ...prev,
        enrollments: [...prev.enrollments, enrollment],
        isLoading: false
      }));
      return enrollment;
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Une erreur est survenue'
      }));
      throw err;
    }
  };

  // Mettre à jour le statut d'une inscription
  const updateEnrollmentStatus = async (
    enrollmentId: string,
    status: EnrollmentStatus
  ) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const updatedEnrollment = await trainingService.updateEnrollmentStatus(
        enrollmentId,
        status
      );
      setState(prev => ({
        ...prev,
        enrollments: prev.enrollments.map(e =>
          e.id === enrollmentId ? updatedEnrollment : e
        ),
        isLoading: false
      }));
      return updatedEnrollment;
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Une erreur est survenue'
      }));
      throw err;
    }
  };

  // Mettre à jour la progression
  const updateProgress = async (enrollmentId: string, progress: number) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const updatedEnrollment = await trainingService.updateProgress(
        enrollmentId,
        progress
      );
      setState(prev => ({
        ...prev,
        enrollments: prev.enrollments.map(e =>
          e.id === enrollmentId ? updatedEnrollment : e
        ),
        isLoading: false
      }));
      return updatedEnrollment;
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Une erreur est survenue'
      }));
      throw err;
    }
  };

  // Ajouter un avis
  const addReview = async (
    courseId: string,
    review: { rating: number; comment: string }
  ) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const newReview = await trainingService.addCourseReview(courseId, review);
      setState(prev => ({
        ...prev,
        reviews: [...prev.reviews, newReview],
        isLoading: false
      }));
      return newReview;
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Une erreur est survenue'
      }));
      throw err;
    }
  };

  // Mettre à jour un avis
  const updateReview = async (
    reviewId: string,
    review: { rating: number; comment: string }
  ) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      const updatedReview = await trainingService.updateCourseReview(
        reviewId,
        review
      );
      setState(prev => ({
        ...prev,
        reviews: prev.reviews.map(r =>
          r.id === reviewId ? updatedReview : r
        ),
        isLoading: false
      }));
      return updatedReview;
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Une erreur est survenue'
      }));
      throw err;
    }
  };

  // Supprimer un avis
  const deleteReview = async (reviewId: string) => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      await trainingService.deleteCourseReview(reviewId);
      setState(prev => ({
        ...prev,
        reviews: prev.reviews.filter(r => r.id !== reviewId),
        isLoading: false
      }));
    } catch (err) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Une erreur est survenue'
      }));
      throw err;
    }
  };

  return {
    ...state,
    loadCourses,
    loadCourse,
    loadEnrollments,
    enrollInCourse,
    updateEnrollmentStatus,
    updateProgress,
    addReview,
    updateReview,
    deleteReview
  };
}; 