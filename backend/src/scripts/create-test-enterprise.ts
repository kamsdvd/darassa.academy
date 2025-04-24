import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user.model';
import bcrypt from 'bcrypt';

dotenv.config();

const createTestEnterprise = async () => {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/darassa_academy');
    console.log('Connecté à MongoDB');

    // Vérifier si le compte existe déjà
    const existingEnterprise = await User.findOne({ email: 'test.enterprise@example.com' });
    if (existingEnterprise) {
      console.log('Compte de test déjà existant, suppression...');
      await User.deleteOne({ email: 'test.enterprise@example.com' });
    }

    // Créer un nouveau compte entreprise
    const testEnterprise = new User({
      name: 'Test Enterprise',
      email: 'test.enterprise@example.com',
      password: 'Test123!@#',
      role: 'entreprise',
      phone: '+243123456789',
      company: 'Test Company',
      position: 'Manager'
    });

    // Sauvegarder le compte
    await testEnterprise.save();
    console.log('Compte de test créé avec succès');

    // Vérifier que le mot de passe fonctionne
    const passwordMatch = await testEnterprise.comparePassword('Test123!@#');
    console.log('Vérification du mot de passe:', passwordMatch);

    // Vérification directe avec bcrypt
    const directMatch = await bcrypt.compare('Test123!@#', testEnterprise.password);
    console.log('Vérification directe avec bcrypt:', directMatch);

    // Afficher les détails du compte
    console.log('Détails du compte:', {
      id: testEnterprise._id,
      email: testEnterprise.email,
      name: testEnterprise.name,
      role: testEnterprise.role,
      hashedPassword: testEnterprise.password
    });

    process.exit(0);
  } catch (error) {
    console.error('Erreur:', error);
    process.exit(1);
  }
};

createTestEnterprise(); 