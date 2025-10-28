const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/book-inventory';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      // useNewUrlParser and useUnifiedTopology are default in Mongoose 6+
    });
    console.log(`MongoDB connected to ${MONGO_URI}`);
  } catch (err) {
    console.error('Failed to connect to MongoDB', err.message);
    // Don't crash the process here; caller can decide. But log the error.
  }
};

module.exports = connectDB;
