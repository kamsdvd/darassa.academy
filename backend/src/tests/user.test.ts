import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import { User } from '../user/user.model';

let adminToken: string;
let userId: string;

beforeAll(async () => {
  // Créer un admin et obtenir un token JWT
  const admin = new User({
    email: 'admin-test@darassa.academy',
    password: 'admin123',
    firstName: 'Admin',
    lastName: 'Test',
    userType: 'admin',
    isActive: true,
    isEmailVerified: true
  });
  await admin.save();
  // Simuler login pour obtenir le token (adapter selon votre logique d'auth)
  const res = await request(app)
    .post('/api/auth/login')
    .send({ email: 'admin-test@darassa.academy', password: 'admin123' });
  adminToken = res.body.token;
});

afterAll(async () => {
  await User.deleteMany({ email: /@darassa.academy$/ });
  await mongoose.connection.close();
});

describe('Admin User Management', () => {
  it('should create a new user (admin only)', async () => {
    const res = await request(app)
      .post('/api/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        email: 'user1@darassa.academy',
        password: 'user123',
        firstName: 'User',
        lastName: 'One',
        userType: 'etudiant'
      });
    expect(res.status).toBe(201);
    expect(res.body.user.email).toBe('user1@darassa.academy');
    userId = res.body.user._id;
  });

  it('should list all users (admin only)', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.users)).toBe(true);
  });

  it('should get user details by id (admin only)', async () => {
    const res = await request(app)
      .get(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body.email).toBe('user1@darassa.academy');
  });

  it('should update a user (admin only)', async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ firstName: 'UserUpdated' });
    expect(res.status).toBe(200);
    expect(res.body.user.firstName).toBe('UserUpdated');
  });

  it('should disable/enable a user (admin only)', async () => {
    const res1 = await request(app)
      .patch(`/api/users/${userId}/disable`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res1.status).toBe(200);
    expect(res1.body.message).toMatch(/désactivé/);
    const res2 = await request(app)
      .patch(`/api/users/${userId}/disable`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res2.status).toBe(200);
    expect(res2.body.message).toMatch(/activé/);
  });

  it('should change user role (admin only)', async () => {
    const res = await request(app)
      .patch(`/api/users/${userId}/role`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ userType: 'formateur' });
    expect(res.status).toBe(200);
    expect(res.body.user.userType).toBe('formateur');
  });

  it('should not allow admin to delete self', async () => {
    const admin = await User.findOne({ email: 'admin-test@darassa.academy' });
    const res = await request(app)
      .delete(`/api/users/${admin!._id}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(403);
  });

  it('should delete a user (admin only)', async () => {
    const res = await request(app)
      .delete(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/supprimé/);
  });
}); 