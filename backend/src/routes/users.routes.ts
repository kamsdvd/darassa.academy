import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, disableUser, changeUserRole } from '../controllers/user.controller';
import { authMiddleware } from '../common/middlewares/auth.middleware';
import { roleMiddleware } from '../common/middlewares/role.middleware';

const router = express.Router();

// Toutes les routes sont protégées et réservées aux admins
router.use(authMiddleware);
router.use(roleMiddleware(['admin']));

// CRUD utilisateurs
router.get('/', getAllUsers); // Liste tous les utilisateurs
router.get('/:id', getUserById); // Détail utilisateur
router.post('/', createUser); // Création utilisateur (admin)
router.put('/:id', updateUser); // Modification utilisateur
router.delete('/:id', deleteUser); // Suppression utilisateur

// Désactivation/réactivation
router.patch('/:id/disable', disableUser); // Désactiver/réactiver un utilisateur

// Changement de rôle
router.patch('/:id/role', changeUserRole); // Changer le rôle d'un utilisateur

export default router; 