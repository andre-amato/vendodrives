const express = require('express');
const {
  registerUser,
  loginUser,
  updateUserCars,
} = require('../controllers/userController');

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to login
router.post('/login', loginUser);

// Route to update user's cars list
router.put('/update-cars', updateUserCars);

module.exports = router;
