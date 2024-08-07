import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import express from 'express';
import carRoutes from '../routes/carRoutes';
import { Car } from '../models/car';
import { User } from '../models/user';

const app = express();
app.use(express.json());
app.use('/cars', carRoutes);

beforeAll(async () => {
  const testMongoUri = 'mongodb://localhost:27017/vendodrives-TEST';
  await mongoose.connect(testMongoUri);
});

beforeEach(async () => {
  await Car.deleteMany({});
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Car Integration Tests', () => {
  it('The application should fetch all cars', async () => {
    const car = new Car({ title: 'Car 1', price: 10000, zipCode: '12345', photo: 'url', user: new mongoose.Types.ObjectId() });
    await car.save();

    const response = await request(app).get('/cars');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].title).toBe('Car 1');
  });

  it('The application should fetch a car by its ID', async () => {
    const car = new Car({ title: 'Car 2', price: 15000, zipCode: '67890', photo: 'url', user: new mongoose.Types.ObjectId() });
    await car.save();

    const response = await request(app).get(`/cars/${car._id}`);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Car 2');
  });

  it('The application should allow for cars to be deleted by their ID', async () => {
    const car = new Car({ title: 'Car 3', price: 20000, zipCode: '54321', photo: 'url', user: new mongoose.Types.ObjectId() });
    await car.save();

    const response = await request(app).delete(`/cars/${car._id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Car removed');

    // Verify that the car was deleted from the database
    const deletedCar = await Car.findById(car._id);
    expect(deletedCar).toBeNull();
  });
});