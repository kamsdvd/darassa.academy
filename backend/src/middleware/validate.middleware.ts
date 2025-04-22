import { Request, Response, NextFunction } from 'express';

export const validateRegister = (req: Request, res: Response, next: NextFunction): void => {
  const { name, email, password, role, phone, company, position } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: 'Tous les champs sont requis' });
    return;
  }

  if (name.length < 2) {
    res.status(400).json({ message: 'Le nom doit contenir au moins 2 caractères' });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Format d\'email invalide' });
    return;
  }

  if (password.length < 8) {
    res.status(400).json({ message: 'Le mot de passe doit contenir au moins 8 caractères' });
    return;
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({ 
      message: 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial' 
    });
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

    if (company.length < 2) {
      res.status(400).json({ message: 'Le nom de l\'entreprise doit contenir au moins 2 caractères' });
      return;
    }

    if (position.length < 2) {
      res.status(400).json({ message: 'Le poste doit contenir au moins 2 caractères' });
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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Format d\'email invalide' });
    return;
  }

  if (password.length < 8) {
    res.status(400).json({ message: 'Le mot de passe doit contenir au moins 8 caractères' });
    return;
  }

  next();
}; 