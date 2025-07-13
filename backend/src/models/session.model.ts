// Modèle Session migré pour Prisma : les types/interfaces sont conservés pour usage dans le code, mais la persistance se fait via Prisma.


export interface ISession extends Document {
  formation: mongoose.Types.ObjectId;
  titre: string;
  description: string;
  type: 'presentiel' | 'hybride' | 'en_ligne';
  dateDebut: Date;
  dateFin: Date;
  duree: number; // en minutes
  formateur: mongoose.Types.ObjectId;
  salle?: {
    nom: string;
    capacite: number;
    equipements: string[];
  };
  lienMeet?: string;
  statut: 'planifiee' | 'en_cours' | 'terminee' | 'annulee';
  participants: {
    etudiant: mongoose.Types.ObjectId;
    presence: 'present' | 'absent' | 'en_ligne' | 'non_defini';
    note?: number;
    commentaire?: string;
  }[];
  materiel: {
    nom: string;
    quantite: number;
    description?: string;
  }[];
  documents: {
    nom: string;
    url: string;
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['presentiel', 'hybride', 'en_ligne'],
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
  duree: {
    type: Number,
    required: true
  },
  formateur: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  salle: {
    nom: String,
    capacite: Number,
    equipements: [String]
  },
  lienMeet: String,
  statut: {
    type: String,
    enum: ['planifiee', 'en_cours', 'terminee', 'annulee'],
    default: 'planifiee'
  },
  participants: [{
    etudiant: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    presence: {
      type: String,
      enum: ['present', 'absent', 'en_ligne', 'non_defini'],
      default: 'non_defini'
    },
    note: Number,
    commentaire: String
  }],
  materiel: [{
    nom: String,
    quantite: Number,
    description: String
  }],
  documents: [{
    nom: String,
    url: String,
    type: String
  }]
}, {
  timestamps: true
});

// Index pour optimiser les recherches
SessionSchema.index({ formation: 1, dateDebut: 1 });
SessionSchema.index({ formateur: 1, dateDebut: 1 });
SessionSchema.index({ statut: 1 });

// Fichier obsolète depuis la migration vers Prisma/PostgreSQL. Toutes les opérations sont désormais gérées via Prisma.