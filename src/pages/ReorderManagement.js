import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import '../styles/Reorder.css';

const ReorderManagement = () => {
  return (
    <Container maxWidth="lg" className="reorder-management">
      <Typography variant="h4" gutterBottom>
        Reorder Management
      </Typography>
      <Typography variant="body1" paragraph>
        Manage the reorder process efficiently, set reorder points, and receive alerts when inventory levels are low.
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Set Reorder Points
              </Typography>
              <Typography variant="body1" paragraph>
                Define the minimum stock level for each product to automate the reorder process and prevent stockouts.
              </Typography>
              <Button variant="contained" color="primary" size="large">
                Set Reorder Points
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Receive Low Stock Alerts
              </Typography>
              <Typography variant="body1" paragraph>
                Get notified when inventory levels fall below your defined reorder points to ensure timely replenishment.
              </Typography>
              <Button variant="contained" color="secondary" size="large">
                Manage Alerts
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ReorderManagement;
