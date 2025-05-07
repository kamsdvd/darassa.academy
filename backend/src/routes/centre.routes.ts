import express from 'express';
import { getDashboardStats } from '../controllers/centre.controller';
import { authenticateToken } from '../middleware/auth';
import { checkRole } from '../middleware/roles';

const router = express.Router();

// Route pour obtenir les statistiques du tableau de bord
router.get(
  '/dashboard/:centreId',
  authenticateToken,
  checkRole(['centre_manager']),
  getDashboardStats
);

export default router; 