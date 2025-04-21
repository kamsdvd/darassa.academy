import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/user.model';

const resetPassword = async () => {
  try {
    // Connexion à MongoDB
    await mongoose.connect('mongodb://localhost:27017/darassa_academy');
    console.log('Connecté à MongoDB');

    // ID de l'utilisateur à mettre à jour
    const userId = '68068ce618649df47037d1c4';
    
    // Nouveau mot de passe
    const newPassword = 'Darassa@2024';
    
    // Hachage du nouveau mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Mise à jour du mot de passe dans la base de données
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: hashedPassword },
      { new: true }
    );

    if (updatedUser) {
      console.log('Mot de passe réinitialisé avec succès');
      console.log('Nouveau mot de passe :', newPassword);
      console.log('Email :', updatedUser.email);
    } else {
      console.log('Utilisateur non trouvé');
    }
  } catch (error) {
    console.error('Erreur lors de la réinitialisation du mot de passe:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Déconnecté de MongoDB');
  }
};

resetPassword(); 