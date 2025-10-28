
import { Container, Typography } from '@mui/material';
import BookForm from '../components/BookForm';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getBookById } from '../services/getBookById';
import { updateBookById } from '../services/updateBookById';
import type { Book } from '../utils/BookInterface';

const EditBookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book>();

  useEffect(() => {
    const fetchBook = async () => {
      if (id) { 
        const book = await getBookById(id);
        setBook(book);
      }
    };
    fetchBook();
  }, [id]);

  const handleSave = async (updatedBook: any) => {
    if (id) {
      updateBookById(id, updatedBook)
      navigate('/');
    }
  };

  if (!book) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Book
      </Typography>
      <BookForm book={book} onSave={handleSave} canDelete={true} />
    </Container>
  );
};

export default EditBookPage;
