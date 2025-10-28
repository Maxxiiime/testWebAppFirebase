import { Container, Typography, CircularProgress } from '@mui/material';
import BookList from '../components/BookList';


const HomePage = () => {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'black' }}>
        Book List
      </Typography>
      <BookList/>
    </Container>
  );
};

export default HomePage;
