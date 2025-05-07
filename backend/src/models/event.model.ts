import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  titre: string;
  description: string;
  dateDebut: Date;
  dateFin: Date;
  type: 'formation' | 'session';
  formateur: mongoose.Types.ObjectId;
  salle?: {
    nom: string;
    capacite: number;
  };
  participants: number;
  statut: 'planifie' | 'en_cours' | 'termine' | 'annule';
  formation?: mongoose.Types.ObjectId;
  session?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema: Schema = new Schema({
  titre: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  dateDebut: {
    type: Date,
    required: true
  },
  dateFin: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    enum: ['formation', 'session'],
    required: true
  },
  formateur: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  salle: {
    nom: String,
    capacite: Number
  },
  participants: {
    type: Number,
    default: 0
  },
  statut: {
    type: String,
    enum: ['planifie', 'en_cours', 'termine', 'annule'],
    default: 'planifie'
  },
  formation: {
    type: Schema.Types.ObjectId,
    ref: 'Formation'
  },
  session: {
    type: Schema.Types.ObjectId,
    ref: 'Session'
  }
}, {
  timestamps: true
});

// Index pour optimiser les recherches
EventSchema.index({ dateDebut: 1, dateFin: 1 });
EventSchema.index({ formateur: 1 });
EventSchema.index({ type: 1 });
EventSchema.index({ statut: 1 });

export const Event = mongoose.model<IEvent>('Event', EventSchema); 