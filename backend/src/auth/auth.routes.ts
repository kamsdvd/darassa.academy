import express from 'express';
import passport from 'passport';
import { register, login, getProfile, requestPasswordReset, resetPassword, verifyEmail } from '../controllers/auth.controller';
import { authMiddleware } from '../common/middlewares/auth.middleware';
import { handleOAuthCallback } from '../common/middlewares/oauth.middleware';
import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { config } from '../config/config';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware de validation pour l'inscription
const validateRegister = [
  body('email').isEmail().withMessage('Email invalide'),
  body('password')
    .isLength({ min: config.auth.passwordMinLength })
    .withMessage(`Le mot de passe doit contenir au moins ${config.auth.passwordMinLength} caractères`),
  body('firstName').notEmpty().withMessage('Le prénom est requis'),
  body('lastName').notEmpty().withMessage('Le nom est requis'),
  body('userType')
    .isIn(['admin', 'centre_manager', 'formateur', 'etudiant', 'demandeur', 'entreprise'])
    .withMessage('Type d\'utilisateur invalide'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Erreur de validation',
        errors: errors.array().map(e => {
          const err = e as any;
          return { field: err.path || err.param, message: err.msg };
        })
      });
    }
    next();
  }
];

// Middleware de validation pour la connexion
const validateLogin = [
  body('email').isEmail().withMessage('Email invalide'),
  body('password').notEmpty().withMessage('Le mot de passe est requis'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Erreur de validation',
        errors: errors.array().map(e => {
          const err = e as any;
          return { field: err.path || err.param, message: err.msg };
        })
      });
    }
    next();
  }
];

// Routes d'authentification de base
router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/profile', authMiddleware, getProfile);
router.post('/request-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);
router.get('/verify-email', verifyEmail);

// Routes OAuth
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  handleOAuthCallback('google')
);

router.get('/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

router.get('/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  handleOAuthCallback('facebook')
);

router.get('/linkedin',
  passport.authenticate('linkedin', { state: 'darassa-linkedin' })
);

router.get('/linkedin/callback',
  passport.authenticate('linkedin', { session: false }),
  handleOAuthCallback('linkedin')
);

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
      { id: req.user && typeof req.user === 'object' && '_id' in req.user ? req.user._id : undefined },
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
      { id: req.user && typeof req.user === 'object' && '_id' in req.user ? req.user._id : undefined },
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
  passport.authenticate('linkedin', { state: 'darassa-linkedin' })
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
      { id: req.user && typeof req.user === 'object' && '_id' in req.user ? req.user._id : undefined },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // Rediriger vers le frontend avec le token
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
  }
);

export default router;