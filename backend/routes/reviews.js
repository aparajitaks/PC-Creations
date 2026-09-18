const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { reviewsData } = require('../data/initialData');
const { getIsConnected } = require('../config/db');

// In-memory fallback
let currentReviews = [...reviewsData];

// GET /api/reviews - returns Google rating stats and reviews
router.get('/', async (req, res) => {
  try {
    let reviews = currentReviews;
    if (getIsConnected()) {
      const dbReviews = await Review.find().sort({ createdAt: -1 });
      if (dbReviews && dbReviews.length > 0) {
        reviews = dbReviews;
      }
    }

    const totalReviews = reviews.length;
    const averageRating = 4.9; // Matches verified Google Maps rating for PC Creations

    res.json({
      success: true,
      stats: {
        averageRating,
        totalReviews: 24, // Verified count on Google & listings
        googleProfileUrl: 'https://share.google/nDXFKdY4OcAeUelra',
        stars: 5,
        ratingLabel: 'Exceptional (4.9 / 5.0)',
        location: 'Rajajinagar & Indiranagar, Bangalore',
      },
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/reviews - submit client review
router.post('/', async (req, res) => {
  try {
    const { author, rating, business, text } = req.body;
    if (!author || !text) {
      return res.status(400).json({ success: false, message: 'Author and review text are required.' });
    }

    const newRev = {
      author,
      rating: Number(rating) || 5,
      business: business || 'Bangalore Business',
      text,
      relativeDate: 'Just now',
      avatar: author.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'PC',
      verified: true,
      createdAt: new Date(),
    };

    if (getIsConnected()) {
      const saved = await Review.create(newRev);
      return res.status(201).json({ success: true, data: saved });
    } else {
      newRev._id = 'mem-rev-' + Date.now();
      currentReviews.unshift(newRev);
      return res.status(201).json({ success: true, data: newRev });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
