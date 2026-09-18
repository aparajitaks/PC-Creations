const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { inMemoryStore } = require('../data/initialData');
const User = require('../models/User');
const { getIsConnected } = require('../config/db');
const { authenticateToken, JWT_SECRET } = require('../middleware/auth');

const generateToken = (userId) => jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '7d' });

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
    }

    if (getIsConnected()) {
      const existing = await User.findOne({ email: email.toLowerCase() });
      if (existing) return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
      const hashed = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email: email.toLowerCase(), password: hashed });
      const token = generateToken(user._id.toString());
      return res.status(201).json({
        success: true,
        message: 'Account created successfully! Welcome to PC Creations Academy.',
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role, enrolledCourses: user.enrolledCourses }
      });
    } else {
      const existing = inMemoryStore.users.find(u => u.email === email.toLowerCase());
      if (existing) return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
      const hashed = await bcrypt.hash(password, 10);
      const newUser = {
        id: `user-${Date.now()}`,
        _id: `user-${Date.now()}`,
        name, email: email.toLowerCase(), password: hashed,
        role: 'student', avatar: name.slice(0, 2).toUpperCase(),
        enrolledCourses: [], createdAt: new Date()
      };
      inMemoryStore.users.push(newUser);
      const token = generateToken(newUser.id);
      return res.status(201).json({
        success: true,
        message: 'Account created successfully! Welcome to PC Creations Academy.',
        token,
        user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role, enrolledCourses: newUser.enrolledCourses }
      });
    }
  } catch (err) {
    console.error('[Auth/Register]', err);
    res.status(500).json({ success: false, message: 'Registration failed. Please try again.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    let user;
    if (getIsConnected()) {
      user = await User.findOne({ email: email.toLowerCase() });
    } else {
      user = inMemoryStore.users.find(u => u.email === email.toLowerCase());
    }

    if (!user) return res.status(401).json({ success: false, message: 'No account found with this email address.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Incorrect password. Please try again.' });

    const userId = user._id ? user._id.toString() : user.id;
    const token = generateToken(userId);

    res.json({
      success: true,
      message: `Welcome back, ${user.name}! 🎓`,
      token,
      user: {
        id: userId,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar || user.name.slice(0, 2).toUpperCase(),
        enrolledCourses: user.enrolledCourses || []
      }
    });
  } catch (err) {
    console.error('[Auth/Login]', err);
    res.status(500).json({ success: false, message: 'Login failed. Please try again.' });
  }
});

// GET /api/auth/me — verify token and return current user
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const u = req.user;
    const userId = u._id ? u._id.toString() : u.id;
    res.json({
      success: true,
      user: {
        id: userId,
        name: u.name,
        email: u.email,
        role: u.role,
        avatar: u.avatar || u.name.slice(0, 2).toUpperCase(),
        enrolledCourses: u.enrolledCourses || []
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load profile.' });
  }
});

module.exports = router;
