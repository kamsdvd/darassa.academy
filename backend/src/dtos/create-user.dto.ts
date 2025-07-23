import { IsEmail, IsString, MinLength, IsEnum, IsNotEmpty } from 'class-validator';
import { UserType } from '../generated/prisma';

export class CreateUserDto {
  @IsEmail({}, { message: 'L'email doit être une adresse email valide.' })
  @IsNotEmpty({ message: 'L'email ne peut pas être vide.' })
  email!: string;

  @IsString()
  @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères.' })
  @IsNotEmpty({ message: 'Le mot de passe ne peut pas être vide.' })
  password!: string;

  @IsString()
  @IsNotEmpty({ message: 'Le prénom ne peut pas être vide.' })
  firstName!: string;

  @IsString()
  @IsNotEmpty({ message: 'Le nom de famille ne peut pas être vide.' })
  lastName!: string;

  @IsEnum(UserType, { message: 'Le type d'utilisateur est invalide.' })
  @IsNotEmpty({ message: 'Le type d'utilisateur ne peut pas être vide.' })
  userType!: string;
}
