import * as React from 'react';
import { motion } from 'framer-motion';
import Logo from '../assests/images/logo.png'; // Correct path
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../userSlice';

const theme = createTheme();

export default function LoginPage() {
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [role, setRole] = React.useState('user');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userCredentials = {
      username: data.get('username'),
      password: data.get('password'),
      role: role
    };

    setLoading(true);
    setError('');

    try {
      const [adminResponse, userResponse] = await Promise.all([
        axios.get('http://localhost:3001/admins'),
        axios.get('http://localhost:3001/users')
      ]);

      const admins = adminResponse.data;
      const users = userResponse.data;

      const admin = admins.find(
        (admin) => admin.username === userCredentials.username && admin.password === userCredentials.password
      );

      const user = users.find(
        (user) => user.username === userCredentials.username && user.password === userCredentials.password
      );

      if (role === 'admin' && admin) {
        dispatch(login({ email: admin.email, username: admin.username }));
        alert("Admin login successful");
        navigate('/admin');
      } else if (role === 'user' && user) {
        dispatch(login({ email: user.email, username: user.username }));
        alert("User login successful");
        navigate('/');
      } else {
        setError('Invalid username, password, or role.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card sx={{ width: '100%', p: 2 }}>
              <CardContent>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Login to Your Inventory
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                  {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {error}
                    </Alert>
                  )}
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    placeholder="Enter your username"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    sx={{ mb: 2 }}
                  />
                  <Select
                    value={role}
                    onChange={handleRoleChange}
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    <MenuItem value="user">User</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                  </Select>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={loading}
                  >
                    {loading ? 'Logging In...' : 'Log In'}
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="#" variant="body2">
                        {"Don't have an account? Register"}
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{ marginTop: '16px' }}
          >
            <Box sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
              <img src={Logo} alt="Company Logo" style={{ maxWidth: '150px' }} />
            </Box>
          </motion.div>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
              Your Company
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
