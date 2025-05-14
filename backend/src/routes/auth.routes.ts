import express from 'express';
import passport from 'passport';
import { register, login, getProfile, requestPasswordReset, resetPassword, verifyEmail } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import jwt from 'jsonwebtoken';

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [auth]
 *     summary: Register a new user
 *     description: Create a new user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Invalid input data
 *       409:
 *         description: Email already exists
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [auth]
 *     summary: Login user
 *     description: Authenticate user and return JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', login);

// Routes protégées
router.get('/profile', authMiddleware, getProfile);

/**
 * @swagger
 * /api/auth/request-reset:
 *   post:
 *     tags: [auth]
 *     summary: Request password reset
 *     description: Send a password reset email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Reset email sent
 *       404:
 *         description: User not found
 */
router.post('/request-reset', requestPasswordReset);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     tags: [auth]
 *     summary: Reset password
 *     description: Reset password using token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *             properties:
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid or expired token
 */
router.post('/reset-password', resetPassword);

/**
 * @swagger
 * /api/auth/verify-email:
 *   get:
 *     tags: [auth]
 *     summary: Verify email
 *     description: Verify email using token
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid or expired token
 */
router.get('/verify-email', verifyEmail);

/**
 * @swagger
 * /api/auth/google:
 *   get:
 *     tags: [auth]
 *     summary: Authenticate with Google
 *     description: Redirect to Google OAuth login
 */
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

/**
 * @swagger
 * /api/auth/google/callback:
 *   get:
 *     tags: [auth]
 *     summary: Google OAuth callback
 *     description: Handle Google OAuth callback and redirect to frontend
 */
router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    // Générer le token JWT
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Rediriger vers le frontend avec le token
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
  }
);

/**
 * @swagger
 * /api/auth/facebook:
 *   get:
 *     tags: [auth]
 *     summary: Authenticate with Facebook
 *     description: Redirect to Facebook OAuth login
 */
router.get('/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

/**
 * @swagger
 * /api/auth/facebook/callback:
 *   get:
 *     tags: [auth]
 *     summary: Facebook OAuth callback
 *     description: Handle Facebook OAuth callback and redirect to frontend
 */
router.get('/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  (req, res) => {
    // Générer le token JWT
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Rediriger vers le frontend avec le token
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
  }
);

/**
 * @swagger
 * /api/auth/linkedin:
 *   get:
 *     tags: [auth]
 *     summary: Authenticate with LinkedIn
 *     description: Redirect to LinkedIn OAuth login
 */
router.get('/linkedin',
  passport.authenticate('linkedin', { state: true })
);

/**
 * @swagger
 * /api/auth/linkedin/callback:
 *   get:
 *     tags: [auth]
 *     summary: LinkedIn OAuth callback
 *     description: Handle LinkedIn OAuth callback and redirect to frontend
 */
router.get('/linkedin/callback',
  passport.authenticate('linkedin', { session: false }),
  (req, res) => {
    // Générer le token JWT
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Rediriger vers le frontend avec le token
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
  }
);

export default router; 