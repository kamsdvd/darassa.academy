// Modèle User migré pour Prisma : les types/interfaces sont conservés pour usage dans le code, mais la persistance se fait via Prisma.

import bcrypt from 'bcrypt';

// Interface de base pour tous les utilisateurs
export interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  profilePicture?: string;
  userType: 'admin' | 'centre_manager' | 'formateur' | 'etudiant' | 'demandeur' | 'entreprise';
  isActive: boolean;
  isEmailVerified: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Schéma de base pour tous les utilisateurs
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  profilePicture: {
    type: String
  },
  userType: {
    type: String,
    enum: ['admin', 'centre_manager', 'formateur', 'etudiant', 'demandeur', 'entreprise'],
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true,
  discriminatorKey: 'userType'
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    console.log('🔐 Comparaison des mots de passe pour:', this.email);
    console.log('Mot de passe candidat:', candidatePassword);
    console.log('Mot de passe hashé:', this.password);
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    console.log('Résultat de la comparaison:', isMatch);
    return isMatch;
  } catch (error) {
    console.error('❌ Erreur lors de la comparaison des mots de passe:', error);
    return false;
  }
};

// Modèle de base pour les utilisateurs
export const User = mongoose.model<IUser>('User', userSchema);

// Interfaces et schémas pour les différents types d'utilisateurs

// 1. Administrateur
export interface IAdmin extends IUser {
  userType: 'admin';
  permissions: string[];
  accessLevel: number;
}

const adminSchema = new Schema({
  permissions: [{
    type: String
  }],
  accessLevel: {
    type: Number,
    default: 1
  }
});

// 2. Gestionnaire de centre de formation
export interface ICentreManager extends IUser {
  userType: 'centre_manager';
  centres: string[];
  permissions: {
    canManageFormateurs: boolean;
    canManageFormations: boolean;
    canValidateCertifications: boolean;
    canViewReports: boolean;
  };
}

const centreManagerSchema = new Schema({
  centres: [{
    type: Schema.Types.ObjectId,
    ref: 'CentreFormation'
  }],
  permissions: {
    canManageFormateurs: {
      type: Boolean,
      default: true
    },
    canManageFormations: {
      type: Boolean,
      default: true
    },
    canValidateCertifications: {
      type: Boolean,
      default: true
    },
    canViewReports: {
      type: Boolean,
      default: true
    }
  }
});

// 3. Formateur
export interface IFormateur extends IUser {
  userType: 'formateur';
  centreId: string;
  specialites: string[];
  formations: string[];
  evaluations: number;
  disponibilite: boolean;
}

const formateurSchema = new Schema({
  centreId: {
    type: Schema.Types.ObjectId,
    ref: 'CentreFormation',
    required: true
  },
  specialites: [{
    type: String
  }],
  formations: [{
    type: Schema.Types.ObjectId,
    ref: 'Formation'
  }],
  evaluations: {
    type: Number,
    default: 0
  },
  disponibilite: {
    type: Boolean,
    default: true
  }
});

// 4. Étudiant
export interface IEtudiant extends IUser {
  userType: 'etudiant';
  centreId?: string;
  formationsInscrites: {
    formationId: string;
    centreId: string;
    dateInscription: Date;
    progression: number;
    certificatObtenu: boolean;
  }[];
  competencesAcquises: string[];
}

const etudiantSchema = new Schema({
  centreId: {
    type: Schema.Types.ObjectId,
    ref: 'CentreFormation'
  },
  formationsInscrites: [{
    formationId: {
      type: Schema.Types.ObjectId,
      ref: 'Formation'
    },
    centreId: {
      type: Schema.Types.ObjectId,
      ref: 'CentreFormation'
    },
    dateInscription: {
      type: Date,
      default: Date.now
    },
    progression: {
      type: Number,
      default: 0
    },
    certificatObtenu: {
      type: Boolean,
      default: false
    }
  }],
  competencesAcquises: [{
    type: String
  }]
});

// 5. Demandeur d'emploi
export interface IDemandeurEmploi extends IUser {
  userType: 'demandeur';
  competences: string[];
  experience: {
    entreprise: string;
    poste: string;
    periode: string;
    description: string;
  }[];
  education: {
    institution: string;
    diplome: string;
    annee: string;
  }[];
  cv: string;
  disponibilite: 'immediate' | 'deux_semaines' | 'un_mois' | 'plus';
  rechercheEmploi: boolean;
  formationsInscrites: string[];
}

const demandeurEmploiSchema = new Schema({
  competences: [{
    type: String
  }],
  experience: [{
    entreprise: String,
    poste: String,
    periode: String,
    description: String
  }],
  education: [{
    institution: String,
    diplome: String,
    annee: String
  }],
  cv: String,
  disponibilite: {
    type: String,
    enum: ['immediate', 'deux_semaines', 'un_mois', 'plus'],
    default: 'immediate'
  },
  rechercheEmploi: {
    type: Boolean,
    default: true
  },
  formationsInscrites: [{
    type: Schema.Types.ObjectId,
    ref: 'Formation'
  }]
});

// 6. Entreprise
export interface IEntreprise extends IUser {
  userType: 'entreprise';
  nomEntreprise: string;
  secteur: string;
  taille: 'startup' | 'pme' | 'grande_entreprise';
  adresse: string;
  siteWeb?: string;
  description: string;
  logo?: string;
  offresEmploi: string[];
  formationsProposees: string[];
}

const entrepriseSchema = new Schema({
  nomEntreprise: {
    type: String,
    required: true
  },
  secteur: {
    type: String,
    required: true
  },
  taille: {
    type: String,
    enum: ['startup', 'pme', 'grande_entreprise'],
    required: true
  },
  adresse: {
    type: String,
    required: true
  },
  siteWeb: String,
  description: String,
  logo: String,
  offresEmploi: [{
    type: Schema.Types.ObjectId,
    ref: 'OffreEmploi'
  }],
  formationsProposees: [{
    type: Schema.Types.ObjectId,
    ref: 'Formation'
  }]
});

// Création des modèles discriminés
export const Admin = User.discriminator<IAdmin>('admin', adminSchema);
export const CentreManager = User.discriminator<ICentreManager>('centre_manager', centreManagerSchema);
export const Formateur = User.discriminator<IFormateur>('formateur', formateurSchema);
export const Etudiant = User.discriminator<IEtudiant>('etudiant', etudiantSchema);
export const DemandeurEmploi = User.discriminator<IDemandeurEmploi>('demandeur', demandeurEmploiSchema);
export const Entreprise = User.discriminator<IEntreprise>('entreprise', entrepriseSchema); 