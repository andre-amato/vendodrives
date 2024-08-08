import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import express from 'express';
import userRoutes from '../routes/userRoutes';
import { User } from '../models/user';
import Car from '../models/car';

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

beforeAll(async () => {
  const testMongoUri = 'mongodb://localhost:27017/vendodrives-TEST';
  await mongoose.connect(testMongoUri);
});

beforeEach(async () => {
  await User.deleteMany({});
  await Car.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('User Integration Tests', () => {
  it('The application should allow new users to be created', async () => {
    const response = await request(app)
      .post('/users/register')
      .send({ name: 'Test User', email: 'test@example.com', password: 'password123' });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');

    const user = await User.findOne({ email: 'test@example.com' });
    expect(user).not.toBeNull();
    expect(user?.name).toBe('Test User');
  });

  it('Existing users should be able to log in', async () => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = new User({ name: 'Existing User', email: 'user@example.com', password: hashedPassword });
    await user.save();
  
    console.log('Created user:', user);
  
    const response = await request(app)
      .post('/users/login')
      .send({ email: 'user@example.com', password: 'password123' });
  
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login successful');
    expect(response.body.token).toBeDefined();
  });

  it('Users should be able to update their cars', async () => {
    const user = new User({ name: 'Car Owner', email: 'carowner@example.com', password: 'password123' });
    await user.save();

    const car = new Car({ title: 'New Car', price: 20000, zipCode: '12345', photo: 'url', user: user._id });
    await car.save();

    const response = await request(app)
      .put('/users/update-cars')
      .send({ userId: user.id.toString(), carId: car._id.toString() });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Car added to user successfully');

    const updatedUser = await User.findById(user._id).populate('cars');
    expect(updatedUser?.cars).toHaveLength(1);
    expect(updatedUser?.cars[0]._id.toString()).toBe(car._id.toString());
  });

  it('Users should be able to see all of their cars', async () => {
    const user = new User({ name: 'Car Enthusiast', email: 'enthusiast@example.com', password: 'password123' });
    await user.save();

    const car1 = new Car({ title: 'Car 1', price: 10000, zipCode: '54321', photo: 'url1', user: user._id });
    const car2 = new Car({ title: 'Car 2', price: 15000, zipCode: '67890', photo: 'url2', user: user._id });
    await car1.save();
    await car2.save();

    user.cars.push(car1._id, car2._id);
    await user.save();

    const response = await request(app).get(`/users/${user._id}/cars`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].title).toBe('Car 1');
    expect(response.body[1].title).toBe('Car 2');
  });
});