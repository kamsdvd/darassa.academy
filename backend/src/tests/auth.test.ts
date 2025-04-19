import request from 'supertest';
import app from '../server';
import User from '../models/user.model';
import mongoose from 'mongoose';

describe('Authentication Tests', () => {
  const testUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
  };

  beforeAll(async () => {
    // Connexion à la base de données de test
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/darassa-academy-test');
  });

  afterAll(async () => {
    // Nettoyage et déconnexion
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Nettoyage avant chaque test
    await User.deleteMany({});
  });

  describe('Registration', () => {
    it('should register a new user successfully', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', testUser.name);
      expect(res.body).toHaveProperty('email', testUser.email);
      expect(res.body).toHaveProperty('token');
      expect(res.body).not.toHaveProperty('password');
    });

    it('should not register user with existing email', async () => {
      // Créer un utilisateur existant
      await User.create(testUser);

      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser);

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Un utilisateur avec cet email existe déjà');
    });

    it('should validate required fields', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          name: 'Test User',
          // email manquant
          password: 'password123',
        });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('message', 'Tous les champs sont requis');
    });
  });

  describe('Login', () => {
    beforeEach(async () => {
      // Créer un utilisateur pour les tests de connexion
      await User.create(testUser);
    });

    it('should login successfully with correct credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('email', testUser.email);
    });

    it('should not login with incorrect password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword',
        });

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('message', 'Email ou mot de passe incorrect');
    });
  });

  describe('Protected Routes', () => {
    let token: string;

    beforeEach(async () => {
      // Créer un utilisateur et obtenir un token
      const user = await User.create(testUser);
      const loginRes = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password,
        });
      token = loginRes.body.token;
    });

    it('should access protected route with valid token', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('email', testUser.email);
    });

    it('should not access protected route without token', async () => {
      const res = await request(app)
        .get('/api/auth/me');

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty('message', 'Non autorisé - Token manquant');
    });

    it('should not access protected route with invalid token', async () => {
      const res = await request(app)
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalid-token');

      expect(res.status).toBe(401);
    });
  });
}); 