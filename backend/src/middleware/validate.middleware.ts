import { Request, Response, NextFunction } from 'express';

export const validateRegister = (req: Request, res: Response, next: NextFunction): void => {
  const { name, email, password, role, phone, company, position } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: 'Tous les champs sont requis' });
    return;
  }

  if (password.length < 6) {
    res.status(400).json({ message: 'Le mot de passe doit contenir au moins 6 caractères' });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Format d\'email invalide' });
    return;
  }

  if (role === 'entreprise') {
    if (!phone || !company || !position) {
      res.status(400).json({ message: 'Tous les champs de l\'entreprise sont requis' });
      return;
    }

    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(phone)) {
      res.status(400).json({ message: 'Format de numéro de téléphone invalide' });
      return;
    }
  }

  next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email et mot de passe requis' });
    return;
  }

  next();
}; 