import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import AddBookForm from './components/AddBookForm.jsx';
import BookList from './components/BookList.jsx';
import EditBookModal from './components/EditBookModal.jsx';
import DeleteConfirm from './components/DeleteConfirm.jsx';
import booksAPI from './api/booksAPI';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editBook, setEditBook] = useState(null);
  const [deleteBook, setDeleteBook] = useState(null);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await booksAPI.getAll();
      setBooks(res.data);
    } catch (err) {
      console.error('Failed to fetch books', err.message);
      setError('Failed to connect to the server. Make sure the backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAdd = async (book) => {
    try {
      const res = await booksAPI.create(book);
      // prepend new book
      setBooks((prev) => [res.data, ...prev]);
    } catch (err) {
      console.error('Add failed', err.message);
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      const res = await booksAPI.update(id, updates);
      setBooks((prev) => prev.map((b) => (b._id === id ? res.data : b)));
      setEditBook(null);
    } catch (err) {
      console.error('Update failed', err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await booksAPI.delete(id);
      setBooks((prev) => prev.filter((b) => b._id !== id));
      setDeleteBook(null);
    } catch (err) {
      console.error('Delete failed', err.message);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Book Inventory
      </Typography>

      {error && (
        <Paper sx={{ p: 2, mb: 2, bgcolor: 'error.light', color: 'error.contrastText' }}>
          <Typography>{error}</Typography>
        </Paper>
      )}

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <AddBookForm onAdd={handleAdd} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Box>
            <Paper sx={{ p: 2 }}>
              <BookList
                books={books}
                loading={loading}
                onEdit={(b) => setEditBook(b)}
                onDelete={(b) => setDeleteBook(b)}
              />
            </Paper>
          </Box>
        </Grid>
      </Grid>

      <EditBookModal
        book={editBook}
        open={!!editBook}
        onClose={() => setEditBook(null)}
        onSave={handleUpdate}
      />

      <DeleteConfirm
        open={!!deleteBook}
        title={deleteBook?.title}
        onClose={() => setDeleteBook(null)}
        onConfirm={() => deleteBook && handleDelete(deleteBook._id)}
      />
    </Container>
  );
}

export default App;
