import { Request, Response, NextFunction } from 'express';
import * as authService from './auth.service';

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password, firstName, lastName, userType } = req.body;

    // Appel au service pour créer l'utilisateur et générer les tokens
    const { user, tokens } = await authService.registerUser({
      email,
      password,
      firstName,
      lastName,
      userType,
    });

    // Envoi de la réponse
    res.status(201).json({
      success: true,
      data: {
        user,
        tokens,
      },
    });
  } catch (error) {
    // Passe l'erreur au middleware de gestion d'erreurs
    next(error);
  }
}
