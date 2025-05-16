import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { config } from '../../config/config';

export interface TokenPayload {
  id: string;
  userType?: string;
  email?: string;
}

export const generateJWT = (payload: TokenPayload): string => {
  return jwt.sign(payload, config.auth.jwtSecret, { 
    expiresIn: config.auth.jwtExpiresIn 
  });
};

export const verifyJWT = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, config.auth.jwtSecret) as TokenPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, config.auth.jwtSecret, {
    expiresIn: config.auth.refreshTokenExpiresIn
  });
};

export const generateRandomToken = (length: number = 32): string => {
  return crypto.randomBytes(length).toString('hex');
}; 