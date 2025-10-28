
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../utils/firebase';

const Navbar = () => {

  const [user, loading, error] = useAuthState(auth);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Library
          </Link>
        </Typography>
          {user &&
          <>
            <Button color="inherit" component={Link} to="/add">
              Add Book
            </Button>
            <Button color="inherit" component={Link} to="/logout">
            Logout
          </Button>
        </>
        }
        {!user && (
          <Button color="inherit" component={Link} to="/login">Connect</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
