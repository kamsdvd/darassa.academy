import mongoose, { Schema, Document } from 'mongoose';

export interface IInvalidToken extends Document {
  token: string;
  createdAt: Date;
}

const invalidTokenSchema = new Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 7 * 24 * 60 * 60 // Supprime automatiquement après 7 jours
  }
});

export default mongoose.model<IInvalidToken>('InvalidToken', invalidTokenSchema); 