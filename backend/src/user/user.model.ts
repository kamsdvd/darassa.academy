import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

// Interface de base pour tous les utilisateurs
export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  profilePicture?: string;
  userType: 'admin' | 'centre_manager' | 'formateur' | 'etudiant' | 'demandeur' | 'entreprise';
  isActive: boolean;
  isEmailVerified: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Schéma de base pour tous les utilisateurs
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  profilePicture: {
    type: String
  },
  userType: {
    type: String,
    enum: ['admin', 'centre_manager', 'formateur', 'etudiant', 'demandeur', 'entreprise'],
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true,
  discriminatorKey: 'userType'
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    return false;
  }
};

// Modèle de base pour les utilisateurs
export const User = mongoose.model<IUser>('User', userSchema);
