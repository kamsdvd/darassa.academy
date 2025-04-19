import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user.model';

// Charger les variables d'environnement
dotenv.config();

const checkUser = async () => {
  try {
    console.log('Connexion à MongoDB...');
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/darassa-academy';
    await mongoose.connect(mongoURI);
    console.log('Connecté à MongoDB');

    // Rechercher l'utilisateur test
    const user = await User.findOne({ email: 'test@example.com' });
    
    if (user) {
      console.log('Utilisateur test trouvé:');
      console.log({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      });
    } else {
      console.log('Utilisateur test non trouvé');
    }

    // Créer l'utilisateur test s'il n'existe pas
    if (!user) {
      console.log('Création de l\'utilisateur test...');
      const newUser = await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'user'
      });
      console.log('Utilisateur test créé avec succès:', newUser._id);
    }

    await mongoose.disconnect();
    console.log('Déconnecté de MongoDB');
  } catch (error) {
    console.error('Erreur:', error);
  }
};

checkUser(); 