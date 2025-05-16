import { Request, Response } from 'express';
import { generateJWT } from '../helpers/token.helper';
import { config } from '../../config/config';

export const handleOAuthCallback = (provider: string) => async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      throw new Error('No user found in request');
    }

    const token = generateJWT({ 
      id: req.user._id.toString(),
      userType: req.user.userType,
      email: req.user.email
    });

    // Rediriger vers le frontend avec le token
    res.redirect(`${config.frontendUrl}/auth/callback?token=${token}&provider=${provider}`);
  } catch (error) {
    console.error(`Error in ${provider} OAuth callback:`, error);
    res.redirect(`${config.frontendUrl}/auth/error?message=${encodeURIComponent('Authentication failed')}`);
  }
}; 