import nodemailer from 'nodemailer';
import { config } from '../config/config';

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.email.host,
      port: config.email.port,
      secure: config.email.secure,
      auth: {
        user: config.email.user,
        pass: config.email.password
      }
    });
  }

  async sendPasswordResetEmail(email: string, resetToken: string): Promise<void> {
    const resetUrl = `${config.frontendUrl}/reset-password?token=${resetToken}`;
    
    const mailOptions = {
      from: config.email.from,
      to: email,
      subject: 'Réinitialisation de votre mot de passe',
      html: `
        <h1>Réinitialisation de mot de passe</h1>
        <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
        <p>Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>Ce lien expirera dans 1 heure.</p>
        <p>Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.</p>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('✅ Email de réinitialisation envoyé à:', email);
    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
      throw new Error('Erreur lors de l\'envoi de l\'email de réinitialisation');
    }
  }

  async sendVerificationEmail(email: string, verificationToken: string): Promise<void> {
    const verificationUrl = `${config.frontendUrl}/verify-email?token=${verificationToken}`;
    
    const mailOptions = {
      from: config.email.from,
      to: email,
      subject: 'Vérification de votre adresse email',
      html: `
        <h1>Vérification d'email</h1>
        <p>Merci de vous être inscrit sur notre plateforme.</p>
        <p>Cliquez sur le lien ci-dessous pour vérifier votre adresse email :</p>
        <a href="${verificationUrl}">${verificationUrl}</a>
        <p>Ce lien expirera dans 24 heures.</p>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('✅ Email de vérification envoyé à:', email);
    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
      throw new Error('Erreur lors de l\'envoi de l\'email de vérification');
    }
  }
}

export const emailService = new EmailService(); 