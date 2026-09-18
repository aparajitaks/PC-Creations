const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pc_creations';
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 2000,
    });
    isConnected = true;
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
  } catch (err) {
    console.warn(`[MongoDB] Local daemon not responding, falling back to persistent in-memory data store.`);
    isConnected = false;
  }
};

module.exports = { connectDB, getIsConnected: () => isConnected };
