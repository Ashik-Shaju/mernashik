import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';

export default function BookList({ books, loading, onEdit, onDelete }) {
  if (loading) return <CircularProgress />;
  if (!books || books.length === 0) return <Typography>No books found.</Typography>;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Genre</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Published</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((b) => (
            <TableRow key={b._id}>
              <TableCell>{b.title}</TableCell>
              <TableCell>{b.author}</TableCell>
              <TableCell>{b.genre}</TableCell>
              <TableCell>{b.price}</TableCell>
              <TableCell>{b.stock}</TableCell>
              <TableCell>{b.publishedYear || '-'}</TableCell>
              <TableCell align="right">
                <IconButton size="small" onClick={() => onEdit(b)}>
                  <EditIcon />
                </IconButton>
                <IconButton size="small" onClick={() => onDelete(b)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
