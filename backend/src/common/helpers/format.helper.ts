import { config } from '../../config/config';

export const getResetPasswordUrl = (token: string) => {
  return `${config.frontendUrl}/reset-password?token=${token}`;
};

export const getVerificationUrl = (token: string) => {
  return `${config.frontendUrl}/verify-email?token=${token}`;
};

// Ajoutez ici d'autres helpers de formatage (dates, emails, etc.) 