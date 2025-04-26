import mongoose, { Document, Schema } from 'mongoose';

interface ISalle {
  nom: string;
  capacite: number;
  equipements: string[];
  description?: string;
}

export interface ICentreFormation extends Document {
  nom: string;
  code: string;
  adresse: {
    rue: string;
    ville: string;
    codePostal: string;
    pays: string;
  };
  contact: {
    email: string;
    telephone: string;
    siteWeb?: string;
  };
  directeur: string;
  dateCreation: Date;
  agrements: {
    numero: string;
    date: Date;
    validite: Date;
    type: string;
  }[];
  capaciteAccueil: number;
  equipements: {
    nom: string;
    quantite: number;
    description?: string;
  }[];
  salles: ISalle[];
  formations: string[];
  formateurs: string[];
  etudiants: string[];
  evaluations: {
    note: number;
    commentaire: string;
    date: Date;
    auteur: string;
  }[];
  documents: {
    type: string;
    url: string;
    dateAjout: Date;
    description?: string;
  }[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  verifierDisponibiliteSalle(nomSalle: string): boolean;
  calculerTauxOccupation(): number;
}

const centreFormationSchema = new Schema({
  nom: {
    type: String,
    required: true,
    trim: true
  },
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  adresse: {
    rue: {
      type: String,
      required: true
    },
    ville: {
      type: String,
      required: true
    },
    codePostal: {
      type: String,
      required: true
    },
    pays: {
      type: String,
      required: true
    }
  },
  contact: {
    email: {
      type: String,
      required: true,
      trim: true
    },
    telephone: {
      type: String,
      required: true
    },
    siteWeb: String
  },
  directeur: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dateCreation: {
    type: Date,
    required: true
  },
  agrements: [{
    numero: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    validite: {
      type: Date,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  }],
  capaciteAccueil: {
    type: Number,
    required: true
  },
  equipements: [{
    nom: {
      type: String,
      required: true
    },
    quantite: {
      type: Number,
      required: true
    },
    description: String
  }],
  salles: [{
    nom: {
      type: String,
      required: true
    },
    capacite: {
      type: Number,
      required: true
    },
    equipements: [{
      type: String
    }],
    description: String
  }],
  formations: [{
    type: Schema.Types.ObjectId,
    ref: 'Formation'
  }],
  formateurs: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  etudiants: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  evaluations: [{
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
    },
    auteur: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
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
  }
}, {
  timestamps: true
});

// Méthode pour vérifier la disponibilité d'une salle
centreFormationSchema.methods.verifierDisponibiliteSalle = function(nomSalle: string): boolean {
  const salle = this.salles.find((s: ISalle) => s.nom === nomSalle);
  return !!salle;
};

// Méthode pour calculer le taux d'occupation du centre
centreFormationSchema.methods.calculerTauxOccupation = function(): number {
  const totalEtudiants = this.etudiants.length;
  return (totalEtudiants / this.capaciteAccueil) * 100;
};

// Index pour la recherche
centreFormationSchema.index({ nom: 'text', 'adresse.ville': 'text' });

export const CentreFormation = mongoose.model<ICentreFormation>('CentreFormation', centreFormationSchema); 