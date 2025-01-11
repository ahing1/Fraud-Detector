import request from 'supertest';
import app from '../server.js';
import { user } from '../schemas/User.js';
import mongoose from 'mongoose';

describe('User Routes', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);
      });

    afterEach(async () => {
        await user.deleteMany();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('POST /api/users should create a new user and return 200', async () => {
        const response = await request(app).post('/api/users').send({
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: 'password',
          isVerified: false,
        });

        expect(response.statusCode).toBe(200);
      });

});