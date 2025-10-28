
import { Container, Typography } from '@mui/material';
import BookForm from '../components/BookForm';
import { addBook } from '../services/addBook';
import { useNavigate } from 'react-router-dom';

const AddBookPage = () => {
  const navigate = useNavigate();

  const handleSave = async (newBook: any) => {      
        addBook(newBook);
        navigate('/');
      }
    

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Add Book
      </Typography>
      <BookForm book={null} onSave={handleSave} canDelete={false}/>
    </Container>
  );
};

export default AddBookPage;
