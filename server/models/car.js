const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  zipCode: { type: String, required: true },
  photo: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
});

const Car = mongoose.model('Car', CarSchema);

module.exports = Car;
