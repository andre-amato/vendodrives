const express = require('express');
const router = express.Router();
const {
  getCars,
  createCar,
  getCarById,
} = require('../controllers/carController');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage }).single('photo');

// Route to get all cars
router.get('/', getCars);

// Route to get a car by ID
router.get('/:id', getCarById);

// Route to create a car
router.post('/', upload, createCar);

module.exports = router;
