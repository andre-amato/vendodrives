import { describe, it, expect, vi, afterEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import carRoutes from '../routes/carRoutes';

// Mocking the controller functions
const mockGetCars = vi.fn();
const mockGetCarById = vi.fn();
const mockCreateCar = vi.fn();
const mockDeleteCar = vi.fn();

vi.mock('../controllers/carController', () => ({
  getCars: (req: any, res: any) => mockGetCars(req, res),
  getCarById: (req: any, res: any) => mockGetCarById(req, res),
  createCar: (req: any, res: any) => mockCreateCar(req, res),
  deleteCar: (req: any, res: any) => mockDeleteCar(req, res),
}));

const app = express();
app.use(express.json());
app.use('/cars', carRoutes);

describe('Car Routing and Controller', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('getCars should be called on GET requests to /cars', async () => {
    mockGetCars.mockImplementation((req, res) => res.status(200).json([]));

    const response = await request(app).get('/cars');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
    expect(mockGetCars).toHaveBeenCalled();
  });

  it('getCarById should be called on GET requests to /cars/:id', async () => {
    mockGetCarById.mockImplementation((req, res) => res.status(200).json({ _id: req.params.id, title: 'Car 1' }));

    const response = await request(app).get('/cars/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ _id: '1', title: 'Car 1' });
    expect(mockGetCarById).toHaveBeenCalledWith(expect.objectContaining({ params: { id: '1' } }), expect.anything());
  });

  it('createCar should be called with an attached file on POST requests to /cars', async () => {
    mockCreateCar.mockImplementation((req, res) => res.status(201).json({ _id: 'newCarId', title: req.body.title }));

    const response = await request(app)
      .post('/cars')
      .attach('photo', Buffer.from('fake image content'), 'car.jpg')
      .field('title', 'New Car')
      .field('price', '15000')
      .field('zipCode', '12345')
      .field('user', 'userId');

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ _id: 'newCarId', title: 'New Car' });
    expect(mockCreateCar).toHaveBeenCalled();
  });

  it('deleteCar should be called on DELETE requests to /cars/:id', async () => {
    mockDeleteCar.mockImplementation((req, res) => res.status(200).json({ message: 'Car removed' }));

    const response = await request(app).delete('/cars/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Car removed' });
    expect(mockDeleteCar).toHaveBeenCalledWith(expect.objectContaining({ params: { id: '1' } }), expect.anything());
  });
});