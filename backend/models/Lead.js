const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  businessName: {
    type: String,
    trim: true,
  },
  serviceInterest: {
    type: String,
    default: 'General Consultation',
  },
  planInterest: {
    type: String,
    default: 'Standard Pack',
  },
  monthlyBudget: {
    type: String,
    default: '₹25,000 - ₹50,000',
  },
  message: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
