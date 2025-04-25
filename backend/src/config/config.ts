import dotenv from 'dotenv';
import path from 'path';

// Charger les variables d'environnement
dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/darassa',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  rateLimitWindow: 15 * 60 * 1000, // 15 minutes
  rateLimitMax: 100, // 100 requêtes par fenêtre
  logLevel: process.env.LOG_LEVEL || 'info',
  uploadDir: path.join(__dirname, '../../uploads'),
  maxFileSize: 5 * 1024 * 1024, // 5MB
};

export default config; 