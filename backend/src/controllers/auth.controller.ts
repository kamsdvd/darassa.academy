import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import InvalidToken from '../models/invalidToken.model';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

// Generate JWT Token
const generateToken = (id: string): string => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '7d' }
  );
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Registration attempt:', {
      ...req.body,
      password: req.body.password ? '***' : undefined
    });

    const { name, email, password, role, phone, company, position } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('Registration failed: User already exists');
      res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà' });
      return;
    }

    // Create user with role-specific fields
    const userData: any = {
      name,
      email,
      password,
      role: role || 'user'
    };

    // Add enterprise-specific fields if role is 'entreprise'
    if (role === 'entreprise') {
      if (!phone || !company || !position) {
        console.log('Registration failed: Missing enterprise fields');
        res.status(400).json({ message: 'Tous les champs de l\'entreprise sont requis' });
        return;
      }
      userData.phone = phone;
      userData.company = company;
      userData.position = position;
    }

    console.log('Creating user with data:', {
      ...userData,
      password: '***'
    });

    const user = await User.create(userData);

    console.log('User created successfully:', {
      id: user._id,
      email: user.email,
      role: user.role
    });

    // Return user data without password
    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        company: user.company,
        position: user.position,
        token: generateToken(user._id),
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'inscription' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('\n=== Login Attempt ===');
    console.log('Request headers:', req.headers);
    console.log('Request body:', {
      ...req.body,
      password: req.body.password ? '***' : undefined
    });

    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });
    console.log('User found:', user ? {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      hashedPassword: user.password ? '***' : 'none'
    } : 'no');
    
    if (!user) {
      console.log('Login failed: User not found');
      res.status(401).json({ message: 'Email ou mot de passe incorrect' });
      return;
    }

    console.log('Comparing passwords...');
    const isMatch = await user.comparePassword(password);
    console.log('Password match result:', isMatch);

    if (isMatch) {
      const token = generateToken(user.id);
      console.log('Token generated successfully');
      
      const response = {
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      };
      console.log('Login successful, sending response:', { ...response, token: '***' });
      
      res.json(response);
    } else {
      console.log('Login failed: Password does not match');
      res.status(401).json({ message: 'Email ou mot de passe incorrect' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?.id).select('-password');
    if (!user) {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
      return;
    }
    res.json(user);
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      await InvalidToken.create({ token });
    }
    res.json({ message: 'Déconnexion réussie' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}; 