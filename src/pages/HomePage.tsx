import { Container, Typography, CircularProgress } from '@mui/material';
import BookList from '../components/BookList';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebase';

const HomePage = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <Container>
      {user && (
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'black' }}>
          Welcome, {user.email}!
        </Typography>
      )}
      <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'black' }}>
        Book List
      </Typography>
      <BookList/>
    </Container>
  );
};

export default HomePage;
