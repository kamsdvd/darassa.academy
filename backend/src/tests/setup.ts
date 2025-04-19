import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Charger les variables d'environnement de test
dotenv.config({ path: '.env.test' });

// Configuration globale pour les tests
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key';
process.env.MONGODB_URI = 'mongodb+srv://kamsdvd:eiW1ZURoXxfuQyrw@cluster0.jwbyhos.mongodb.net/darassa-academy-test?retryWrites=true&w=majority';

beforeAll(async () => {
  const mongoUrl = process.env.MONGODB_URI;
  if (!mongoUrl) {
    throw new Error('MONGODB_URI is not defined');
  }
  
  try {
    await mongoose.connect(mongoUrl);
    console.log('Connected to MongoDB Atlas test database');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
});

afterAll(async () => {
  await mongoose.connection.close();
}); 