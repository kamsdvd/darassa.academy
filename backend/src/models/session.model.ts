import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ISession extends Document {
  userId: Types.ObjectId;
  token: string;
  deviceInfo: {
    userAgent: string;
    ip: string;
    lastActive: Date;
  };
  createdAt: Date;
  expiresAt: Date;
}

const sessionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  deviceInfo: {
    userAgent: String,
    ip: String,
    lastActive: {
      type: Date,
      default: Date.now
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: true
  }
});

// Index pour la recherche rapide
sessionSchema.index({ token: 1 });
sessionSchema.index({ userId: 1 });
sessionSchema.index({ expiresAt: 1 });

export default mongoose.model<ISession>('Session', sessionSchema); 