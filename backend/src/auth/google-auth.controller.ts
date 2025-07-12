import { Request, Response } from 'express';
import { oauth2Client } from '../config/google.config';

export const getAuthUrl = (req: Request, res: Response) => {
  const scopes = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events'
  ];

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent'
  });

  res.json({ url: authUrl });
};

export const handleCallback = async (req: Request, res: Response) => {
  const { code } = req.query;

  try {
    const { tokens } = await oauth2Client.getToken(code as string);
    oauth2Client.setCredentials(tokens);

    // Stocker les tokens dans la session ou la base de données
    req.session = req.session || {};
    req.session.googleTokens = tokens;

    res.redirect('/centre/planning');
  } catch (error) {
    console.error('Erreur lors de l\'authentification Google:', error);
    res.status(500).json({ message: 'Erreur lors de l\'authentification Google' });
  }
}; 