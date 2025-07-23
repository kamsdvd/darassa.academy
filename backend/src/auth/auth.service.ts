import { PrismaClient, UserType } from '../generated/prisma';
import bcrypt from 'bcrypt';
import * as tokenService from './token.service';
import { IRegisterUserDto } from '../dtos/iregister-user.dto';

const prisma = new PrismaClient();

export async function registerUser(userData: IRegisterUserDto) {
  const { email, password, firstName, lastName, userType } = userData;

  // 1. Vérifier si l'utilisateur existe déjà
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('Un utilisateur avec cet email existe déjà.'); // Remplacer par une erreur HTTP appropriée
  }

  // 2. Hacher le mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Créer l'utilisateur
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      userType: userType as UserType, // S'assurer que le type est correct
    },
  });

  // 4. Générer les tokens
  const tokens = tokenService.generateTokens({ userId: user.id });

  // 5. Retirer le mot de passe de l'objet utilisateur retourné
  const { password: _, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, tokens };
}
