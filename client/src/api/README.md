# API Configuration

This folder contains all API-related configurations and services.

## File Structure

```
api/
├── axiosConfig.js   # Axios instance configuration with interceptors
├── booksAPI.js      # Books API endpoints
└── index.js         # Central export file
```

## Usage

### Using the Books API Service

```javascript
import { booksAPI } from './api';

// Get all books
const books = await booksAPI.getAll();

// Create a new book
const newBook = await booksAPI.create({ title: 'Book Title', author: 'Author' });

// Update a book
const updated = await booksAPI.update(bookId, { price: 29.99 });

// Delete a book
await booksAPI.delete(bookId);
```

### Using the Axios Instance Directly

```javascript
import { api } from './api';

// Make custom API calls
const response = await api.get('/api/custom-endpoint');
```

## Configuration

The API base URL is configured via environment variable:
- `VITE_API_URL` - Set in `.env` file (default: http://localhost:5000)

## Features

- ✅ Centralized axios configuration
- ✅ Request/response interceptors
- ✅ Error handling
- ✅ Timeout configuration (10 seconds)
- ✅ Clean API service methods
- ✅ Easy to extend for new endpoints
