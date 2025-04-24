import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user.model';
import bcrypt from 'bcrypt';

dotenv.config();

const resetEnterprisePassword = async () => {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/darassa_academy');
    console.log('Connecté à MongoDB');

    // Recherche du compte entreprise
    const enterprise = await User.findOne({ email: 'david.kalambay@darassa.academy' });
    
    if (!enterprise) {
      console.log('Compte entreprise non trouvé');
      process.exit(1);
    }

    // Mot de passe complexe qui respecte les critères de validation
    const newPassword = 'Darassa2023!@#';
    
    // Hashage du nouveau mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Mise à jour du mot de passe
    enterprise.password = hashedPassword;
    await enterprise.save();
    
    console.log('Mot de passe réinitialisé avec succès');
    console.log('Nouveau mot de passe:', newPassword);
    
    // Vérification que le mot de passe fonctionne
    const passwordMatch = await enterprise.comparePassword(newPassword);
    console.log('Vérification du mot de passe:', passwordMatch);
    
    // Vérification directe avec bcrypt
    const directMatch = await bcrypt.compare(newPassword, enterprise.password);
    console.log('Vérification directe avec bcrypt:', directMatch);
    
    process.exit(0);
  } catch (error) {
    console.error('Erreur:', error);
    process.exit(1);
  }
};

resetEnterprisePassword(); 