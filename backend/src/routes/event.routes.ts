import express from 'express';
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
} from '../controllers/event.controller';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Routes pour les événements
router.post('/', authenticateToken, createEvent);
router.get('/', authenticateToken, getEvents);
router.get('/:id', authenticateToken, getEventById);
router.put('/:id', authenticateToken, updateEvent);
router.delete('/:id', authenticateToken, deleteEvent);

export default router; 