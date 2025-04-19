import mongoose from 'mongoose';
import User from '../models/user.model';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

async function createTestUser() {
  try {
    // Connexion à la base de données
    const mongoUrl = process.env.MONGODB_URI;
    if (!mongoUrl) {
      throw new Error('MONGODB_URI is not defined');
    }
    
    await mongoose.connect(mongoUrl);
    console.log('Connected to MongoDB');
    
    // Supprimer l'utilisateur de test s'il existe
    await User.deleteOne({ email: 'test@example.com' });
    
    // Créer un nouvel utilisateur de test
    const user = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'user'
    });
    
    // Sauvegarder l'utilisateur (le middleware pre-save va hasher le mot de passe)
    await user.save();
    
    console.log('Test user created successfully:', {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
    
    await mongoose.connection.close();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error:', error);
  }
}

createTestUser(); 