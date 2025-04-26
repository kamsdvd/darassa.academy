import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token d\'authentification non fourni' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
      
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(401).json({ message: 'Utilisateur non trouvé' });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token invalide ou expiré' });
    }
  } catch (error) {
    console.error('Erreur dans le middleware d\'authentification:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
}; 