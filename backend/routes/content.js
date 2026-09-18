const express = require('express');
const router = express.Router();
const { servicesData, pricingData } = require('../data/initialData');

// GET /api/content/services
router.get('/services', (req, res) => {
  res.json({
    success: true,
    count: servicesData.length,
    data: servicesData,
  });
});

// GET /api/content/pricing
router.get('/pricing', (req, res) => {
  res.json({
    success: true,
    count: pricingData.length,
    data: pricingData,
  });
});

module.exports = router;
