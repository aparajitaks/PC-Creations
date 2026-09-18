const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const { getIsConnected } = require('../config/db');

// In-memory fallback array if MongoDB daemon is offline
const inMemoryLeads = [];

// POST /api/leads - submit free audit / consultation request
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, businessName, serviceInterest, planInterest, monthlyBudget, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: 'Name, email, and phone number are required.' });
    }

    const leadData = {
      name,
      email,
      phone,
      businessName: businessName || '',
      serviceInterest: serviceInterest || 'General Consultation',
      planInterest: planInterest || 'Standard Pack',
      monthlyBudget: monthlyBudget || '₹25,000 - ₹50,000',
      message: message || '',
      createdAt: new Date(),
    };

    if (getIsConnected()) {
      const savedLead = await Lead.create(leadData);
      return res.status(201).json({
        success: true,
        message: 'Your growth consultation request has been received! A PC Creations strategist will reach out within 30 minutes.',
        data: savedLead,
      });
    } else {
      // Fallback
      leadData._id = 'mem-' + Date.now();
      inMemoryLeads.unshift(leadData);
      return res.status(201).json({
        success: true,
        message: 'Your growth consultation request has been received! A PC Creations strategist will reach out within 30 minutes.',
        data: leadData,
      });
    }
  } catch (error) {
    console.error('Error saving lead:', error);
    res.status(500).json({ success: false, message: 'Internal server error processing lead request.' });
  }
});

// GET /api/leads - fetch recent leads (for admin check)
router.get('/', async (req, res) => {
  try {
    if (getIsConnected()) {
      const leads = await Lead.find().sort({ createdAt: -1 }).limit(50);
      return res.json({ success: true, count: leads.length, data: leads });
    } else {
      return res.json({ success: true, count: inMemoryLeads.length, data: inMemoryLeads });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
