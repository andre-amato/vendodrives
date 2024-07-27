const express = require('express');
const mongoose = require('mongoose');
const carRoutes = require('./routes/carRoutes');
const userRoutes = require('./routes/userRoutes');
const path = require('path');
const cors = require('cors'); // Import cors
require('dotenv').config(); // Ensure environment variables are loaded

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors()); // Use cors middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI) // Add connection options
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Routes
app.use('/cars', carRoutes);
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
