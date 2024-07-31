import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Grid, Card, CardContent, TextField, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel, Button, Divider, IconButton, Tooltip, Avatar } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import UploadIcon from '@mui/icons-material/Upload';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

// Styled component for the settings container
const SettingsWrapper = styled('div')(({ theme }) => ({
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

const Settings = () => {
  const [settings, setSettings] = useState({
    username: '',
    email: '',
    language: 'en',
    notifications: false,
    darkMode: false,
    password: '',
    newPassword: '',
  });
  const [profilePic, setProfilePic] = useState(null);

  // Handle input changes
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle profile picture upload
  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement form submission logic here
    console.log('Updated settings:', settings);
  };

  return (
    <SettingsWrapper>
      <Typography variant="h4" gutterBottom>Settings</Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" gutterBottom>Profile</Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar src={profilePic} sx={{ width: 100, height: 100, marginRight: 2 }} />
                  <div>
                    <input
                      accept="image/*"
                      id="upload-profile-pic"
                      type="file"
                      style={{ display: 'none' }}
                      onChange={handleProfilePicChange}
                    />
                    <label htmlFor="upload-profile-pic">
                      <IconButton color="primary" component="span">
                        <UploadIcon />
                      </IconButton>
                    </label>
                    <Typography variant="body2">Upload Profile Picture</Typography>
                  </div>
                </div>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={settings.username}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="Current Password"
                  type="password"
                  name="password"
                  value={settings.password}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  name="newPassword"
                  value={settings.newPassword}
                  onChange={handleChange}
                  margin="normal"
                  variant="outlined"
                />
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12} md={8}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" gutterBottom>Preferences</Typography>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Language</InputLabel>
                  <Select
                    name="language"
                    value={settings.language}
                    onChange={handleChange}
                    variant="outlined"
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="es">Spanish</MenuItem>
                    <MenuItem value="fr">French</MenuItem>
                  </Select>
                </FormControl>
                <FormControlLabel
                  control={
                    <Switch
                      name="notifications"
                      checked={settings.notifications}
                      onChange={handleChange}
                    />
                  }
                  label="Enable Notifications"
                />
                <FormControlLabel
                  control={
                    <Switch
                      name="darkMode"
                      checked={settings.darkMode}
                      onChange={handleChange}
                    />
                  }
                  label="Dark Mode"
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
    </SettingsWrapper>
  );
};

export default Settings;
