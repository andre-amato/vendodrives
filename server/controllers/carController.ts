import { Request, Response } from 'express';
import multer from 'multer';
import { Document, Types } from 'mongoose';
import { Car, CarInterface } from '../models/car';
import { User, UserInterface } from '../models/user';
import cloudinary from '../config/cloudinary';
cloudinary.cloudinary_js_config

// Setup multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Extending Request interface to include file property
interface MulterRequest extends Request {
  file: Express.Multer.File;
}

// Define controller functions
// GET all Cars
export const getCars = async (req: Request, res: Response): Promise<void> => {
  try {
    const cars: CarInterface[] = await Car.find();
    res.json(cars);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST a new car
export const createCar = async (req: MulterRequest, res: Response): Promise<void> => {
  console.log('createCar called');

  if (!req.file) {
    console.error('No file uploaded');
    res.status(400).json({ message: 'No file uploaded' });
    return;
  }

  console.log('File uploaded:', req.file);

  const uploadStream = cloudinary.uploader.upload_stream(
    { resource_type: 'auto' },
    async (error: any, result: any) => {
      if (error) {
        console.error('Cloudinary upload error:', error);
        res.status(500).json({ message: error.message });
        return;
      }

      console.log('Cloudinary upload result:', result);

      try {
        // Retrieve user ID from the request body
        const userId: Types.ObjectId = req.body.user;

        // Find the user
        const user: UserInterface | null = await User.findById(userId);
        if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
        }

        // Create a new car
        const newCar = new Car({
          title: req.body.title,
          price: req.body.price,
          zipCode: req.body.zipCode,
          photo: result.secure_url,
          user: userId, // Reference to user
        });

        // Save the new car
        const savedCar = await newCar.save();

        console.log('Car saved:', savedCar);

        // Add the new car's ID to the user's cars array
        user.cars.push(savedCar._id);
        await user.save();

        res.status(201).json(savedCar);
      } catch (saveError: any) {
        console.error('Error saving car:', saveError);
        res.status(500).json({ message: saveError.message });
      }
    }
  );
  uploadStream.end(req.file.buffer);
};

// GET car by Id
export const getCarById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  console.log('Extracted ID:', id);

  try {
    const car: CarInterface | null = await Car.findById(id).populate('user');
    console.log('Found Car:', car);
    if (!car) {
      res.status(404).json({ message: 'Car not found' });
      return;
    }
    res.json(car);
  } catch (error: any) {
    console.error('Error finding car:', error);
    res.status(500).json({ message: error.message });
  }
};

//delete car
export const deleteCar = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  console.log('Received ID for deletion:', id); // Log the ID to verify it's received correctly

  try {
    if (!id) {
      res.status(400).json({ message: 'Car ID is required' });
      return;
    }

    // Find and delete the car by ID
    const result = await Car.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Car not found' });
      return;
    }

    res.json({ message: 'Car removed' });
  } catch (error: any) {
    console.error('Error deleting car:', error);
    res.status(500).json({ message: error.message });
  }
};