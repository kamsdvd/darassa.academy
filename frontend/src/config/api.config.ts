export const API_CONFIG = {
  BASE_URL: 'http://localhost:5000/api',
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