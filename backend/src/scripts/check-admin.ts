import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user.model';

dotenv.config();

const checkAdmin = async () => {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/darassa_academy');
    console.log('Connecté à MongoDB');

    // Recherche du compte administrateur
    const admin = await User.findOne({ role: 'admin' });
    
    if (admin) {
      console.log('Compte administrateur trouvé:', {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role
      });
    } else {
      console.log('Aucun compte administrateur trouvé');
      
      // Créer un compte administrateur
      const newAdmin = new User({
        name: 'Administrateur',
        email: 'admin@darassa.academy',
        password: 'Admin2024!@#',
        role: 'admin'
      });

      await newAdmin.save();
      console.log('Nouveau compte administrateur créé avec succès');
    }

    process.exit(0);
  } catch (error) {
    console.error('Erreur:', error);
    process.exit(1);
  }
};

checkAdmin(); 