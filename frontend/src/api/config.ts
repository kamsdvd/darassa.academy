import axios from 'axios';

// Configuration centralisée pour l'API
const API_CONFIG = {
  BASE_URL: 'http://localhost:5000/api', // Assurez-vous que cela correspond à l'URL de votre backend
  TIMEOUT: 10000, // 10 secondes
};

// Création d'une instance d'Axios préconfigurée
export const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Vous pouvez également ajouter des intercepteurs ici si nécessaire
// api.interceptors.request.use(...)
// api.interceptors.response.use(...)
