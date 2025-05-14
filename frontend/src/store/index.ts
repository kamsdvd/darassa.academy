import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistedReducer, createPersistor } from './persistConfig';
import { errorMiddleware } from './middleware/errorMiddleware';

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorer les actions de Redux Persist
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(errorMiddleware),
});

export const persistor = createPersistor(store);

// Types pour TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Hooks typés
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 