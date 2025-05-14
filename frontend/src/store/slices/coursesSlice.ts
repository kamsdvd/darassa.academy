import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Course {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  duration: string;
  level: string;
  category: string;
  instructor: {
    id: number;
    name: string;
    avatar: string;
  };
}

interface CoursesState {
  courses: Course[];
  selectedCourse: Course | null;
  filters: {
    category: string;
    level: string;
    priceRange: [number, number];
  };
  loading: boolean;
  error: string | null;
}

const initialState: CoursesState = {
  courses: [],
  selectedCourse: null,
  filters: {
    category: '',
    level: '',
    priceRange: [0, 1000],
  },
  loading: false,
  error: null,
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSelectedCourse: (state, action: PayloadAction<Course>) => {
      state.selectedCourse = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<CoursesState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setCourses,
  setSelectedCourse,
  setFilters,
  setLoading,
  setError,
} = coursesSlice.actions;
export default coursesSlice.reducer; 