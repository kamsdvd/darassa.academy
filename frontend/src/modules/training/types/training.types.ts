export interface Course {
  id: string;
  title: string;
  description: string;
  duration: number; // en heures
  level: CourseLevel;
  price: number;
  currency: string;
  category: string;
  tags: string[];
  thumbnail: string;
  instructor: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  modules: CourseModule[];
  createdAt: string;
  updatedAt: string;
}

export enum CourseLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED'
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  duration: number; // en minutes
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number; // en minutes
  type: LessonType;
  content: string;
  resources: Resource[];
  order: number;
}

export enum LessonType {
  VIDEO = 'VIDEO',
  READING = 'READING',
  QUIZ = 'QUIZ',
  EXERCISE = 'EXERCISE'
}

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  url: string;
  size?: number;
}

export enum ResourceType {
  PDF = 'PDF',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  LINK = 'LINK',
  OTHER = 'OTHER'
}

export interface CourseEnrollment {
  id: string;
  userId: string;
  courseId: string;
  progress: number;
  status: EnrollmentStatus;
  startDate: string;
  endDate?: string;
  lastAccessedAt: string;
}

export enum EnrollmentStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  PAUSED = 'PAUSED',
  CANCELLED = 'CANCELLED'
}

export interface CourseReview {
  id: string;
  userId: string;
  courseId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface CourseState {
  courses: Course[];
  currentCourse: Course | null;
  enrollments: CourseEnrollment[];
  reviews: CourseReview[];
  isLoading: boolean;
  error: string | null;
} 