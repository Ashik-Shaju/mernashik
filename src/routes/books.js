const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const mongoose = require('mongoose');

// POST /api/books -> Add a new book
router.post('/', async (req, res, next) => {
  try {
    const { title, author, genre, price, stock, publishedYear } = req.body;
    const book = new Book({ title, author, genre, price, stock, publishedYear });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
});

// GET /api/books -> Get all books
router.get('/', async (req, res, next) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    next(err);
  }
});

// PUT /api/books/:id -> Update a book’s details
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid book id' });
    const updates = req.body;
    const book = await Book.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/books/:id -> Delete a book
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid book id' });
    const book = await Book.findByIdAndDelete(id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
