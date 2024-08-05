import express, { Request, Response, Router } from 'express';
import multer from 'multer';
import { getCars, createCar, getCarById, deleteCar } from '../controllers/carController';

const router: Router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage }).single('photo');

// Interface to extend Request interface to include file property
interface MulterRequest extends Request {
  file: Express.Multer.File;
}

// Route to get all cars
router.get('/', (req: Request, res: Response) => {
  getCars(req, res);
});

// Route to get a car by ID
router.get('/:id', (req: Request, res: Response) => {
  getCarById(req, res);
});

// Route to create a car
router.post('/', upload, (req: Request, res: Response) => {
  const multerReq = req as MulterRequest;
  if (!multerReq.file) {
    res.status(400).json({ message: 'No file uploaded' });
    return;
  }
  createCar(multerReq, res);
});

// Route to delete a car by ID
router.delete('/:id', (req: Request, res: Response) => {
  deleteCar(req, res);
});

export default router;