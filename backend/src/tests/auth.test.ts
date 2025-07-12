import axios from 'axios';
import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../app';
import { User } from '../user/user.model';
import { ResetToken } from '../models/ResetToken';
import { emailService } from '../services/email.service';
import passport from 'passport';

const API_URL = 'http://localhost:5000/api';

const testAccounts = [
  {
    email: 'admin@darassa.academy',
    password: 'admin123',
    userType: 'admin'
  },
  {
    email: 'manager@cfdd.sn',
    password: 'manager123',
    userType: 'centre_manager'
  },
  {
    email: 'formateur1@cfdd.sn',
    password: 'formateur123',
    userType: 'formateur'
  },
  {
    email: 'etudiant1@example.com',
    password: 'etudiant123',
    userType: 'etudiant'
  },
  {
    email: 'demandeur1@example.com',
    password: 'demandeur123',
    userType: 'demandeur'
  },
  {
    email: 'contact@techsolutions.sn',
    password: 'entreprise123',
    userType: 'entreprise'
  }
];

const testAuth = async () => {
  console.log('Démarrage des tests d\'authentification...\n');

  for (const account of testAccounts) {
    try {
      console.log(`Test de connexion pour ${account.email}...`);
      console.log('Données envoyées:', {
        email: account.email,
        password: account.password
      });
      
      // Test de connexion
      const loginResponse = await axios.post(`${API_URL}/auth/login`, {
        email: account.email,
        password: account.password
      });

      console.log('Réponse du serveur:', {
        status: loginResponse.status,
        data: loginResponse.data
      });

      if (loginResponse.data.token) {
        console.log('✅ Connexion réussie');
        console.log(`Token reçu: ${loginResponse.data.token.substring(0, 20)}...`);
        console.log(`Type d'utilisateur: ${loginResponse.data.user.userType}`);
        
        // Test de récupération du profil
        const profileResponse = await axios.get(`${API_URL}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${loginResponse.data.token}`
          }
        });

        if (profileResponse.data) {
          console.log('✅ Récupération du profil réussie');
          console.log('Données du profil:', profileResponse.data);
        }
      }
    } catch (error: any) {
      console.error('❌ Erreur lors du test:');
      if (error.response) {
        console.error('Réponse du serveur:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        });
      } else if (error.request) {
        console.error('Pas de réponse du serveur:', error.message);
      } else {
        console.error('Erreur:', error.message);
      }
    }
    console.log('----------------------------------------\n');
  }
};

// Exécuter les tests
testAuth().catch(console.error);

// Mock du service d'email
jest.mock('../services/email.service', () => ({
  emailService: {
    sendPasswordResetEmail: jest.fn(),
    sendVerificationEmail: jest.fn()
  }
}));

describe('Auth Controller', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test');
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
    await ResetToken.deleteMany({});
    jest.clearAllMocks();
  });

  describe('Password Reset', () => {
    it('should send reset email for existing user', async () => {
      const user = await User.create({
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
        userType: 'etudiant'
      });

      const response = await request(app)
        .post('/api/auth/request-reset')
        .send({ email: user.email });

      expect(response.status).toBe(200);
      expect(emailService.sendPasswordResetEmail).toHaveBeenCalled();
      
      const resetToken = await ResetToken.findOne({ userId: user._id });
      expect(resetToken).toBeTruthy();
      expect(resetToken?.used).toBe(false);
    });

    it('should not send reset email for non-existing user', async () => {
      const response = await request(app)
        .post('/api/auth/request-reset')
        .send({ email: 'nonexistent@example.com' });

      expect(response.status).toBe(404);
      expect(emailService.sendPasswordResetEmail).not.toHaveBeenCalled();
    });

    it('should reset password with valid token', async () => {
      const user = await User.create({
        email: 'test@example.com',
        password: 'oldpassword',
        firstName: 'Test',
        lastName: 'User',
        userType: 'etudiant'
      });

      const resetToken = await ResetToken.create({
        userId: user._id,
        token: 'valid-token',
        expiresAt: new Date(Date.now() + 3600000)
      });

      const response = await request(app)
        .post('/api/auth/reset-password')
        .send({
          token: resetToken.token,
          password: 'newpassword'
        });

      expect(response.status).toBe(200);

      const updatedUser = await User.findById(user._id);
      expect(await updatedUser?.comparePassword('newpassword')).toBe(true);

      const usedToken = await ResetToken.findById(resetToken._id);
      expect(usedToken?.used).toBe(true);
    });

    it('should not reset password with expired token', async () => {
      const user = await User.create({
        email: 'test@example.com',
        password: 'oldpassword',
        firstName: 'Test',
        lastName: 'User',
        userType: 'etudiant'
      });

      const resetToken = await ResetToken.create({
        userId: user._id,
        token: 'expired-token',
        expiresAt: new Date(Date.now() - 3600000)
      });

      const response = await request(app)
        .post('/api/auth/reset-password')
        .send({
          token: resetToken.token,
          password: 'newpassword'
        });

      expect(response.status).toBe(400);
    });
  });

  describe('Email Verification', () => {
    it('should verify email with valid token', async () => {
      const user = await User.create({
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
        userType: 'etudiant',
        isEmailVerified: false
      });

      const verificationToken = await ResetToken.create({
        userId: user._id,
        token: 'valid-token',
        expiresAt: new Date(Date.now() + 3600000)
      });

      const response = await request(app)
        .get(`/api/auth/verify-email?token=${verificationToken.token}`);

      expect(response.status).toBe(200);

      const updatedUser = await User.findById(user._id);
      expect(updatedUser?.isEmailVerified).toBe(true);

      const usedToken = await ResetToken.findById(verificationToken._id);
      expect(usedToken?.used).toBe(true);
    });

    it('should not verify email with expired token', async () => {
      const user = await User.create({
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
        userType: 'etudiant',
        isEmailVerified: false
      });

      const verificationToken = await ResetToken.create({
        userId: user._id,
        token: 'expired-token',
        expiresAt: new Date(Date.now() - 3600000)
      });

      const response = await request(app)
        .get(`/api/auth/verify-email?token=${verificationToken.token}`);

      expect(response.status).toBe(400);

      const updatedUser = await User.findById(user._id);
      expect(updatedUser?.isEmailVerified).toBe(false);
    });
  });

  describe('Google Authentication', () => {
    it('should redirect to Google OAuth', async () => {
      const response = await request(app)
        .get('/api/auth/google');

      expect(response.status).toBe(302);
      expect(response.header.location).toContain('accounts.google.com');
    });

    it('should handle Google callback and create new user', async () => {
      const mockGoogleProfile = {
        id: '123456789',
        emails: [{ value: 'test@example.com' }],
        name: {
          givenName: 'Test',
          familyName: 'User'
        },
        photos: [{ value: 'https://example.com/photo.jpg' }]
      };

      // Mock passport.authenticate
      jest.spyOn(passport, 'authenticate').mockImplementation(() => (req, res, next) => {
        req.user = mockGoogleProfile;
        next();
      });

      const response = await request(app)
        .get('/api/auth/google/callback');

      expect(response.status).toBe(302);
      expect(response.header.location).toContain('/auth/callback?token=');

      // Vérifier que l'utilisateur a été créé
      const user = await User.findOne({ email: mockGoogleProfile.emails[0].value });
      expect(user).toBeTruthy();
      expect(user?.firstName).toBe(mockGoogleProfile.name.givenName);
      expect(user?.lastName).toBe(mockGoogleProfile.name.familyName);
      expect(user?.isEmailVerified).toBe(true);
    });

    it('should handle Google callback for existing user', async () => {
      // Créer un utilisateur existant
      const existingUser = await User.create({
        email: 'existing@example.com',
        password: 'password123',
        firstName: 'Existing',
        lastName: 'User',
        userType: 'etudiant'
      });

      const mockGoogleProfile = {
        id: '987654321',
        emails: [{ value: existingUser.email }],
        name: {
          givenName: 'Existing',
          familyName: 'User'
        }
      };

      // Mock passport.authenticate
      jest.spyOn(passport, 'authenticate').mockImplementation(() => (req, res, next) => {
        req.user = mockGoogleProfile;
        next();
      });

      const response = await request(app)
        .get('/api/auth/google/callback');

      expect(response.status).toBe(302);
      expect(response.header.location).toContain('/auth/callback?token=');

      // Vérifier que l'utilisateur n'a pas été modifié
      const user = await User.findOne({ email: existingUser.email });
      expect(user?._id.toString()).toBe(existingUser._id.toString());
    });
  });

  describe('Facebook Authentication', () => {
    it('should redirect to Facebook OAuth', async () => {
      const response = await request(app)
        .get('/api/auth/facebook');

      expect(response.status).toBe(302);
      expect(response.header.location).toContain('facebook.com');
    });

    it('should handle Facebook callback and create new user', async () => {
      const mockFacebookProfile = {
        id: '123456789',
        emails: [{ value: 'test@example.com' }],
        name: {
          givenName: 'Test',
          familyName: 'User'
        },
        photos: [{ value: 'https://example.com/photo.jpg' }]
      };

      // Mock passport.authenticate
      jest.spyOn(passport, 'authenticate').mockImplementation(() => (req, res, next) => {
        req.user = mockFacebookProfile;
        next();
      });

      const response = await request(app)
        .get('/api/auth/facebook/callback');

      expect(response.status).toBe(302);
      expect(response.header.location).toContain('/auth/callback?token=');

      // Vérifier que l'utilisateur a été créé
      const user = await User.findOne({ email: mockFacebookProfile.emails[0].value });
      expect(user).toBeTruthy();
      expect(user?.firstName).toBe(mockFacebookProfile.name.givenName);
      expect(user?.lastName).toBe(mockFacebookProfile.name.familyName);
      expect(user?.isEmailVerified).toBe(true);
    });

    it('should handle Facebook callback for existing user', async () => {
      // Créer un utilisateur existant
      const existingUser = await User.create({
        email: 'existing@example.com',
        password: 'password123',
        firstName: 'Existing',
        lastName: 'User',
        userType: 'etudiant'
      });

      const mockFacebookProfile = {
        id: '987654321',
        emails: [{ value: existingUser.email }],
        name: {
          givenName: 'Existing',
          familyName: 'User'
        }
      };

      // Mock passport.authenticate
      jest.spyOn(passport, 'authenticate').mockImplementation(() => (req, res, next) => {
        req.user = mockFacebookProfile;
        next();
      });

      const response = await request(app)
        .get('/api/auth/facebook/callback');

      expect(response.status).toBe(302);
      expect(response.header.location).toContain('/auth/callback?token=');

      // Vérifier que l'utilisateur n'a pas été modifié
      const user = await User.findOne({ email: existingUser.email });
      expect(user?._id.toString()).toBe(existingUser._id.toString());
    });
  });

  describe('LinkedIn Authentication', () => {
    it('should redirect to LinkedIn OAuth', async () => {
      const response = await request(app)
        .get('/api/auth/linkedin');

      expect(response.status).toBe(302);
      expect(response.header.location).toContain('linkedin.com');
    });

    it('should handle LinkedIn callback and create new user', async () => {
      const mockLinkedInProfile = {
        id: '123456789',
        emails: [{ value: 'test@example.com' }],
        name: {
          givenName: 'Test',
          familyName: 'User'
        },
        photos: [{ value: 'https://example.com/photo.jpg' }]
      };

      // Mock passport.authenticate
      jest.spyOn(passport, 'authenticate').mockImplementation(() => (req, res, next) => {
        req.user = mockLinkedInProfile;
        next();
      });

      const response = await request(app)
        .get('/api/auth/linkedin/callback');

      expect(response.status).toBe(302);
      expect(response.header.location).toContain('/auth/callback?token=');

      // Vérifier que l'utilisateur a été créé
      const user = await User.findOne({ email: mockLinkedInProfile.emails[0].value });
      expect(user).toBeTruthy();
      expect(user?.firstName).toBe(mockLinkedInProfile.name.givenName);
      expect(user?.lastName).toBe(mockLinkedInProfile.name.familyName);
      expect(user?.isEmailVerified).toBe(true);
    });

    it('should handle LinkedIn callback for existing user', async () => {
      // Créer un utilisateur existant
      const existingUser = await User.create({
        email: 'existing@example.com',
        password: 'password123',
        firstName: 'Existing',
        lastName: 'User',
        userType: 'etudiant'
      });

      const mockLinkedInProfile = {
        id: '987654321',
        emails: [{ value: existingUser.email }],
        name: {
          givenName: 'Existing',
          familyName: 'User'
        }
      };

      // Mock passport.authenticate
      jest.spyOn(passport, 'authenticate').mockImplementation(() => (req, res, next) => {
        req.user = mockLinkedInProfile;
        next();
      });

      const response = await request(app)
        .get('/api/auth/linkedin/callback');

      expect(response.status).toBe(302);
      expect(response.header.location).toContain('/auth/callback?token=');

      // Vérifier que l'utilisateur n'a pas été modifié
      const user = await User.findOne({ email: existingUser.email });
      expect(user?._id.toString()).toBe(existingUser._id.toString());
    });
  });
}); 