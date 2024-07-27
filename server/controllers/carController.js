const Car = require('../models/car');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');

// Setup multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCar = (req, res) => {
  // Ensure req.file exists
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // Cloudinary upload stream
  const uploadStream = cloudinary.uploader.upload_stream(
    { resource_type: 'auto' },
    async (error, result) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      }
      try {
        const newCar = new Car({
          title: req.body.title,
          price: req.body.price,
          zipCode: req.body.zipCode,
          photo: result.secure_url,
          user: req.user.id, // Associate car with logged-in user
        });
        const savedCar = await newCar.save();
        res.status(201).json(savedCar);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  );

  // Pipe the file buffer to Cloudinary
  uploadStream.end(req.file.buffer);
};

// Get Car by Id
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

    // Ensure the logged-in user is the owner of the car
    if (car.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await car.remove();
    res.json({ message: 'Car removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCars, createCar, getCarById, deleteCar, upload };
