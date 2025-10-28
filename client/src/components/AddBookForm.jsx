import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const initial = { title: '', author: '', genre: '', price: '', stock: 0, publishedYear: '' };

export default function AddBookForm({ onAdd }) {
  const [form, setForm] = useState(initial);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: form.title,
      author: form.author,
      genre: form.genre,
      price: parseFloat(form.price) || 0,
      stock: parseInt(form.stock, 10) || 0,
      publishedYear: form.publishedYear ? parseInt(form.publishedYear, 10) : undefined,
    };
    onAdd(payload);
    setForm(initial);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField label="Title" name="title" value={form.title} onChange={handleChange} required />
        <TextField label="Author" name="author" value={form.author} onChange={handleChange} required />
        <TextField label="Genre" name="genre" value={form.genre} onChange={handleChange} required />
        <TextField label="Price" name="price" value={form.price} onChange={handleChange} type="number" inputProps={{ step: '0.01' }} required />
        <TextField label="Stock" name="stock" value={form.stock} onChange={handleChange} type="number" />
        <TextField label="Published Year" name="publishedYear" value={form.publishedYear} onChange={handleChange} type="number" />
        <Button type="submit" variant="contained">Add Book</Button>
      </Stack>
    </form>
  );
}
