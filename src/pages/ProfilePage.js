// src/pages/ProfilePage.js
import React from 'react';
import { useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import { Typography, Paper, Avatar, Grid, Divider, IconButton, Button, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { blue, grey, teal } from '@mui/material/colors';

const ProfileHeader = styled('div')(({ theme }) => ({
  width: '100%',
  background: `linear-gradient(to right, ${blue[800]}, ${blue[600]})`,
  color: theme.palette.common.white,
  padding: theme.spacing(6, 0),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
}));

const ProfileContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: grey[100],
  minHeight: '100vh',
}));

const ProfileCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: 600,
  textAlign: 'center',
  boxShadow: theme.shadows[8],
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  position: 'relative',
  border: `1px solid ${grey[300]}`,
}));

const UserProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  marginBottom: theme.spacing(2),
  backgroundColor: teal[500],
  color: theme.palette.common.white,
  fontSize: '3rem',
}));

const UserDetailsGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const DetailItem = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  textAlign: 'left',
}));

const ProfilePage = () => {
  const user = useSelector((state) => state.user);

  if (!user || !user.username) {
    return (
      <ProfileContainer>
        <Typography variant="h4" color="textSecondary">
          User data is not available.
        </Typography>
      </ProfileContainer>
    );
  }

  return (
    <>
      <ProfileHeader>
        <Typography variant="h3" component="h1">
          User Profile
        </Typography>
        <Typography variant="h6">
          Welcome back, {user.username}!
        </Typography>
      </ProfileHeader>
      <ProfileContainer>
        <ProfileCard>
          <UserProfileAvatar>
            {user.username[0]} {/* Display the first letter of the username */}
          </UserProfileAvatar>
          <Typography variant="h4" gutterBottom>
            {user.username}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <UserDetailsGrid container spacing={2}>
            <DetailItem item xs={12} sm={6}>
              <EmailIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="body1">
                {user.email || 'N/A'}
              </Typography>
            </DetailItem>
            <DetailItem item xs={12} sm={6}>
              <PhoneIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="body1">
                {user.phone || 'N/A'}
              </Typography>
            </DetailItem>
            <DetailItem item xs={12} sm={6}>
              <LocationOnIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="body1">
                {user.address || 'N/A'}
              </Typography>
            </DetailItem>
            {/* Add more sections if needed */}
          </UserDetailsGrid>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
              sx={{ textTransform: 'none' }}
              href="/edit-profile" // Link to an edit profile page
            >
              Edit Profile
            </Button>
          </Box>
        </ProfileCard>
      </ProfileContainer>
    </>
  );
};

export default ProfilePage;
