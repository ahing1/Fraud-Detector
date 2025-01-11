import request from 'supertest';
import app from '../server.js';
import { user } from '../schemas/User.js';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

describe('Auth Routes', () => {

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);
      });

    beforeEach(async () => {
        await user.deleteMany();
        await user.create({
            name: 'Test User',
            email: 'testuserinAuth@example.com',
            password: 'testpassword',
            isVerified: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('Should successfully create a new user', async () => {
        const response = await request(app).post('/api/auth/signup').send({
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: 'securepassword',
        });    
        expect(response.statusCode).toBe(200);
    })
        
    
    test('Should successfully sign in with correct credentials', async () => {
        const response = await request(app).post('/api/auth/signin').send({
          email: 'testuserinAuth@example.com',
          password: 'testpassword',
        });

        console.log("response from auth sign in: ", response.body);
    
        expect(response.statusCode).toBe(200);
      });

});