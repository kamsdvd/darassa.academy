import express from 'express';
import { authMiddleware } from '../common/middlewares/auth.middleware';
// import { CourseDto } from '../models/Course'; // We'll use FormationController which returns IFormation data
import { FormationController } from '../controllers/formation.controller.ts';

const router = express.Router();
const formationController = new FormationController();

/**
 * @swagger
 * /api/courses:
 *   get:
 *     tags: [courses]
 *     summary: Récupérer tous les cours
 *     description: Retourne la liste de tous les cours disponibles
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filtrer par catégorie
 *       - in: query
 *         name: level
 *         schema:
 *           type: string
 *           enum: [débutant, intermédiaire, avancé]
 *         description: Filtrer par niveau
 *     responses:
 *       200:
 *         description: Liste des cours
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Formation' // Adjusted for clarity, though DTO mapping might be desired
 *       500:
 *         description: Erreur serveur
 */
router.get('/', formationController.getAllFormations);

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     tags: [courses]
 *     summary: Récupérer un cours par ID
 *     description: Retourne les détails d'un cours spécifique
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du cours
 *     responses:
 *       200:
 *         description: Détails du cours
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Formation' // Adjusted for clarity
 *       404:
 *         description: Cours non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/:id', formationController.getFormationById);

/**
 * @swagger
 * /api/courses:
 *   post:
 *     tags: [courses]
 *     summary: Créer un nouveau cours
 *     description: Crée un nouveau cours (nécessite une authentification admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourseDto'
 *     responses:
 *       201:
 *         description: Cours créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Formation' // Adjusted for clarity
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès refusé
 *       500:
 *         description: Erreur serveur
 */
router.post('/', authMiddleware, async (req, res) => {
  // Implementation
});

/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     tags: [courses]
 *     summary: Mettre à jour un cours
 *     description: Met à jour les informations d'un cours existant (nécessite une authentification admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du cours
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourseDto'
 *     responses:
 *       200:
 *         description: Cours mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Formation' // Adjusted for clarity
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Cours non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put('/:id', authMiddleware, async (req, res) => {
  // Implementation
});

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     tags: [courses]
 *     summary: Supprimer un cours
 *     description: Supprime un cours existant (nécessite une authentification admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du cours
 *     responses:
 *       200:
 *         description: Cours supprimé avec succès
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès refusé
 *       404:
 *         description: Cours non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete('/:id', authMiddleware, async (req, res) => {
  // Implementation
});

export default router; 