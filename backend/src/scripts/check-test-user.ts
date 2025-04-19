import mongoose from 'mongoose';
import User from '../models/user.model';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

async function checkTestUser() {
  try {
    // Connexion à la base de données
    const mongoUrl = process.env.MONGODB_URI;
    if (!mongoUrl) {
      throw new Error('MONGODB_URI is not defined');
    }
    
    await mongoose.connect(mongoUrl);
    console.log('Connected to MongoDB');
    
    // Rechercher l'utilisateur de test
    const testUser = await User.findOne({ email: 'test@example.com' });
    
    if (testUser) {
      console.log('Test user found:');
      console.log(JSON.stringify(testUser, null, 2));
    } else {
      console.log('Test user not found');
      
      // Créer l'utilisateur de test
      console.log('Creating test user...');
      const newUser = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'user'
      });
      
      console.log('Test user created:');
      console.log(JSON.stringify(newUser, null, 2));
    }
    
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
  }
}

checkTestUser(); 