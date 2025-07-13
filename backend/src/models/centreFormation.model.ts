// Modèle CentreFormation migré pour Prisma : les types/interfaces sont conservés pour usage dans le code, mais la persistance se fait via Prisma.


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

// Fichier obsolète depuis la migration vers Prisma/PostgreSQL. Toutes les opérations sont désormais gérées via Prisma.