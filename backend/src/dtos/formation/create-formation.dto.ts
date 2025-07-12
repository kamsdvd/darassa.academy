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

class ModuleDto {
  @IsString()
  @IsNotEmpty({ message: "Le titre du module est requis." })
  @MaxLength(100, { message: "Le titre du module ne peut pas dépasser 100 caractères." })
  titre!: string;

  @IsString()
  @IsNotEmpty({ message: "La description du module est requise." })
  description!: string;

  @IsNumber()
  @Min(1, { message: "La durée du module doit être d'au moins 1 heure." })
  duree!: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  contenu?: string[];

  @IsArray()
  @IsOptional()
  evaluation?: any[];
}
export class CreateFormationDto {
  @IsString()
  @IsNotEmpty({ message: "Le titre est requis." })
  @MaxLength(150, { message: "Le titre ne peut pas dépasser 150 caractères." })
  titre!: string;

  @IsString()
  @IsNotEmpty({ message: "La description est requise." })
  description!: string;

  @IsString()
  @IsNotEmpty({ message: "Le code de formation est requis." })
  @MaxLength(50, { message: "Le code ne peut pas dépasser 50 caractères." })
  code!: string;

  @IsString()
  @IsNotEmpty({ message: "La catégorie est requise." })
  @MaxLength(100, { message: "La catégorie ne peut pas dépasser 100 caractères." })
  category!: string;

  @IsNumber()
  @Min(1, { message: "La durée doit être d'au moins 1 heure." })
  duree!: number;

  @IsEnum(['debutant', 'intermediaire', 'avance', 'expert'])
  @IsNotEmpty({ message: "Le niveau est requis." })
  niveau!: 'debutant' | 'intermediaire' | 'avance' | 'expert';

  @IsNumber()
  @Min(0, { message: "Le prix ne peut pas être négatif." })
  prix!: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  prerequis?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  objectifs?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  competences?: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ModuleDto)
  @IsOptional()
  @ArrayMinSize(0)
  modules?: ModuleDto[];

  @IsString()
  @IsNotEmpty({ message: "L'ID du centre de formation est requis." })
  centreFormation!: string;

  @IsDateString()
  @IsNotEmpty({ message: "La date de début est requise." })
  dateDebut!: string;

  @IsDateString()
  @IsNotEmpty({ message: "La date de fin est requise." })
  dateFin!: string;

  @IsNumber()
  @Min(0, { message: "Le nombre de places ne peut pas être négatif." })
  placesDisponibles!: number;

  @IsEnum(['planifiee', 'en_cours', 'terminee', 'annulee'])
  @IsOptional()
  statut?: 'planifiee' | 'en_cours' | 'terminee' | 'annulee';

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsOptional()
  @IsUrl()
  googleMeetLink?: string;
}
