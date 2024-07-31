import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Grid, Paper, Card, CardContent } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Styled component for the statistics container
const StatisticsWrapper = styled('div')(({ theme }) => ({
  margin: theme.spacing(3),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

// Sample data for charts
const data = [
  { name: 'Jan', users: 4000, revenue: 2400 },
  { name: 'Feb', users: 3000, revenue: 2210 },
  { name: 'Mar', users: 2000, revenue: 2290 },
  { name: 'Apr', users: 2780, revenue: 2000 },
  { name: 'May', users: 1890, revenue: 2181 },
  { name: 'Jun', users: 2390, revenue: 2500 },
  { name: 'Jul', users: 3490, revenue: 2100 },
];

const SiteStatistics = () => {
  return (
    <StatisticsWrapper>
      <Typography variant="h4" gutterBottom>Site Statistics</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                User Growth Over Time
              </Typography>
              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Revenue Over Time
              </Typography>
              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
              </LineChart>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </StatisticsWrapper>
  );
};

export default SiteStatistics;
