import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { TextField, Button, Typography, Container, Paper } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Styled component for the login form container
const LoginWrapper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 400,
  margin: 'auto',
  marginTop: theme.spacing(8),
}));

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Replace with your actual authentication API endpoint
      const response = await axios.post('http://localhost:3001/admin/login', { email, password });
      
      // Check if login is successful
      if (response.data.success) {
        // Store admin token in localStorage or state
        localStorage.setItem('adminToken', response.data.token);
        
        // Redirect to admin dashboard on successful login
        navigate('/admin/dashboard'); 
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <LoginWrapper elevation={3}>
        <Typography variant="h5" align="center">Admin Login</Typography>
        <form onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Typography color="error" align="center">{error}</Typography>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </LoginWrapper>
    </Container>
  );
};

export default AdminLoginPage;
