
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container } from '@mui/material';
import { deleteBookById } from '../services/deleteBookById';


const BookForm = ({ book, onSave, canDelete }) => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');

  const naviguate = useNavigate();


  useEffect(() => {
    if (book) {
      setTitle(book.title || '');
      setAuthor(book.author || '');
      setSummary(book.summary || '');
      setPrice(book.price || '');
    }
  }, [book]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({ title, author, summary, price });
  };

  const handleDelete = () => {
    if(book)
    {
      deleteBookById(book.id);
      naviguate('/');
    }
    
  }


  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
         <TextField
          label="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>

        {canDelete &&
         <Button type="button" variant="contained" color="secondary" onClick={handleDelete}>
          Delete
         </Button>
        }
      </form>
    </Container>
  );
};

export default BookForm;
