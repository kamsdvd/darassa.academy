import request from 'supertest';
import app from '../server';

describe('API Auth', () => {
  it('POST /api/auth/login doit répondre 200 et un message', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Login');
  });
}); 