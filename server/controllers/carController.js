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

// New controller function
const getCarById = async (req, res) => {
  const { id } = req.params;
  console.log('Extracted ID:', id); // Log the extracted ID

  try {
    const car = await Car.findById(id);
    console.log('Found Car:', car); // Log the retrieved car data
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DeleteCar function
const deleteCar = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCar = await Car.findByIdAndDelete(id);
    if (!deletedCar) {
      return res.status(404).json({ message: 'Car not found' });
    }
    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCars, createCar, getCarById, deleteCar, upload };
