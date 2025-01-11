import request from 'supertest';
import app from '../server.js';
import { user } from '../schemas/User.js';
import { transaction } from '../schemas/Transaction.js';
import mongoose from 'mongoose';

describe('Transaction Routes', () => {
    let userId;
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI);

        // Clear existing data
        await user.deleteMany();
        await transaction.deleteMany();

        // Create a test user
        const testUser = await user.create({
            name: 'Test User in Transactions',
            email: 'transactionUser@example.com',
            password: 'hashedpassword', // Ensure the password is hashed
            isVerified: true,
        });

        userId = testUser._id; // Store the userId for transaction tests
    });

   // Clean up the database after each test
    afterEach(async () => {
        await transaction.deleteMany(); // Remove transactions after each test
    });
    
    afterAll(async () => {
        await user.deleteMany();
        await mongoose.connection.close();
    });
    
    test('should create a new transaction', async () => {
        const response = await request(app).post('/api/transactions').send({
          userId: userId.toString(), // Use valid userId
          amount: 1000,
          isFraud: false
        });
        console.log("response from transaction create: ", response.body);
        expect(response.statusCode).toBe(200);
      });
    

});