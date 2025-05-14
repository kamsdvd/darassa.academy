import express from 'express';
import {
  createSession,
  getSessions,
  getSessionById,
  updateSession,
  deleteSession,
  updateSessionStatus,
  updateParticipantPresence
} from '../controllers/session.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { roleMiddleware } from '../common/middlewares/role.middleware';

const router = express.Router();

// Routes protégées par authentification
router.use(authMiddleware);

// Routes pour les gestionnaires de centre et formateurs
router.post(
  '/',
  roleMiddleware(['centre_manager', 'formateur']),
  createSession
);

router.get(
  '/',
  roleMiddleware(['centre_manager', 'formateur', 'etudiant']),
  getSessions
);

router.get(
  '/:id',
  roleMiddleware(['centre_manager', 'formateur', 'etudiant']),
  getSessionById
);

router.put(
  '/:id',
  roleMiddleware(['centre_manager', 'formateur']),
  updateSession
);

router.delete(
  '/:id',
  roleMiddleware(['centre_manager']),
  deleteSession
);

// Route pour mettre à jour le statut d'une session
router.patch(
  '/:id/status',
  roleMiddleware(['centre_manager', 'formateur']),
  updateSessionStatus
);

// Route pour mettre à jour la présence d'un participant
router.patch(
  '/:id/participants/:etudiantId/presence',
  roleMiddleware(['centre_manager', 'formateur']),
  updateParticipantPresence
);

export default router; 