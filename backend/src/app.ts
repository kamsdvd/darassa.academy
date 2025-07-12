import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import session from 'express-session';
import authRoutes from './routes/auth.routes';
import centreRoutes from './routes/centre.routes';
import calendarRoutes from './routes/calendar.routes';
import googleAuthRoutes from './routes/google-auth.routes';
import eventRoutes from './routes/event.routes';
import usersRoutes from './user/users.routes';
import courseRoutes from './routes/course.routes'; // Import course routes
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
app.use('/api/centre', centreRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/google', googleAuthRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/courses', courseRoutes); // Register course routes
// ... autres routes

// ... reste du code

export default app; 