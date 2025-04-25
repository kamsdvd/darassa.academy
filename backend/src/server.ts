import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes';
import healthRoutes from './routes/health.routes';

// Charger les variables d'environnement
dotenv.config();
console.log('Environment variables loaded');

// Créer l'application Express
const app = express();
const port = process.env.PORT || 5000;
console.log(`Server will start on port ${port}`);

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
console.log('Middleware configured');

// Logging middleware
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.get('/api', (_req, res) => {
  console.log('Root API endpoint called');
  res.json({ message: 'API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/health', healthRoutes);
console.log('Routes configured');

// Error handling
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Error occurred:', err);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!'
  });
});

// Connexion à MongoDB
const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/darassa-academy';
    console.log('MongoDB URI:', mongoURI);
    
    await mongoose.connect(mongoURI);
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Démarrer le serveur
const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is now running and listening on port ${port}`);
      console.log('Available routes:');
      console.log('- GET /api');
      console.log('- POST /api/auth/register');
      console.log('- POST /api/auth/login');
      console.log('- GET /api/auth/me');
      console.log('- POST /api/auth/logout');
      console.log('- GET /api/health');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app; 