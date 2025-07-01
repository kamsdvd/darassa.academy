import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional,
  IsUrl,
  IsEnum,
  IsArray,
  ValidateNested,
  MaxLength,
  IsDateString, // Pour valider les chaînes de date ISO
  ArrayMinSize,
  IsBoolean,
  Matches
} from 'class-validator';
import { Type } from 'class-transformer'; // Pour la transformation des objets imbriqués

// DTO pour les évaluations à l'intérieur d'un module (si besoin de validation poussée)
// Pour l'instant, on ne valide pas en profondeur la structure de IEvaluation,
// mais on pourrait créer un EvaluationModuleDto si nécessaire.

// DTO pour les modules
class ModuleDto {
  @IsString({ message: "Le titre du module doit être une chaîne de caractères." })
  @IsNotEmpty({ message: "Le titre du module est requis." })
  @MaxLength(100, { message: "Le titre du module ne peut pas dépasser 100 caractères."})
  titre: string;

  @IsString({ message: "La description du module doit être une chaîne de caractères." })
  @IsNotEmpty({ message: "La description du module est requise." })
  description: string;

  @IsNumber({}, { message: "La durée du module doit être un nombre." })
  @Min(1, { message: "La durée du module doit être d'au moins 1 heure." })
  duree: number;

  @IsArray({ message: "Le contenu du module doit être un tableau de chaînes." })
  @IsString({ each: true, message: "Chaque élément du contenu du module doit être une chaîne." })
  @IsOptional()
  contenu?: string[];

  // Pour l'instant, on ne valide pas la structure interne de 'evaluation' dans ModuleDto
  // car IEvaluation n'est pas exporté et sa structure peut être flexible.
  // Si une validation stricte est nécessaire, il faudrait un EvaluationItemDto.
  @IsArray()
  @IsOptional()
  evaluation?: any[]; // ou definir un EvaluationItemDto et utiliser @ValidateNested({ each: true })
}

export class CreateFormationDto {
  @IsString({ message: "Le titre doit être une chaîne de caractères." })
  @IsNotEmpty({ message: "Le titre est requis." })
  @MaxLength(150, { message: "Le titre ne peut pas dépasser 150 caractères."})
  titre: string;

  @IsString({ message: "La description doit être une chaîne de caractères." })
  @IsNotEmpty({ message: "La description est requise." })
  description: string;

  @IsString({ message: "Le code doit être une chaîne de caractères." })
  @IsNotEmpty({ message: "Le code de formation est requis." })
  @MaxLength(50, { message: "Le code ne peut pas dépasser 50 caractères."})
  // L'unicité du code sera gérée par l'index de la base de données, mais un check service pourrait exister.
  code: string;

  @IsString({ message: "La catégorie doit être une chaîne de caractères." })
  @IsNotEmpty({ message: "La catégorie est requise." })
  @MaxLength(100, { message: "La catégorie ne peut pas dépasser 100 caractères."})
  category: string;

  @IsNumber({}, { message: "La durée doit être un nombre (en heures)." })
  @Min(1, { message: "La durée doit être d'au moins 1 heure." })
  duree: number;

  @IsEnum(['debutant', 'intermediaire', 'avance', 'expert'], { message: "Niveau invalide." })
  @IsNotEmpty({ message: "Le niveau est requis." })
  niveau: 'debutant' | 'intermediaire' | 'avance' | 'expert';

  @IsNumber({}, { message: "Le prix doit être un nombre." })
  @Min(0, { message: "Le prix ne peut pas être négatif." })
  prix: number;

  @IsArray({ message: "Les prérequis doivent être un tableau de chaînes." })
  @IsString({ each: true, message: "Chaque prérequis doit être une chaîne." })
  @IsOptional()
  prerequis?: string[];

  @IsArray({ message: "Les objectifs doivent être un tableau de chaînes." })
  @IsString({ each: true, message: "Chaque objectif doit être une chaîne." })
  @IsOptional()
  objectifs?: string[];

  @IsArray({ message: "Les compétences doivent être un tableau de chaînes." })
  @IsString({ each: true, message: "Chaque compétence doit être une chaîne." })
  @IsOptional()
  competences?: string[];

  @IsArray({ message: "La liste des modules doit être un tableau."})
  @ValidateNested({ each: true, message: "Chaque module est invalide." })
  @Type(() => ModuleDto) // Important pour que class-validator valide les objets imbriqués
  @IsOptional()
  @ArrayMinSize(0) // Peut être vide, mais si fourni, doit être un tableau de ModuleDto
  modules?: ModuleDto[];

  // formateurs: string[]; // Seraient des IDs. Validation IsMongoId (si on utilise mongoose) ou IsUUID etc.
  // Pour l'instant, on suppose que le service gère l'association des formateurs.
  // Si les IDs sont envoyés dans le body, il faudrait les valider ici.
  // @IsArray()
  // @IsMongoId({ each: true, message: "Chaque ID de formateur doit être un MongoID valide."})
  // @IsOptional()
  // formateurs?: string[];


  @IsString({ message: "L'ID du centre de formation doit être une chaîne (MongoID)." })
  @IsNotEmpty({ message: "L'ID du centre de formation est requis." })
  // Idéalement @IsMongoId() si on est sûr que c'est un MongoID
  centreFormation: string;

  @IsDateString({}, { message: "La date de début doit être une date valide (format ISO 8601)." })
  @IsNotEmpty({ message: "La date de début est requise." })
  dateDebut: string; // ou Date, mais IsDateString est plus courant pour les DTOs JSON

  @IsDateString({}, { message: "La date de fin doit être une date valide (format ISO 8601)." })
  @IsNotEmpty({ message: "La date de fin est requise." })
  // TODO: Ajouter une validation personnalisée pour s'assurer que dateFin > dateDebut
  dateFin: string;

  @IsNumber({}, { message: "Le nombre de places disponibles doit être un nombre." })
  @Min(0, { message: "Le nombre de places ne peut pas être négatif." })
  placesDisponibles: number;

  @IsEnum(['planifiee', 'en_cours', 'terminee', 'annulee'], { message: "Statut invalide." })
  @IsOptional()
  statut?: 'planifiee' | 'en_cours' | 'terminee' | 'annulee';

  // Les inscriptions et évaluations ne sont généralement pas fournies à la création.
  // documents: IDocument[]; // La gestion des uploads de documents est un flux séparé.

  @IsBoolean({ message: "isActive doit être un booléen."})
  @IsOptional()
  isActive?: boolean;

  @IsOptional()
  @IsUrl({}, { message: "Le lien Google Meet doit être une URL valide." })
  // Pour une validation plus stricte du format spécifique à Google Meet:
  // @Matches(/^https:\/\/meet\.google\.com\/[a-z0-9\-]+$/, { message: 'Le lien Google Meet doit être une URL valide (ex: https://meet.google.com/xxx-xxxx-xxx)' })
  googleMeetLink?: string;
}
