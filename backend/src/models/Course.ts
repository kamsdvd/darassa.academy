import { Schema, model, Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export interface ICourse extends Document {
  title: string;
  description: string;
  price: number;
  duration: number;
  level: string;
  category: string;
  instructor: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export class CourseDto {
  @ApiProperty({ description: 'Titre du cours', example: 'Introduction à React' })
  title: string;

  @ApiProperty({ description: 'Description du cours', example: 'Apprenez les bases de React' })
  description: string;

  @ApiProperty({ description: 'Prix du cours', example: 99.99 })
  price: number;

  @ApiProperty({ description: 'Durée du cours en heures', example: 10 })
  duration: number;

  @ApiProperty({ description: 'Niveau du cours', example: 'débutant', enum: ['débutant', 'intermédiaire', 'avancé'] })
  level: string;

  @ApiProperty({ description: 'Catégorie du cours', example: 'développement web' })
  category: string;

  @ApiProperty({ description: 'ID de l\'instructeur', example: '507f1f77bcf86cd799439011' })
  instructor: string;

  @ApiProperty({ description: 'Date de création', example: '2024-03-20T10:00:00Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Date de mise à jour', example: '2024-03-20T10:00:00Z' })
  updatedAt: Date;
}

const courseSchema = new Schema<ICourse>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  duration: {
    type: Number,
    required: true,
    min: 0,
  },
  level: {
    type: String,
    enum: ['débutant', 'intermédiaire', 'avancé'],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

export const Course = model<ICourse>('Course', courseSchema); 