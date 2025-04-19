import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes';

// Charger les variables d'environnement
dotenv.config();
console.log('Environment variables loaded');

// Créer l'application Express
const app = express();
const port = process.env.PORT || 3000;
console.log(`Server will start on port ${port}`);

// Middleware
app.use(cors());
app.use(express.json());
console.log('Middleware configured');

// Routes
app.get('/api', (_req, res) => {
  res.json({ message: 'API is running' });
});

app.use('/api/auth', authRoutes);
console.log('Routes configured');

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
  await connectDB();
  app.listen(port, () => {
    console.log(`Server is now running and listening on port ${port}`);
    console.log('Available routes:');
    console.log('- GET /api');
    console.log('- POST /api/auth/register');
    console.log('- POST /api/auth/login');
    console.log('- GET /api/auth/me');
    console.log('- POST /api/auth/logout');
  });
};

startServer();

export default app; 