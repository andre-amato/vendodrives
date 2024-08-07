import { Request, Response } from 'express';
import multer from 'multer';
import { Document, Types } from 'mongoose';
import Car, { CarInterface } from '../models/car';
import { User, UserInterface } from '../models/user';
import cloudinary from '../config/cloudinary';

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Extending Request interface to include file property
interface MulterRequest extends Request {
  file: Express.Multer.File;
}

export const getCars = async (req: Request, res: Response): Promise<void> => {
  try {
    const cars: CarInterface[] = await Car.find();
    res.json(cars);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createCar = async (req: MulterRequest, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ message: 'No file uploaded' });
    return;
  }
  const uploadStream = cloudinary.uploader.upload_stream(
    { resource_type: 'auto' },
    async (error: any, result: any) => {
      if (error) {
        res.status(500).json({ message: error.message });
        return;
      }
      try {
        const userId: Types.ObjectId = req.body.user;
        const user: UserInterface | null = await User.findById(userId);
        if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
        }
        const newCar = new Car({
          title: req.body.title,
          price: req.body.price,
          zipCode: req.body.zipCode,
          photo: result.secure_url,
          user: userId,
        });
        const savedCar = await newCar.save();
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

export const getCarById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const car: CarInterface | null = await Car.findById(id).populate('user');
    if (!car) {
      res.status(404).json({ message: 'Car not found' });
      return;
    }
    res.json(car);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCar = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400).json({ message: 'Car ID is required' });
      return;
    }
    const result = await Car.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      res.status(404).json({ message: 'Car not found' });
      return;
    }
    res.json({ message: 'Car removed' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};