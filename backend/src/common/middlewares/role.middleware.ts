import { Request, Response, NextFunction } from 'express';
import { IUser } from '../../models/user.model';

export const roleMiddleware = (roles: string[]) => (req: Request & { user?: IUser }, res: Response, next: NextFunction) => {
  if (!req.user || !req.user.userType || !roles.includes(req.user.userType)) {
    return res.status(403).json({ message: 'Accès refusé : rôle insuffisant' });
  }
  next();
}; 