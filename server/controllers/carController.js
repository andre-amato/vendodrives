const Car = require('../models/car');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const User = require('../models/user'); // Ensure User model is imported

// Setup multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define controller functions
const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCar = (req, res) => {
  console.log('createCar called');

  if (!req.file) {
    console.error('No file uploaded');
    return res.status(400).json({ message: 'No file uploaded' });
  }

  console.log('File uploaded:', req.file);

  const uploadStream = cloudinary.uploader.upload_stream(
    { resource_type: 'auto' },
    async (error, result) => {
      if (error) {
        console.error('Cloudinary upload error:', error);
        return res.status(500).json({ message: error.message });
      }

      console.log('Cloudinary upload result:', result);

      try {
        // Retrieve user ID from the request object (assuming user is added to req by middleware)
        const userId = req.user.id;

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
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
      } catch (saveError) {
        console.error('Error saving car:', saveError);
        res.status(500).json({ message: saveError.message });
      }
    }
  );

  uploadStream.end(req.file.buffer);
};

const getCarById = async (req, res) => {
  const { id } = req.params;
  console.log('Extracted ID:', id);

  try {
    const car = await Car.findById(id).populate('user');
    console.log('Found Car:', car);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCar = async (req, res) => {
  const { id } = req.params;

  try {
    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    if (car.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await car.remove();
    res.json({ message: 'Car removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCars, createCar, getCarById, deleteCar };
