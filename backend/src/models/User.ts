import { Schema, model, Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserDto {
  @ApiProperty({ description: 'Email de l\'utilisateur', example: 'user@example.com' })
  email: string;

  @ApiProperty({ description: 'Nom de l\'utilisateur', example: 'John Doe' })
  name: string;

  @ApiProperty({ description: 'Rôle de l\'utilisateur', example: 'user', enum: ['user', 'admin'] })
  role: string;

  @ApiProperty({ description: 'Date de création', example: '2024-03-20T10:00:00Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Date de mise à jour', example: '2024-03-20T10:00:00Z' })
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
}, {
  timestamps: true,
});

export const User = model<IUser>('User', userSchema); 