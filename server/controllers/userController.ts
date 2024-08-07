import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, UserInterface } from '../models/user';
import Car, { CarInterface } from '../models/car';

// Register a new user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    const existingUser: UserInterface | null = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'Email already exists' });
      return;
    }

    const newUser = new User({ name, email, password });
    const savedUser: UserInterface = await newUser.save();
    res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Login user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user: UserInterface | null = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Invalid email or password' });
      return;
    }

    const isMatch: boolean = await user.comparePassword(password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid email or password' });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });
    res.json({ message: 'Login successful', token, user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserCars = async (req: Request, res: Response): Promise<void> => {
  const { userId, carId } = req.body; // Expect userId and carId in the request body

  try {
    // Validate user ID and car ID
    const user: UserInterface | null = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const car: CarInterface | null = await Car.findById(carId);
    if (!car) {
      res.status(404).json({ message: 'Car not found' });
      return;
    }

    // Add car ID to the user's cars array
    user.cars.push(carId as any); // Ensure the type matches, cast if necessary
    await user.save();

    res.status(200).json({ message: 'Car added to user successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch all cars for a specific user
export const getUserCars = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params; // Get userId from the request parameters

  try {
    // Find user by ID and populate the cars field
    const user: UserInterface | null = await User.findById(userId).populate('cars');

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Return the list of cars
    res.json(user.cars);
  } catch (error: any) {
    console.error('Error fetching user cars:', error);
    res.status(500).json({ message: 'Error fetching user cars', error });
  }
};