import supertest from 'supertest';
import app from '../server.js';
import mongoose from 'mongoose';

const request = supertest(app);

describe('Briefing Routes', () => {
  let token;
  
  beforeAll(async () => {
    // Créer un utilisateur de test et obtenir un token
    const email = `test${Date.now()}@example.com`;
    
    const registerResponse = await request
      .post('/api/auth/register')
      .send({
        firstName: 'Test',
        lastName: 'User',
        email,
        password: 'password123'
      });
    
    token = registerResponse.body.token;
  });
  
  afterAll(async () => {
    await mongoose.connection.close();
  });
  
  test('GET /api/briefing/daily should return daily briefing', async () => {
    const response = await request
      .get('/api/briefing/daily')
      .set('Authorization', `Bearer ${token}`)
      .query({ lat: 48.8566, lon: 2.3522 }); // Paris coordinates
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('date');
    expect(response.body).toHaveProperty('greeting');
    expect(response.body).toHaveProperty('events');
    expect(response.body).toHaveProperty('weather');
    expect(response.body).toHaveProperty('clothingAdvice');
    expect(response.body).toHaveProperty('fullText');
  });
  
  test('GET /api/briefing/daily should return 400 without coordinates', async () => {
    const response = await request
      .get('/api/briefing/daily')
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toBe(400);
  });
});
