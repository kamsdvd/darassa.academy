import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { verifyJWT } from '../helpers/token.helper';
import { config } from '../../config/config';

const prisma = new PrismaClient();

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        success: false,
        message: 'Token d\'authentification non fourni' 
      });
    }

    const token = authHeader.split(' ')[1];
    
    try {
      const decoded = verifyJWT(token);
      
      const user = await prisma.user.findUnique({ where: { id: decoded.id } });
      if (!user) {
        return res.status(401).json({ 
          success: false,
          message: 'Utilisateur non trouvé' 
        });
      }

      if (!user.isActive) {
        return res.status(403).json({ 
          success: false,
          message: 'Compte désactivé' 
        });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ 
        success: false,
        message: 'Token invalide ou expiré' 
      });
    }
  } catch (error) {
    console.error('Erreur dans le middleware d\'authentification:', error);
    next(error);
  }
}; 