import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';
import InvalidToken from '../models/invalidToken.model';

// Déclaration de type pour la requête authentifiée
export interface AuthenticatedRequest extends Request {
  user?: IUser;
}

export const protect = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token;

    // Vérifier le token dans les headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      res.status(401).json({ message: 'Non autorisé - Token manquant' });
      return;
    }

    try {
      // Vérifier si le token n'a pas été invalidé
      const isInvalidated = await InvalidToken.findOne({ token });
      if (isInvalidated) {
        res.status(401).json({ message: 'Non autorisé - Token invalidé' });
        return;
      }

      // Vérifier le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { id: string };

      // Récupérer l'utilisateur
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        res.status(401).json({ message: 'Non autorisé - Utilisateur non trouvé' });
        return;
      }

      // Ajouter l'utilisateur à la requête
      req.user = user;
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