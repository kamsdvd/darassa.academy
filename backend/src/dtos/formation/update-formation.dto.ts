import {
  IsString,
  IsNumber,
  Min,
  IsOptional,
  IsUrl,
  IsEnum,
  IsArray,
  ValidateNested,
  MaxLength,
  IsDateString,
  ArrayMinSize,
  IsBoolean,
  Matches
} from 'class-validator';
import { Type } from 'class-transformer';

// DTO pour les modules (identique à celui de CreateFormationDto, mais tous les champs internes pourraient aussi être optionnels si la mise à jour partielle des modules est souhaitée)
// Pour simplifier, nous réutilisons la même structure de ModuleDto que pour la création.
// Si un module est fourni dans la mise à jour, il doit être complet selon cette structure.
// Une approche plus avancée permettrait des mises à jour partielles de modules individuels.
class ModuleDto {
  @IsString({ message: "Le titre du module doit être une chaîne de caractères." })
  @IsNotEmpty({ message: "Le titre du module est requis." }) // Si un module est inclus, son titre est requis
  @MaxLength(100, { message: "Le titre du module ne peut pas dépasser 100 caractères."})
  titre: string;

  @IsString({ message: "La description du module doit être une chaîne de caractères." })
  @IsNotEmpty({ message: "La description du module est requise." }) // Si un module est inclus, sa description est requise
  description: string;

  @IsNumber({}, { message: "La durée du module doit être un nombre." })
  @Min(1, { message: "La durée du module doit être d'au moins 1 heure." })  // Si un module est inclus, sa durée est requise
  duree: number;

  @IsArray({ message: "Le contenu du module doit être un tableau de chaînes." })
  @IsString({ each: true, message: "Chaque élément du contenu du module doit être une chaîne." })
  @IsOptional()
  contenu?: string[];

  @IsArray()
  @IsOptional()
  evaluation?: any[];
}

export class UpdateFormationDto {
  @IsOptional()
  @IsString({ message: "Le titre doit être une chaîne de caractères." })
  @IsNotEmpty({ message: "Le titre ne peut pas être vide s'il est fourni." }) // Ne pas permettre une chaîne vide si le champ est présent
  @MaxLength(150, { message: "Le titre ne peut pas dépasser 150 caractères."})
  titre?: string;

  @IsOptional()
  @IsString({ message: "La description doit être une chaîne de caractères." })
  @IsNotEmpty({ message: "La description ne peut pas être vide si elle est fournie." })
  description?: string;

  @IsOptional()
  @IsString({ message: "Le code doit être une chaîne de caractères." })
  @IsNotEmpty({ message: "Le code de formation ne peut pas être vide s'il est fourni." })
  @MaxLength(50, { message: "Le code ne peut pas dépasser 50 caractères."})
  code?: string;

  @IsOptional()
  @IsNumber({}, { message: "La durée doit être un nombre (en heures)." })
  @Min(1, { message: "La durée doit être d'au moins 1 heure." })
  duree?: number;

  @IsOptional()
  @IsEnum(['debutant', 'intermediaire', 'avance', 'expert'], { message: "Niveau invalide." })
  niveau?: 'debutant' | 'intermediaire' | 'avance' | 'expert';

  @IsOptional()
  @IsNumber({}, { message: "Le prix doit être un nombre." })
  @Min(0, { message: "Le prix ne peut pas être négatif." })
  prix?: number;

  @IsOptional()
  @IsArray({ message: "Les prérequis doivent être un tableau de chaînes." })
  @IsString({ each: true, message: "Chaque prérequis doit être une chaîne." })
  prerequis?: string[];

  @IsOptional()
  @IsArray({ message: "Les objectifs doivent être un tableau de chaînes." })
  @IsString({ each: true, message: "Chaque objectif doit être une chaîne." })
  objectifs?: string[];

  @IsOptional()
  @IsArray({ message: "Les compétences doivent être un tableau de chaînes." })
  @IsString({ each: true, message: "Chaque compétence doit être une chaîne." })
  competences?: string[];

  @IsOptional()
  @IsArray({ message: "La liste des modules doit être un tableau."})
  @ValidateNested({ each: true, message: "Chaque module est invalide." })
  @Type(() => ModuleDto)
  @ArrayMinSize(0)
  modules?: ModuleDto[];

  @IsOptional()
  @IsString({ message: "L'ID du centre de formation doit être une chaîne (MongoID)." })
  // Idéalement @IsMongoId()
  centreFormation?: string;

  @IsOptional()
  @IsDateString({}, { message: "La date de début doit être une date valide (format ISO 8601)." })
  dateDebut?: string;

  @IsOptional()
  @IsDateString({}, { message: "La date de fin doit être une date valide (format ISO 8601)." })
  // TODO: Ajouter une validation personnalisée pour s'assurer que dateFin > dateDebut (si les deux sont fournies)
  dateFin?: string;

  @IsOptional()
  @IsNumber({}, { message: "Le nombre de places disponibles doit être un nombre." })
  @Min(0, { message: "Le nombre de places ne peut pas être négatif." })
  placesDisponibles?: number;

  @IsOptional()
  @IsEnum(['planifiee', 'en_cours', 'terminee', 'annulee'], { message: "Statut invalide." })
  statut?: 'planifiee' | 'en_cours' | 'terminee' | 'annulee';

  @IsOptional()
  @IsBoolean({ message: "isActive doit être un booléen."})
  isActive?: boolean;

  @IsOptional()
  @IsUrl({}, { message: "Le lien Google Meet doit être une URL valide." })
  // @Matches(/^https:\/\/meet\.google\.com\/[a-z0-9\-]+$/, { message: 'Le lien Google Meet doit être une URL valide.' })
  googleMeetLink?: string;
}
