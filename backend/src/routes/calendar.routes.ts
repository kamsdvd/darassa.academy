import express from 'express';
import { getEvents, checkAvailability } from '../controllers/calendar.controller';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Route pour récupérer les événements du calendrier
router.get('/events', authenticateToken, getEvents);

// Route pour vérifier la disponibilité
router.post('/check-availability', authenticateToken, checkAvailability);

export default router; 