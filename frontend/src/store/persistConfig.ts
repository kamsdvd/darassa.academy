import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import coursesReducer from './slices/coursesSlice';
import uiReducer from './slices/uiSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  courses: coursesReducer,
  ui: uiReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'ui'], // Seuls ces reducers seront persistés
  blacklist: ['courses'], // Ce reducer ne sera pas persisté
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const createPersistor = (store: any) => persistStore(store); 