import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import session from 'express-session';

// Import routes depuis leurs dossiers métiers
import authRoutes from './auth/auth.routes';
import usersRoutes from './user/users.routes';
import courseRoutes from './course/course.routes';
import sessionRoutes from './session/session.routes';

// ... autres imports

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(session({
  secret: process.env.JWT_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 heures
  }
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/sessions', sessionRoutes);
// ... autres routes conservées pour le MVP

// ...existing code...
export default app;
// ...existing code...