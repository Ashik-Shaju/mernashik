require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;
if (!uri) {
  console.error('MONGO_URI is not set in environment or .env');
  process.exit(1);
}

console.log('Attempting MongoDB connection (won\'t print URI or password)...');

mongoose
  .connect(uri, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('Connected to MongoDB successfully.');
    return mongoose.disconnect();
  })
  .catch((err) => {
    // Print error name and message (but not the URI)
    console.error('Connection error name:', err.name);
    console.error('Connection error message:', err.message);
    // For deeper debugging, print stack without revealing env
    // (stack doesn't contain the URI/password normally)
    console.error(err.stack);
    process.exit(1);
  });
