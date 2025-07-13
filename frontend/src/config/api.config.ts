export const API_CONFIG = {
  BASE_URL: '/api', // Utilise le proxy Vite pour router vers le backend (port 5000)
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      ME: '/auth/profile',
    },
    // Ajoutez d'autres endpoints ici au besoin
  },
};