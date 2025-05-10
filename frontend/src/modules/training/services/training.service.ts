import axios from 'axios';
import {
  Course,
  CourseEnrollment,
  CourseReview,
  EnrollmentStatus
} from '../types/training.types';
import { authService } from '../../auth/services/auth.service';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

class TrainingService {
  private getAuthHeader() {
    const token = authService.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  // Cours
  async getCourses(params?: {
    category?: string;
    level?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const response = await axios.get(`${API_URL}/courses`, { params });
    return response.data;
  }

  async getCourseById(courseId: string): Promise<Course> {
    const response = await axios.get(`${API_URL}/courses/${courseId}`);
    return response.data;
  }

  // Inscriptions
  async getEnrollments(): Promise<CourseEnrollment[]> {
    const response = await axios.get(`${API_URL}/enrollments`);
    return response.data;
  }

  async enrollInCourse(courseId: string): Promise<CourseEnrollment> {
    const response = await axios.post(`${API_URL}/enrollments`, { courseId });
    return response.data;
  }

  async updateEnrollmentStatus(
    enrollmentId: string,
    status: EnrollmentStatus
  ): Promise<CourseEnrollment> {
    const response = await axios.patch(`${API_URL}/enrollments/${enrollmentId}`, {
      status
    });
    return response.data;
  }

  async updateProgress(
    enrollmentId: string,
    progress: number
  ): Promise<CourseEnrollment> {
    const response = await axios.patch(`${API_URL}/enrollments/${enrollmentId}`, {
      progress
    });
    return response.data;
  }

  // Avis
  async getCourseReviews(courseId: string): Promise<CourseReview[]> {
    const response = await axios.get(`${API_URL}/courses/${courseId}/reviews`);
    return response.data;
  }

  async addCourseReview(
    courseId: string,
    review: { rating: number; comment: string }
  ): Promise<CourseReview> {
    const response = await axios.post(`${API_URL}/courses/${courseId}/reviews`, review);
    return response.data;
  }

  async updateCourseReview(
    reviewId: string,
    review: { rating: number; comment: string }
  ): Promise<CourseReview> {
    const response = await axios.patch(`${API_URL}/reviews/${reviewId}`, review);
    return response.data;
  }

  async deleteCourseReview(reviewId: string): Promise<void> {
    await axios.delete(`${API_URL}/reviews/${reviewId}`);
  }
}

export const trainingService = new TrainingService(); 