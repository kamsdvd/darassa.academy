import express from 'express';
import { getDashboardStats } from '../controllers/centre.controller';
import { authenticateToken } from '../middleware/auth';
import { roleMiddleware } from '../common/middlewares/role.middleware';

const router = express.Router();

// Route pour obtenir les statistiques du tableau de bord
router.get(
  '/dashboard/:centreId',
  authenticateToken,
  roleMiddleware(['centre_manager']),
  getDashboardStats
);

export default router; 