import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

export const generateJWT = (payload: object, expiresIn: string = JWT_EXPIRES_IN) => {
  return jwt.sign(payload, JWT_SECRET as string, { expiresIn } as jwt.SignOptions);
};

export const verifyJWT = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

export const generateRandomToken = (size = 32) => {
  return crypto.randomBytes(size).toString('hex');
}; 