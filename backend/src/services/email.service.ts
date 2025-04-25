import nodemailer from 'nodemailer';
import { createTransport } from 'nodemailer';
import { readFileSync } from 'fs';
import { join } from 'path';
import Handlebars from 'handlebars';

class EmailService {
  private static instance: EmailService;
  private transporter: nodemailer.Transporter;
  private templates: { [key: string]: HandlebarsTemplateDelegate } = {};

  private constructor() {
    this.transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // Charger les templates
    this.loadTemplates();
  }

  public static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  private loadTemplates() {
    const templateNames = [
      'email-verification',
      'password-reset',
      'new-login-alert',
      'welcome'
    ];

    templateNames.forEach(name => {
      const templatePath = join(__dirname, '../templates/emails', `${name}.hbs`);
      const templateContent = readFileSync(templatePath, 'utf-8');
      this.templates[name] = Handlebars.compile(templateContent);
    });
  }

  public async sendEmail(to: string, subject: string, template: string, data: any) {
    try {
      const templateFn = this.templates[template];
      if (!templateFn) {
        throw new Error(`Template ${template} non trouvé`);
      }

      const html = templateFn(data);

      await this.transporter.sendMail({
        from: process.env.SMTP_FROM,
        to,
        subject,
        html
      });

      return true;
    } catch (error) {
      console.error('Erreur d\'envoi d\'email:', error);
      throw error;
    }
  }

  public async sendVerificationEmail(email: string, token: string) {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;
    return this.sendEmail(
      email,
      'Vérifiez votre email',
      'email-verification',
      { verificationUrl }
    );
  }

  public async sendPasswordResetEmail(email: string, token: string) {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    return this.sendEmail(
      email,
      'Réinitialisation de mot de passe',
      'password-reset',
      { resetUrl }
    );
  }

  public async sendNewLoginAlert(email: string, deviceInfo: any) {
    return this.sendEmail(
      email,
      'Nouvelle connexion détectée',
      'new-login-alert',
      { deviceInfo }
    );
  }
}

export default EmailService.getInstance(); 