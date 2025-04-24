import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user.model';
import bcrypt from 'bcrypt';

dotenv.config();

const recreateEnterprise = async () => {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/darassa_academy');
    console.log('Connecté à MongoDB');

    // Supprimer le compte existant
    const existingEnterprise = await User.findOne({ email: 'david.kalambay@darassa.academy' });
    if (existingEnterprise) {
      console.log('Compte entreprise existant trouvé, suppression...');
      await User.deleteOne({ email: 'david.kalambay@darassa.academy' });
      console.log('Compte supprimé avec succès');
    }

    // Créer un nouveau compte entreprise
    const newEnterprise = new User({
      name: 'DARASSA ACADEMY',
      email: 'david.kalambay@darassa.academy',
      password: 'Darassa2023!@#',
      role: 'entreprise',
      phone: '+243123456789',
      company: 'DARASSA ACADEMY',
      position: 'Administrateur'
    });

    // Sauvegarder le compte
    await newEnterprise.save();
    console.log('Nouveau compte entreprise créé avec succès');

    // Vérifier que le mot de passe fonctionne
    const passwordMatch = await newEnterprise.comparePassword('Darassa2023!@#');
    console.log('Vérification du mot de passe:', passwordMatch);

    // Vérification directe avec bcrypt
    const directMatch = await bcrypt.compare('Darassa2023!@#', newEnterprise.password);
    console.log('Vérification directe avec bcrypt:', directMatch);

    // Afficher les détails du compte
    console.log('Détails du compte:', {
      id: newEnterprise._id,
      email: newEnterprise.email,
      name: newEnterprise.name,
      role: newEnterprise.role,
      hashedPassword: newEnterprise.password
    });

    process.exit(0);
  } catch (error) {
    console.error('Erreur:', error);
    process.exit(1);
  }
};

recreateEnterprise(); 