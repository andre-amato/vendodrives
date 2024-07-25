const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
