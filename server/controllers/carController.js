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

module.exports = { getCars, createCar, upload };
