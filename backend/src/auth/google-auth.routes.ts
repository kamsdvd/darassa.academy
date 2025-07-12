import express from 'express';
import { getAuthUrl, handleCallback } from '../controllers/google-auth.controller';

const router = express.Router();

router.get('/auth-url', getAuthUrl);
router.get('/callback', handleCallback);

export default router; 