import express, { Router } from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, disableUser, changeUserRole } from '../controllers/user.controller';
import { authMiddleware } from '../common/middlewares/auth.middleware';
import { roleMiddleware } from '../common/middlewares/role.middleware';
import { IUser } from '../models/user.model';

const router: Router = express.Router();

// Toutes les routes sont protégées et réservées aux admins
router.use(authMiddleware);
router.use(roleMiddleware(['admin']) as express.RequestHandler);

// CRUD utilisateurs
router.get('/', getAllUsers as express.RequestHandler);
router.get('/:id', getUserById as express.RequestHandler);
router.post('/', createUser as express.RequestHandler);
router.put('/:id', updateUser as express.RequestHandler);
router.delete('/:id', deleteUser as express.RequestHandler);

// Désactivation/réactivation
router.patch('/:id/disable', disableUser as express.RequestHandler);

// Changement de rôle
router.patch('/:id/role', changeUserRole as express.RequestHandler);

export default router; 