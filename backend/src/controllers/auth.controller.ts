import { Request, Response } from 'express';
import { User } from '../models/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '24h'; // Token expire après 24 heures

export const register = async (req: Request, res: Response) => {
  try {
    console.log('📝 Tentative d\'inscription avec les données:', req.body);
    const { email, password, firstName, lastName, userType } = req.body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('❌ Email déjà utilisé:', email);
      return res.status(400).json({ message: 'Cet email est déjà utilisé' });
    }

    // Créer le nouvel utilisateur
    const user = new User({
      email,
      password, // Le hachage sera fait automatiquement par le middleware pre('save')
      firstName,
      lastName,
      userType,
    });

    await user.save();

    console.log('✅ Utilisateur créé avec succès:', user._id);

    // Générer le token JWT
    const token = jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType,
      },
    });
  } catch (error) {
    console.error('❌ Erreur lors de l\'inscription:', error);
    res.status(500).json({ message: 'Erreur lors de l\'inscription' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    console.log('🔑 Tentative de connexion avec les données:', req.body);
    const { email, password } = req.body;

    // Trouver l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ Utilisateur non trouvé:', email);
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    console.log('👤 Utilisateur trouvé:', {
      id: user._id,
      email: user.email,
      userType: user.userType,
      hashedPassword: user.password
    });

    // Vérifier le mot de passe en utilisant la méthode du modèle
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log('❌ Mot de passe invalide pour:', email);
      return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }

    console.log('✅ Connexion réussie pour:', email);

    // Mettre à jour la dernière connexion
    user.lastLogin = new Date();
    await user.save();

    // Générer le token JWT
    const token = jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType
      }
    });
  } catch (error) {
    console.error('❌ Erreur lors de la connexion:', error);
    res.status(500).json({ message: 'Erreur lors de la connexion' });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json(user);
  } catch (error) {
    console.error('❌ Erreur lors de la récupération du profil:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération du profil' });
  }
}; 