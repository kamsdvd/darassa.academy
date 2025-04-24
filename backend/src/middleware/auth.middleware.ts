import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import InvalidToken from '../models/invalidToken.model';

// Déclaration de type pour la requête authentifiée
export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export const protect = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      res.status(401).json({ message: 'Non autorisé - Token manquant' });
      return;
    }

    try {
      // Vérifier le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { id: string; email: string; role: string };

      // Récupérer l'utilisateur
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        res.status(401).json({ message: 'Utilisateur non trouvé' });
        return;
      }

      // Vérifier si le token n'est pas invalidé
      const invalidToken = await InvalidToken.findOne({ token });
      if (invalidToken) {
        res.status(401).json({ message: 'Token invalide' });
        return;
      }

      // Assigner l'utilisateur décodé à la requête
      req.user = decoded;
      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json({ message: 'Non autorisé - Token expiré' });
        return;
      }
      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({ message: 'Non autorisé - Token invalide' });
        return;
      }
      res.status(401).json({ message: 'Non autorisé - Erreur de token' });
      return;
    }
  } catch (error) {
    console.error('Erreur dans le middleware protect:', error);
    res.status(500).json({ message: 'Erreur serveur' });
    return;
  }
};

// Middleware pour vérifier les rôles
export const authorize = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ message: 'Non autorisé - Utilisateur non connecté' });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ 
        message: `Non autorisé - Rôle ${req.user.role} non autorisé`,
        requiredRoles: roles,
        userRole: req.user.role
      });
      return;
    }

    next();
  };
}; 