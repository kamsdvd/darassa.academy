import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationState {
  message: string;
  type: 'success' | 'error';
  show: boolean;
}

interface UIState {
  notification: NotificationState;
}

const initialState: UIState = {
  notification: {
    message: '',
    type: 'success',
    show: false,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showNotification: (
      state,
      action: PayloadAction<{ message: string; type: 'success' | 'error' }>
    ) => {
      state.notification = {
        message: action.payload.message,
        type: action.payload.type,
        show: true,
      };
    },
    clearNotification: (state) => {
      state.notification.show = false;
    },
  },
});

export const { showNotification, clearNotification } = uiSlice.actions;
export default uiSlice.reducer; 