const express = require('express');
const router = express.Router();
const { getCars, createCar } = require('../controllers/carController');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage }).single('photo');

router.get('/', getCars);
router.post('/', upload, createCar);

module.exports = router;
