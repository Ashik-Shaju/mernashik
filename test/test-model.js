// Lightweight test that imports the model and validates a sample document
const Book = require('../src/models/book');

function run() {
  const sample = new Book({
    title: 'Sample Book',
    author: 'Jane Doe',
    genre: 'Fiction',
    price: 9.99
  });

  const err = sample.validateSync();
  if (err) {
    console.error('Model validation failed:', err.message);
    process.exit(1);
  }

  console.log('Model loaded and sample document validated (no DB required).');
}

run();
