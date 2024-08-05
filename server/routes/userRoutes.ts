import express, { Router, Request, Response } from 'express';
import { registerUser, loginUser, updateUserCars, getUserCars } from '../controllers/userController';

const router: Router = express.Router();

// Route to register a new user
router.post('/register', (req: Request, res: Response) => {
  registerUser(req, res);
});

// Route to login
router.post('/login', (req: Request, res: Response) => {
  loginUser(req, res);
});

// Route to update user's cars list
router.put('/update-cars', (req: Request, res: Response) => {
  updateUserCars(req, res);
});

// Route to get all cars for a specific user
router.get('/:userId/cars', (req: Request, res: Response) => {
  getUserCars(req, res);
});

export default router;