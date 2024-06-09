import request from 'supertest';
const mongoose = require("mongoose");
import { Server } from '../../../src/presentation/server';
import { AppRoutes } from "../../../src/presentation/routes/routes";
import { MongoDatabase, UserModel } from '../../../src/data/mongodb';

describe('Server Integration Tests', () => {
  let server: Server;
  
  beforeAll(async () => {
    const options = {
      mongoUrl: 'mongodb://mongo-user:123456@localhost:27017',
      dbName: 'user-xgroup-test'
    }
    MongoDatabase.connect(options);

    server = new Server({ port: 3200, routes: AppRoutes.routes });
    await server.start();
  });
  
  afterAll(async () => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close()
    });
  });
  
  describe(`AuthRoutes test" `, () => {

    it('should register a user, finder and login respond successfuly', async () => {
      const data = { name: "Santiago", email: "santir@mail.com", password: "password"};
      const response = await request(server.app).post('/api/auth/register').send(data);
      
      expect(response.status).toBe(200);
      expect(response.body.token).toBeTruthy();
      expect(response.body.user).toBeTruthy();
      expect(response.body.user.id).toBeTruthy();
      expect(response.body.user.name).toBe("Santiago");
      expect(response.body.user.email).toBe("santir@mail.com");
  
      const user: any = await UserModel.findOne({ _id: response.body.user.id })
      expect(user).toBeTruthy();
      expect(user.name).toBe(data.name);
      expect(user.email).toBe(data.email);

      const loginRes = await request(server.app).post('/api/auth/login').send(data);

      expect(loginRes.status).toBe(200);
      expect(loginRes.body.token).toBeTruthy();
      expect(loginRes.body.user).toBeTruthy();
      expect(loginRes.body.user.id).toBeTruthy();
      expect(loginRes.body.user.name).toBe(data.name);
      expect(loginRes.body.user.email).toBe(data.email);

    });
    
    it('should call /auth/login and respond bad request', async () => {
      const data = { name: "Santiago", password: "password"};
      const response = await request(server.app).post('/api/auth/login').send(data);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Missing email");
    });
    
    it('should call /auth/register and respond bad request', async () => {
      const data = { name: "Santiago", password: "password"};
      const response = await request(server.app).post('/api/auth/register').send(data);
      
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("Missing email");
      
    });

    it('should bad request error - User does not exists', async () => {
      const data = { name: "Santiago", email: "santi@mail.com", password: "password"};
      const response = await request(server.app).post('/api/auth/login').send(data);
      
      expect(response.status).toBe(400);
    });
    
  });

  describe(`CatRoutes test`, () => {

    it('should return 200 Ok for list of Breeds', async () => {
      const data = { name: "Santiago", email: "santir@mail.com", password: "password"};
      const loginRes = await request(server.app).post('/api/auth/login').send(data);
      
      expect(loginRes.status).toBe(200);
      expect(loginRes.body.token).toBeTruthy();

      const response = await request(server.app)
        .get('/api/breeds')
        .set('Authorization', 'Bearer ' + loginRes.body.token)
        .set('x-api-key', 'DEMO-API-KEY');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
    
    it('should return 200 OK for BreedsById', async () => {
      const data = { name: "Santiago", email: "santir@mail.com", password: "password"};
      const loginRes = await request(server.app).post('/api/auth/login').send(data);
      
      expect(loginRes.status).toBe(200);
      expect(loginRes.body.token).toBeTruthy();

      const response = await request(server.app)
        .get('/api/breeds/abys')
        .set('Authorization', 'Bearer ' + loginRes.body.token)
        .set('x-api-key', 'DEMO-API-KEY');

      expect(response.status).toBe(200);
      expect(response.body.id).toEqual('abys');
    });
    
    it('should return 400 Bad Request for BreedsById', async () => {
      const data = { name: "Santiago", email: "santir@mail.com", password: "password"};
      const loginRes = await request(server.app).post('/api/auth/login').send(data);
      
      expect(loginRes.status).toBe(200);
      expect(loginRes.body.token).toBeTruthy();

      const response = await request(server.app)
        .get('/api/breeds/idnotexist')
        .set('Authorization', 'Bearer ' + loginRes.body.token)
        .set('x-api-key', 'DEMO-API-KEY');

      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
    });
    
    it('should return 200 Ok for SearchBreeds', async () => {
      const qParam = 'Ara';
      const attImgParam = 1;
      const data = { name: "Santiago", email: "santir@mail.com", password: "password"};
      const loginRes = await request(server.app).post('/api/auth/login').send(data);

      expect(loginRes.status).toBe(200);
      expect(loginRes.body.token).toBeTruthy();

      const response = await request(server.app)
        .get(`/api/breeds/search?q=${qParam}&attach_image=${attImgParam}`)
        .set('Authorization', 'Bearer ' + loginRes.body.token)
        .set('x-api-key', 'DEMO-API-KEY');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body[0].name).toContain(qParam);
    });

  });

  describe('ImagesRoutes', () => {
    
    it('should return 200 Ok for SearchImagesByBreedId', async () => {
      const breed_id = '0XYvRd7oD';
      const data = { name: "Santiago", email: "santir@mail.com", password: "password"};
      const loginRes = await request(server.app).post('/api/auth/login').send(data);
      
      expect(loginRes.status).toBe(200);
      expect(loginRes.body.token).toBeTruthy();

      const response = await request(server.app)
        .get(`/api/images/imagesbybreedid/${breed_id}`)
        .set('Authorization', 'Bearer ' + loginRes.body.token)
        .set('x-api-key', 'DEMO-API-KEY');

      expect(response.status).toBe(200);
      expect(response.body.id).toEqual(breed_id);
      expect(response.body.url).toBeTruthy();
      expect(response.body.url).toContain(breed_id);
    });
    
    it('should return 400 Bad Request for SearchImagesByBreedId', async () => {
      const breed_id = 'testing';
      const data = { name: "Santiago", email: "santir@mail.com", password: "password"};
      const loginRes = await request(server.app).post('/api/auth/login').send(data);
      
      expect(loginRes.status).toBe(200);
      expect(loginRes.body.token).toBeTruthy();

      const response = await request(server.app)
        .get(`/api/images/imagesbybreedid/${breed_id}`)
        .set('Authorization', 'Bearer ' + loginRes.body.token)
        .set('x-api-key', 'DEMO-API-KEY');

      expect(response.status).toBe(400);
      expect(response.body.error).toBeTruthy();
    });
  
  });

  describe('Middleware validations', () => {

    it('should return 401 Unauthorized for Missing Authorization', async () => {
      const data = { name: "Santiago", email: "santir@mail.com", password: "password"};
      const loginRes = await request(server.app).post('/api/auth/login').send(data);
      
      expect(loginRes.status).toBe(200);
      expect(loginRes.body.token).toBeTruthy();

      const response = await request(server.app)
        .get('/api/breeds')
        .set('x-api-key', 'DEMO-API-KEY');

      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Invalid Bearer token');
    });
    
    it('should return 401 Unauthorized for Missing X-Api-Key', async () => {
      const data = { name: "Santiago", email: "santir@mail.com", password: "password"};
      const loginRes = await request(server.app).post('/api/auth/login').send(data);
      
      expect(loginRes.status).toBe(200);
      expect(loginRes.body.token).toBeTruthy();

      const response = await request(server.app)
        .get('/api/breeds')
        .set('Authorization', 'Bearer ' + loginRes.body.token)

      expect(response.status).toBe(401);
      expect(response.body.error).toBe('No token provided');
    });
    
    it('should return 401 Unauthorized for Invalid JWT - No payload', async () => {
      const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.hq2xWS91nx43bwkfRtCi2zisF7gcEqvaM0VVFfRf0B4'
      const data = { name: "Santiago", email: "santir@mail.com", password: "password"};
      const loginRes = await request(server.app).post('/api/auth/login').send(data);
      
      expect(loginRes.status).toBe(200);
      expect(loginRes.body.token).toBeTruthy();

      const response = await request(server.app)
        .get('/api/breeds')
        .set('Authorization', 'Bearer ' + jwt)
        .set('x-api-key', 'DEMO-API-KEY');

      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Invalid token');
    });
    
    it('should return 401 Unauthorized for Invalid JWT - User Id not found', async () => {
      const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NjUzNmM0ZTE5ZjFhYmFkYzhiNmI0NSIsImlhdCI6MTcxNzkwOTE4OCwiZXhwIjoxNzE3OTE2Mzg4fQ.hq2xWS91nx43bwkfRtCi2zisF7gcEqvaM0VVFfRf0B4'
      const data = { name: "Santiago", email: "santir@mail.com", password: "password"};
      const loginRes = await request(server.app).post('/api/auth/login').send(data);
      
      expect(loginRes.status).toBe(200);
      expect(loginRes.body.token).toBeTruthy();

      const response = await request(server.app)
        .get('/api/breeds')
        .set('Authorization', 'Bearer ' + jwt)
        .set('x-api-key', 'DEMO-API-KEY');

      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Invalid token - user not found');
    });

  })
  
});
