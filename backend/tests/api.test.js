import supertest from 'supertest';
import app from '../server.js';
import mongoose from 'mongoose';

const request = supertest(app);

// Fonction pour créer un utilisateur de test et obtenir un token
const getAuthToken = async () => {
  // Créer un utilisateur de test avec un email unique
  const email = `test${Date.now()}@example.com`;
  
  const registerResponse = await request
    .post('/api/auth/register')
    .send({
      firstName: 'Test',
      lastName: 'User',
      email,
      password: 'password123'
    });
  
  return registerResponse.body.token;
};

describe('API Routes', () => {
  let token;
  
  beforeAll(async () => {
    token = await getAuthToken();
  });
  
  afterAll(async () => {
    await mongoose.connection.close();
  });
  
  describe('Auth Routes', () => {
    test('GET /api/auth/me should return user profile when authenticated', async () => {
      const response = await request
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('firstName', 'Test');
      expect(response.body).toHaveProperty('lastName', 'User');
      expect(response.body).toHaveProperty('email');
    });
    
    test('GET /api/auth/me should return 401 when not authenticated', async () => {
      const response = await request.get('/api/auth/me');
      
      expect(response.status).toBe(401);
    });
  });
  
  describe('Children Routes', () => {
    let childId;
    
    test('POST /api/children should create a new child', async () => {
      const response = await request
        .post('/api/children')
        .set('Authorization', `Bearer ${token}`)
        .send({
          firstName: 'Lucas',
          age: 8,
          preferences: {
            clothing: {
              coldWeather: ['Manteau chaud', 'Bonnet'],
              warmWeather: ['T-shirt', 'Short'],
              rainWeather: ['Imperméable', 'Bottes de pluie']
            }
          }
        });
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('firstName', 'Lucas');
      expect(response.body).toHaveProperty('age', 8);
      expect(response.body).toHaveProperty('_id');
      
      childId = response.body._id;
    });
    
    test('GET /api/children should return all children', async () => {
      const response = await request
        .get('/api/children')
        .set('Authorization', `Bearer ${token}`);
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
    
    test('GET /api/children/:id should return a specific child', async () => {
      const response = await request
        .get(`/api/children/${childId}`)
        .set('Authorization', `Bearer ${token}`);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('firstName', 'Lucas');
      expect(response.body).toHaveProperty('age', 8);
    });
  });
  
  describe('Lists Routes', () => {
    let listId;
    
    test('POST /api/lists should create a new list', async () => {
      const response = await request
        .post('/api/lists')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'Courses',
          type: 'grocery'
        });
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('name', 'Courses');
      expect(response.body).toHaveProperty('type', 'grocery');
      expect(response.body).toHaveProperty('_id');
      
      listId = response.body._id;
    });
    
    test('GET /api/lists should return all lists', async () => {
      const response = await request
        .get('/api/lists')
        .set('Authorization', `Bearer ${token}`);
      
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
    
    test('POST /api/lists/:id/items should add an item to a list', async () => {
      const response = await request
        .post(`/api/lists/${listId}/items`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          text: 'Lait'
        });
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('text', 'Lait');
      expect(response.body).toHaveProperty('completed', false);
    });
  });
  
  describe('Weather Routes', () => {
    test('GET /api/weather/current should return weather data', async () => {
      const response = await request
        .get('/api/weather/current')
        .set('Authorization', `Bearer ${token}`)
        .query({ lat: 48.8566, lon: 2.3522 }); // Paris coordinates
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('main');
      expect(response.body).toHaveProperty('weather');
    });
    
    test('GET /api/weather/clothing should return clothing suggestions', async () => {
      const response = await request
        .get('/api/weather/clothing')
        .set('Authorization', `Bearer ${token}`)
        .query({ lat: 48.8566, lon: 2.3522 }); // Paris coordinates
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('weather');
      expect(response.body).toHaveProperty('suggestions');
      expect(Array.isArray(response.body.suggestions)).toBe(true);
    });
  });
});
