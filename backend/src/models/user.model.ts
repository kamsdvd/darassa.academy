// ⚠️ Fichier obsolète depuis la migration vers Prisma/PostgreSQL.
// Toutes les opérations utilisateur sont désormais gérées via Prisma Client.
// Seules les interfaces TypeScript sont conservées ici pour le typage global.

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
}

export interface IAdmin extends IUser {
  userType: 'admin';
  permissions: string[];
  accessLevel: number;
}

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

export interface IFormateur extends IUser {
  userType: 'formateur';
  centreId: string;
  specialites: string[];
  formations: string[];
  evaluations: number;
  disponibilite: boolean;
}

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