import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function EditBookModal({ book, open, onClose, onSave }) {
  const [form, setForm] = useState(null);

  useEffect(() => {
    if (book) setForm({ ...book });
    else setForm(null);
  }, [book]);

  if (!form) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSave = () => {
    const payload = {
      title: form.title,
      author: form.author,
      genre: form.genre,
      price: parseFloat(form.price) || 0,
      stock: parseInt(form.stock, 10) || 0,
      publishedYear: form.publishedYear ? parseInt(form.publishedYear, 10) : undefined,
    };
    onSave(book._id, payload);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Book</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField label="Title" name="title" value={form.title} onChange={handleChange} fullWidth />
          <TextField label="Author" name="author" value={form.author} onChange={handleChange} fullWidth />
          <TextField label="Genre" name="genre" value={form.genre} onChange={handleChange} fullWidth />
          <TextField label="Price" name="price" value={form.price} onChange={handleChange} type="number" />
          <TextField label="Stock" name="stock" value={form.stock} onChange={handleChange} type="number" />
          <TextField label="Published Year" name="publishedYear" value={form.publishedYear || ''} onChange={handleChange} type="number" />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
