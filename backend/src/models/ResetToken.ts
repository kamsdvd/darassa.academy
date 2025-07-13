// Modèle ResetToken migré pour Prisma : les types/interfaces sont conservés pour usage dans le code, mais la persistance se fait via Prisma.

import { ApiProperty } from '@nestjs/swagger';

export interface IResetToken extends Document {
  userId: Schema.Types.ObjectId;
  token: string;
  expiresAt: Date;
  used: boolean;
}

const resetTokenSchema = new Schema<IResetToken>({
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
  expiresAt: {
    type: Date,
    required: true
  },
  used: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index pour la suppression automatique des tokens expirés
resetTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const ResetToken = model<IResetToken>('ResetToken', resetTokenSchema); 