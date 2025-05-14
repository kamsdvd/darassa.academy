import { Request, Response, NextFunction } from 'express';

export const roleMiddleware = (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || !roles.includes(req.user.userType)) {
    return res.status(403).json({ message: 'Accès refusé : rôle insuffisant' });
  }
  next();
}; 