import mongoose from 'mongoose';
import { User } from '../models/user.model';

const testDatabase = async () => {
  try {
    console.log('🔄 Test de connexion à MongoDB...');
    console.log('URI:', process.env.MONGODB_URI || 'mongodb://localhost:27017/darassa-academy');
    
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/darassa-academy');
    console.log('✅ Connecté à MongoDB avec succès');

    // Vérifier si la base de données est connectée
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('La connexion à la base de données n\'est pas établie');
    }

    // Lister les collections
    const collections = await db.listCollections().toArray();
    console.log('\n📋 Collections dans la base de données:');
    collections.forEach(col => console.log(`- ${col.name}`));

    // Compter les utilisateurs
    const userCount = await User.countDocuments();
    console.log(`\n👥 Nombre d'utilisateurs: ${userCount}`);

    // Lister les utilisateurs
    const users = await User.find().select('email userType password');
    console.log('\n📋 Liste des utilisateurs:');
    users.forEach(user => console.log(`- ${user.email} (${user.userType})`));

    // Vérifier les mots de passe
    console.log('\n🔐 Vérification des mots de passe:');
    for (const user of users) {
      console.log(`\nUtilisateur: ${user.email}`);
      console.log('Mot de passe hashé:', user.password);
    }

    console.log('\n✅ Test de base de données terminé');
  } catch (error) {
    console.error('❌ Erreur lors du test de la base de données:', error);
  } finally {
    await mongoose.disconnect();
  }
};

// Exécuter le test
testDatabase(); 