const jwt = require('jsonwebtoken');
const { inMemoryStore } = require('../data/initialData');
const User = require('../models/User');
const { getIsConnected } = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'pc_creations_lms_jwt_secret_key_2026';

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied. No authorization token provided. Please log in to view courses.'
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Check if Mongo is connected or in-memory
    if (getIsConnected()) {
      const user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(401).json({ success: false, message: 'User session invalid or expired.' });
      }
      req.user = user;
    } else {
      const user = inMemoryStore.users.find(u => u.id === decoded.id || u._id === decoded.id);
      if (!user) {
        return res.status(401).json({ success: false, message: 'User session invalid or expired.' });
      }
      req.user = user;
    }

    next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired authorization token.'
    });
  }
};

// Optional auth: attaches user if token is present, but doesn't block if absent
const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (getIsConnected()) {
      req.user = await User.findById(decoded.id).select('-password');
    } else {
      req.user = inMemoryStore.users.find(u => u.id === decoded.id || u._id === decoded.id) || null;
    }
  } catch (err) {
    req.user = null;
  }
  next();
};

module.exports = { authenticateToken, optionalAuth, JWT_SECRET };
