const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    default: 5,
  },
  business: {
    type: String,
    default: 'Bangalore Client',
  },
  text: {
    type: String,
    required: true,
  },
  relativeDate: {
    type: String,
    default: 'Recently',
  },
  avatar: {
    type: String,
    default: 'PC',
  },
  verified: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Review || mongoose.model('Review', ReviewSchema);
