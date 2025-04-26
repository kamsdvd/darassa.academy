import express, { RequestHandler } from 'express';
import { register, login, getMe } from '../controllers/auth.controller';
import { auth } from '../middleware/auth.middleware';

const router = express.Router();

// Public routes
router.post('/register', register as RequestHandler);
router.post('/login', login as RequestHandler);

// Protected routes
router.get('/me', auth, getMe as RequestHandler);

export default router; 