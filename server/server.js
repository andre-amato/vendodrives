const express = require('express');
const mongoose = require('mongoose');
const carRoutes = require('./routes/carRoutes');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Routes
app.use('/api/cars', carRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
