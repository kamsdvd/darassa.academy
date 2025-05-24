import express, { Router } from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, disableUser, changeUserRole } from '../controllers/user.controller';
import { authMiddleware } from '../common/middlewares/auth.middleware';
import { roleMiddleware } from '../common/middlewares/role.middleware';
import { IUser } from '../models/user.model';

const router: Router = express.Router();

// Toutes les routes sont protégées par l'authentification
router.use(authMiddleware);

// CRUD utilisateurs (Admin only)
router.get('/', roleMiddleware(['admin']) as express.RequestHandler, getAllUsers as express.RequestHandler);
router.get('/:id', roleMiddleware(['admin']) as express.RequestHandler, getUserById as express.RequestHandler);
// Route de création d'utilisateur (Admin et Centre Manager)
router.post('/', roleMiddleware(['admin', 'centre_manager']) as express.RequestHandler, createUser as express.RequestHandler);
router.put('/:id', roleMiddleware(['admin']) as express.RequestHandler, updateUser as express.RequestHandler);
router.delete('/:id', roleMiddleware(['admin']) as express.RequestHandler, deleteUser as express.RequestHandler);

// Désactivation/réactivation (Admin only)
router.patch('/:id/disable', roleMiddleware(['admin']) as express.RequestHandler, disableUser as express.RequestHandler);

// Changement de rôle (Admin only)
router.patch('/:id/role', roleMiddleware(['admin']) as express.RequestHandler, changeUserRole as express.RequestHandler);

export default router; 