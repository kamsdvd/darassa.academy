import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import courseRoutes from './routes/course.routes';
import seedDatabase from './config/seed';
import { setupSwagger } from './config/swagger.config';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import createError from 'http-errors';
import { authMiddleware } from './common/middlewares/auth.middleware';
import errorMiddleware from './common/middlewares/error.middleware';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(helmet());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);

// Limiteur de requêtes pour les routes d'authentification
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limite à 10 requêtes par IP
  message: 'Trop de tentatives, veuillez réessayer plus tard.'
});

app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
app.use('/api/auth/request-reset', authLimiter);
app.use('/api/auth/reset-password', authLimiter);

// Setup Swagger
setupSwagger(app);

// Health check route
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Middleware 404 pour les routes non trouvées
app.use((req, res, next) => {
  next(createError(404, `Route non trouvée: ${req.originalUrl}`));
});

// Middleware d'erreur global Express
app.use(errorMiddleware);

const initializeDatabase = async () => {
  try {
    console.log('🔄 Tentative de connexion à MongoDB...');
    console.log('URI:', process.env.MONGODB_URI || 'mongodb://localhost:27017/darassa-academy');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/darassa-academy');
    console.log('✅ Connecté à MongoDB avec succès');

    // Vérifier si la base de données est connectée
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('La connexion à la base de données n\'est pas établie');
    }

    // Vérifier si la base de données est vide
    const collections = await db.listCollections().toArray();
    const isEmpty = collections.length === 0;

    // Exécuter le seed en mode développement ou si la base est vide
    if (process.env.NODE_ENV === 'development' || isEmpty) {
      console.log(`${isEmpty ? '📥 Base de données vide' : '🔧 Mode développement'}, exécution du seed...`);
      try {
        await seedDatabase();
        console.log('✅ Base de données initialisée avec succès');
      } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation de la base de données:', error);
        process.exit(1);
      }
    }

    // Démarrer le serveur
    app.listen(port, () => {
      console.log(`✅ Serveur démarré sur le port ${port}`);
      console.log(`Mode: ${process.env.NODE_ENV || 'production'}`);
      console.log(`URL: http://localhost:${port}`);
      console.log(`Documentation API: http://localhost:${port}/api/docs`);
    });
  } catch (error) {
    console.error('❌ Erreur de connexion à MongoDB:', error);
    process.exit(1);
  }
};

// Initialiser la base de données et démarrer le serveur
initializeDatabase(); 