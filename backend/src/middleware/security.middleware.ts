import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';
import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import User from '../models/user.model';
import Session from '../models/session.model';
import auditService from '../services/audit.service';

// Rate limiter pour les tentatives de connexion
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 tentatives
  message: 'Trop de tentatives de connexion, réessayez plus tard',
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiter général pour l'API
export const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requêtes par minute
  message: 'Trop de requêtes, veuillez réessayer plus tard',
  standardHeaders: true,
  legacyHeaders: false
});

// Configuration CORS
export const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400 // 24 heures
};

// Middleware de sécurité de base
export const securityMiddleware = [
  helmet(),
  cors(corsOptions),
  apiLimiter
];

// Middleware de vérification de session
export const sessionVerification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return next();
    }

    const session = await Session.findOne({ token });
    if (!session) {
      return res.status(401).json({ message: 'Session invalide' });
    }

    if (session.expiresAt < new Date()) {
      await Session.deleteOne({ _id: session._id });
      return res.status(401).json({ message: 'Session expirée' });
    }

    // Mettre à jour la dernière activité
    session.deviceInfo.lastActive = new Date();
    await session.save();

    next();
  } catch (error) {
    next(error);
  }
};

// Middleware de vérification de verrouillage de compte
export const accountLockCheck = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    if (!email) return next();

    const user = await User.findOne({ email });
    if (!user) return next();

    if (user.lockUntil && user.lockUntil > new Date()) {
      const remainingTime = Math.ceil((user.lockUntil.getTime() - Date.now()) / 1000 / 60);
      return res.status(423).json({
        message: `Compte verrouillé. Réessayez dans ${remainingTime} minutes.`
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

// Middleware de journalisation des actions
export const auditLogMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const originalSend = res.send;
  res.send = function (body) {
    if (req.user) {
      auditService.logAction({
        userId: new Types.ObjectId(req.user.id),
        action: req.method,
        resource: req.path.split('/')[1],
        resourceId: req.params.id,
        details: {
          body: req.body,
          query: req.query,
          statusCode: res.statusCode
        },
        ip: req.ip || req.socket.remoteAddress || 'unknown',
        userAgent: req.headers['user-agent'] || 'unknown'
      }).catch(console.error);
    }
    return originalSend.call(this, body);
  };
  next();
};

// Middleware de vérification de la force du mot de passe
export const passwordStrengthCheck = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  if (!password) return next();

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message: 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial'
    });
    return;
  }

  next();
}; 