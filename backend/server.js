const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets from workspace assets folder
app.use('/assets', express.static(path.join(__dirname, '../assets')));

// Database connection
connectDB();

// API Routes
app.use('/api/leads', require('./routes/leads'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/content', require('./routes/content'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    agency: 'PC Creations - Digital Marketing Agency Bangalore',
    slogan: 'Build Brand — Not Just Business',
    contact: {
      phone: '72045 11681',
      email: 'pccreation295@gmail.com',
      instagram: '@pc_creations_1',
      branches: ['Rajajinagar, Bangalore', 'Indiranagar, Bangalore']
    }
  });
});

const server = app.listen(PORT, () => {
  console.log(`[PC Creations Server] Running on port http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n[ERROR] Port ${PORT} is already in use.`);
    console.error(`→ Run this to free it:  kill -9 $(lsof -ti :${PORT})\n`);
    process.exit(1);
  } else {
    throw err;
  }
});
