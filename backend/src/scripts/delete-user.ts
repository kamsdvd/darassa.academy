import mongoose from 'mongoose';
import User from '../models/user.model';

async function deleteUser() {
  try {
    // Connexion à MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/darassa_academy');
    console.log('Connecté à MongoDB');

    // Suppression de l'utilisateur
    const result = await User.deleteOne({ email: 'david.kalambay@darassa.academy' });
    
    if (result.deletedCount > 0) {
      console.log('Utilisateur supprimé avec succès');
    } else {
      console.log('Aucun utilisateur trouvé avec cet email');
    }

  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Déconnecté de MongoDB');
  }
}

deleteUser(); 