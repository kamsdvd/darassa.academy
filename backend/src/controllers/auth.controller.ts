import { Request, Response } from 'express';

export const login = (req: Request, res: Response) => {
  // TODO: implémenter la logique d'authentification
  res.json({ message: 'Login' });
}; 