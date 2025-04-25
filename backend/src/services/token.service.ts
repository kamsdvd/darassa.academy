import jwt, { SignOptions, Secret, JwtPayload } from 'jsonwebtoken';
import InvalidToken from '../models/invalidToken.model';
import { Types } from 'mongoose';

class TokenService {
  private static instance: TokenService;
  private readonly JWT_SECRET: Secret;
  private readonly JWT_EXPIRES_IN: number;

  private constructor() {
    this.JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
    this.JWT_EXPIRES_IN = 24 * 60 * 60; // 1 day in seconds
  }

  public static getInstance(): TokenService {
    if (!TokenService.instance) {
      TokenService.instance = new TokenService();
    }
    return TokenService.instance;
  }

  public generateToken(userId: Types.ObjectId, role: string): string {
    const options: SignOptions = { expiresIn: this.JWT_EXPIRES_IN };
    return jwt.sign(
      { 
        id: userId.toString(),
        role 
      },
      this.JWT_SECRET,
      options
    );
  }

  public async invalidateToken(token: string): Promise<void> {
    await InvalidToken.create({ token });
  }

  public async isTokenInvalid(token: string): Promise<boolean> {
    const invalidToken = await InvalidToken.findOne({ token });
    return !!invalidToken;
  }

  public verifyToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, this.JWT_SECRET) as JwtPayload;
    } catch (error) {
      throw new Error('Token invalide ou expiré');
    }
  }
}

export default TokenService.getInstance(); 