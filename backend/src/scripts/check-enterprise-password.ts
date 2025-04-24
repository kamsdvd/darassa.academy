import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user.model';
import bcrypt from 'bcrypt';

dotenv.config();

const checkEnterprisePassword = async () => {
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

    console.log('Compte entreprise trouvé:', {
      id: enterprise._id,
      email: enterprise.email,
      name: enterprise.name,
      role: enterprise.role,
      hashedPassword: enterprise.password
    });

    // Test de comparaison de mot de passe
    const testPassword = 'Darassa2023!@#';
    const passwordMatch = await enterprise.comparePassword(testPassword);
    console.log('Résultat de la comparaison de mot de passe:', passwordMatch);

    // Test direct avec bcrypt
    const directMatch = await bcrypt.compare(testPassword, enterprise.password);
    console.log('Résultat de la comparaison directe avec bcrypt:', directMatch);

    // Création d'un nouveau hachage pour comparaison
    const salt = await bcrypt.genSalt(10);
    const newHash = await bcrypt.hash(testPassword, salt);
    console.log('Nouveau hachage généré:', newHash);
    console.log('Les hachages sont identiques:', enterprise.password === newHash);

    process.exit(0);
  } catch (error) {
    console.error('Erreur:', error);
    process.exit(1);
  }
};

checkEnterprisePassword(); 