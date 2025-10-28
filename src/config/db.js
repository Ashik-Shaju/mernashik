const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/book-inventory';

const connectDB = () => {
  return mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log(`MongoDB connected to ${MONGO_URI}`);
    })
    .catch((err) => {
      console.error('Failed to connect to MongoDB', err.message);
      // Propagate the error so the caller can decide (fail-fast)
      throw err;
    });
};

module.exports = connectDB;
