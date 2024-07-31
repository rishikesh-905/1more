import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Grid, Card, CardContent, TextField, Button, Divider, IconButton, Tooltip } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import LockIcon from '@mui/icons-material/Lock';

// Styled component for the admin panel container
const AdminPanelWrapper = styled('div')(({ theme }) => ({
  margin: theme.spacing(3),
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
}));

// Styled component for each card
const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

const AdminPanel = () => {
  const [adminSettings, setAdminSettings] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setAdminSettings((prevSettings) => ({
      ...prevSettings,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement form submission logic here
    console.log('Updated admin settings:', adminSettings);
  };

  return (
    <AdminPanelWrapper>
      <Typography variant="h4" gutterBottom>Admin Panel</Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" gutterBottom>Admin Profile</Typography>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={adminSettings.username}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={adminSettings.email}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" gutterBottom>Change Password</Typography>
                <TextField
                  fullWidth
                  label="Current Password"
                  type="password"
                  name="currentPassword"
                  value={adminSettings.currentPassword}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  name="newPassword"
                  value={adminSettings.newPassword}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  type="password"
                  name="confirmNewPassword"
                  value={adminSettings.confirmNewPassword}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
        >
          Save Changes
        </Button>
      </form>
    </AdminPanelWrapper>
  );
};

export default AdminPanel;
