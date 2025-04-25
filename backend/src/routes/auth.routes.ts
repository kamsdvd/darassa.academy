import express, { Request, Response } from 'express';
import { Router } from 'express';

const router: Router = express.Router();

// Routes temporaires pour l'authentification
router.post('/register', (_req: Request, res: Response) => {
  res.json({ message: 'Register endpoint' });
});

router.post('/login', (_req: Request, res: Response) => {
  res.json({ message: 'Login endpoint' });
});

router.get('/me', (_req: Request, res: Response) => {
  res.json({ message: 'Me endpoint' });
});

router.post('/logout', (_req: Request, res: Response) => {
  res.json({ message: 'Logout endpoint' });
});

export default router; 