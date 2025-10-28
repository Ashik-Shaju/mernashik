const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ashik';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    // Log connection info without exposing credentials
    try {
      // Try to parse using the URL class to extract host and db name
      const url = new URL(MONGO_URI);
      const host = url.host || 'unknown-host';
      const dbName = (url.pathname && url.pathname !== '/') ? url.pathname.replace(/^\//, '') : '(unspecified)';
      console.log(`MongoDB connected to ${host} (db: ${dbName})`);
    } catch (parseErr) {
      // Fallback: mask password if parsing fails (e.g., odd URIs)
      const masked = MONGO_URI.replace(/\/\/(.*?):(.*?)@/, '//$1:****@');
      console.log(`MongoDB connected to ${masked}`);
    }
  } catch (err) {
    console.error('Failed to connect to MongoDB', err.message);
    // Do not throw — allow the app to continue starting without DB
  }
};

module.exports = connectDB;
