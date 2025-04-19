import { Document } from 'mongoose';
import { IUser } from '../models/user.model';

declare global {
  namespace Express {
    interface Request {
      user?: Document<unknown, any, IUser> & IUser;
    }
  }
}

// Assurez-vous que ce fichier est traité comme un module
export {}; 