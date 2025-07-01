import mongoose, { Document, Schema } from 'mongoose';

interface IEvaluation {
  type: string;
  description: string;
  coefficient: number;
}

interface IModule {
  titre: string;
  description: string;
  duree: number;
  contenu: string[];
  evaluation: IEvaluation[];
}

interface IInscription {
  etudiant: string;
  dateInscription: Date;
  statut: 'en_attente' | 'acceptee' | 'refusee' | 'annulee';
  paiement: {
    montant: number;
    date: Date;
    methode: string;
    reference: string;
  };
}

interface IEvaluationFormation {
  etudiant: string;
  note: number;
  commentaire: string;
  date: Date;
}

interface IDocument {
  type: string;
  url: string;
  dateAjout: Date;
  description?: string;
}

export interface IFormation extends Document {
  titre: string;
  description: string;
  code: string;
  duree: number;
  niveau: string;
  prix: number;
  prerequis: string[];
  objectifs: string[];
  competences: string[];
  modules: IModule[];
  formateurs: string[];
  centreFormation: string;
  dateDebut: Date;
  dateFin: Date;
  placesDisponibles: number;
  statut: 'planifiee' | 'en_cours' | 'terminee' | 'annulee';
  inscriptions: IInscription[];
  evaluations: IEvaluationFormation[];
  documents: IDocument[];
  isActive: boolean;
  googleMeetLink?: string; // Nouveau champ
  createdAt: Date;
  updatedAt: Date;
  calculerMoyenneEvaluations(): number;
  verifierDisponibilite(): boolean;
}

const formationSchema = new Schema({
  titre: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  duree: {
    type: Number,
    required: true,
    min: 1
  },
  niveau: {
    type: String,
    required: true,
    enum: ['debutant', 'intermediaire', 'avance', 'expert']
  },
  prix: {
    type: Number,
    required: true,
    min: 0
  },
  prerequis: [{
    type: String
  }],
  objectifs: [{
    type: String
  }],
  competences: [{
    type: String
  }],
  modules: [{
    titre: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    duree: {
      type: Number,
      required: true,
      min: 1
    },
    contenu: [{
      type: String
    }],
    evaluation: [{
      type: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      coefficient: {
        type: Number,
        required: true,
        min: 0,
        max: 1
      }
    }]
  }],
  formateurs: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  centreFormation: {
    type: Schema.Types.ObjectId,
    ref: 'CentreFormation',
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
  placesDisponibles: {
    type: Number,
    required: true,
    min: 0
  },
  statut: {
    type: String,
    required: true,
    enum: ['planifiee', 'en_cours', 'terminee', 'annulee'],
    default: 'planifiee'
  },
  inscriptions: [{
    etudiant: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    dateInscription: {
      type: Date,
      default: Date.now
    },
    statut: {
      type: String,
      required: true,
      enum: ['en_attente', 'acceptee', 'refusee', 'annulee'],
      default: 'en_attente'
    },
    paiement: {
      montant: {
        type: Number,
        required: true
      },
      date: {
        type: Date,
        required: true
      },
      methode: {
        type: String,
        required: true
      },
      reference: {
        type: String,
        required: true
      }
    }
  }],
  evaluations: [{
    etudiant: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    note: {
      type: Number,
      required: true,
      min: 0,
      max: 5
    },
    commentaire: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  documents: [{
    type: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    dateAjout: {
      type: Date,
      default: Date.now
    },
    description: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  googleMeetLink: { // Nouveau champ
    type: String,
    required: false,
    trim: true,
    // On pourrait ajouter une validation regex pour le format du lien Google Meet ici si besoin
    // match: /^https:\/\/meet\.google\.com\/[a-z\-]+$/
  }
}, {
  timestamps: true
});

// Méthode pour calculer la moyenne des évaluations
formationSchema.methods.calculerMoyenneEvaluations = function(): number {
  if (this.evaluations.length === 0) return 0;
  const somme = this.evaluations.reduce((acc: number, evaluation: IEvaluationFormation) => acc + evaluation.note, 0);
  return somme / this.evaluations.length;
};

// Méthode pour vérifier la disponibilité
formationSchema.methods.verifierDisponibilite = function(): boolean {
  return this.placesDisponibles > 0 && this.statut === 'planifiee';
};

// Index pour la recherche
formationSchema.index({ titre: 'text', description: 'text', competences: 'text' });

export const Formation = mongoose.model<IFormation>('Formation', formationSchema); 