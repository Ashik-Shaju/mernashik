import api from './axiosConfig';

// Books API endpoints
const booksAPI = {
  // Get all books
  getAll: () => api.get('/api/books'),

  // Get single book by ID
  getById: (id) => api.get(`/api/books/${id}`),

  // Create new book
  create: (bookData) => api.post('/api/books', bookData),

  // Update existing book
  update: (id, bookData) => api.put(`/api/books/${id}`, bookData),

  // Delete book
  delete: (id) => api.delete(`/api/books/${id}`),
};

export default booksAPI;
