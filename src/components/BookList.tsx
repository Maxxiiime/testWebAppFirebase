import { useState, useEffect } from 'react';
import { Card, CardContent, CardActions, Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { getAllBooks } from '../services/getAllBooks';
import type { Book } from '../utils/BookInterface';
import { auth } from '../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    const fetchBooks = async () => {
      const booksData = await getAllBooks();
      setBooks(booksData);
    };

    fetchBooks();
  }, []);

  return (
    <Grid container spacing={3}>
      {books.map((book) => (
        <Grid item xs={12} sm={6} md={4} key={book.id}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                {book.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {book.summary}
              </Typography>
              <Typography sx={{ mt: 2 }}>
                <strong>Author:</strong> {book.author}
              </Typography>
              <Typography>
                <strong>Price:</strong> ${book.price}
              </Typography>
            </CardContent>
            {user && 
            <CardActions>
              <Button component={Link} to={`/edit/${book.id}`} size="small">Edit</Button>
            </CardActions>
            
            }
            
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BookList;
