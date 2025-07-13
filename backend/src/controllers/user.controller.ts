import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Liste tous les utilisateurs
 *     tags: [users]
 *     parameters:
 *       - in: query
 *         name: userType
 *         schema:
 *           type: string
 *         description: Filtrer par type d'utilisateur
 *       - in: query
 *         name: isActive
 *         schema:
 *           type: boolean
 *         description: Filtrer par statut actif
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page de pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Nombre d'éléments par page
 *     responses:
 *       200:
 *         description: Liste paginée des utilisateurs
 *       401:
 *         description: Non autorisé
 *       403:
 *         description: Accès interdit
 */
// Liste tous les utilisateurs (pagination, filtre possible)
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filter: any = {};
    if (req.query.userType) filter.userType = req.query.userType;
    if (req.query.isActive !== undefined) filter.isActive = req.query.isActive === 'true';
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: filter,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where: filter }),
    ]);
    res.status(200).json({ users, total, page, limit });
  } catch (err) {
    next(err);
  }
};

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Détail d'un utilisateur
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *       404:
 *         description: Utilisateur non trouvé
 */
// Détail utilisateur
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: { password: false, id: true, email: true, firstName: true, lastName: true, userType: true, isActive: true, isEmailVerified: true, phone: true, profilePicture: true, createdAt: true, updatedAt: true }
    });
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Créer un utilisateur
 *     tags: [users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - firstName
 *               - lastName
 *               - userType
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               userType:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *       409:
 *         description: Email déjà utilisé
 */
// Création utilisateur
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, firstName, lastName, userType, specialites } = req.body;
    if (!email || !password || !firstName || !lastName || !userType) {
      return res.status(400).json({ message: 'Champs obligatoires manquants' });
    }
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return res.status(409).json({ message: 'Email déjà utilisé' });
    const user = await prisma.user.create({
      data: { email, password, firstName, lastName, userType, specialites },
    });
    res.status(201).json({ message: 'Utilisateur créé', user: { ...user, password: undefined } });
  } catch (err) {
    next(err);
  }
};

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Modifier un utilisateur
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               userType:
 *                 type: string
 *               phone:
 *                 type: string
 *               profilePicture:
 *                 type: string
 *     responses:
 *       200:
 *         description: Utilisateur modifié
 *       404:
 *         description: Utilisateur non trouvé
 */
// Modification utilisateur
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, firstName, lastName, userType, phone, profilePicture } = req.body;
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: {
        email,
        firstName,
        lastName,
        userType,
        phone,
        profilePicture,
      },
    });
    res.status(200).json({ message: 'Utilisateur modifié', user: { ...user, password: undefined } });
  } catch (err) {
    next(err);
  }
};

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 *       404:
 *         description: Utilisateur non trouvé
 */
// Suppression utilisateur
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.delete({ where: { id: req.params.id } });
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.status(200).json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    next(err);
  }
};

/**
 * @swagger
 * /users/{id}/disable:
 *   patch:
 *     summary: Désactiver/réactiver un utilisateur
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID utilisateur
 *     responses:
 *       200:
 *         description: Statut modifié
 *       404:
 *         description: Utilisateur non trouvé
 */
// Désactivation/réactivation utilisateur
export const disableUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { isActive: false },
    });
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.status(200).json({ message: 'Utilisateur désactivé' });
  } catch (err) {
    next(err);
  }
};

/**
 * @swagger
 * /users/{id}/role:
 *   patch:
 *     summary: Changer le rôle d'un utilisateur
 *     tags: [users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userType
 *             properties:
 *               userType:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rôle modifié
 *       404:
 *         description: Utilisateur non trouvé
 */
// Changement de rôle utilisateur
export const changeUserRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { newRole } = req.body;
    if (!newRole) return res.status(400).json({ message: 'Nouveau rôle requis' });
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { userType: newRole },
    });
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
    res.status(200).json({ message: 'Rôle modifié avec succès' });
  } catch (err) {
    next(err);
  }
};