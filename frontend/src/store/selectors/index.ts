import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

// Sélecteurs de base
const selectAuth = (state: RootState) => state.auth;
const selectCourses = (state: RootState) => state.courses;
const selectUI = (state: RootState) => state.ui;

// Sélecteurs pour l'authentification
export const selectIsAuthenticated = createSelector(
  selectAuth,
  (auth) => auth.isAuthenticated
);

export const selectUser = createSelector(
  selectAuth,
  (auth) => auth.user
);

export const selectAuthLoading = createSelector(
  selectAuth,
  (auth) => auth.loading
);

export const selectAuthError = createSelector(
  selectAuth,
  (auth) => auth.error
);

// Sélecteurs pour les cours
export const selectAllCourses = createSelector(
  selectCourses,
  (courses) => courses.courses
);

export const selectFilteredCourses = createSelector(
  [selectAllCourses, selectCourses],
  (courses, coursesState) => {
    const { category, level, priceRange } = coursesState.filters;
    
    return courses.filter(course => {
      const matchesCategory = !category || course.category === category;
      const matchesLevel = !level || course.level === level;
      const matchesPrice = !priceRange || 
        (course.price >= priceRange[0] && course.price <= priceRange[1]);
      
      return matchesCategory && matchesLevel && matchesPrice;
    });
  }
);

export const selectSelectedCourse = createSelector(
  selectCourses,
  (courses) => courses.selectedCourse
);

export const selectCoursesLoading = createSelector(
  selectCourses,
  (courses) => courses.loading
);

export const selectCoursesError = createSelector(
  selectCourses,
  (courses) => courses.error
);

// Sélecteurs pour l'UI
export const selectNotifications = createSelector(
  selectUI,
  (ui) => ui.notifications
);

export const selectSidebarOpen = createSelector(
  selectUI,
  (ui) => ui.sidebarOpen
);

export const selectTheme = createSelector(
  selectUI,
  (ui) => ui.theme
); 