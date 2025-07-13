// Modèle Event migré pour Prisma : les types/interfaces sont conservés pour usage dans le code, mais la persistance se fait via Prisma.

import { IUser } from './user.model';
import { IFormation } from './formation.model';
import { ISession } from './session.model';

export interface IEvent extends Document {
  titre: string;
  description: string;
  dateDebut: Date;
  dateFin: Date;
  type: 'formation' | 'session';
  formateur: PopulatedDoc<Document<mongoose.Types.ObjectId> & IUser>;
  salle?: {
    nom: string;
    capacite: number;
  };
  participants: number;
  statut: 'planifie' | 'en_cours' | 'termine' | 'annule';
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

// Fichier obsolète depuis la migration vers Prisma/PostgreSQL. Toutes les opérations sont désormais gérées via Prisma.