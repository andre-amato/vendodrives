import express, { Router, Request, Response } from 'express';
import { registerUser, loginUser, updateUserCars, getUserCars } from '../controllers/userController';

const router: Router = express.Router();

router.post('/register', (req: Request, res: Response) => {
  registerUser(req, res);
});

router.post('/login', (req: Request, res: Response) => {
  loginUser(req, res);
});

router.put('/update-cars', (req: Request, res: Response) => {
  updateUserCars(req, res);
});

router.get('/:userId/cars', (req: Request, res: Response) => {
  getUserCars(req, res);
});

export default router;