import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Card, CardContent, CardActions, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import BarChart from '@mui/icons-material/BarChart';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { motion } from 'framer-motion';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const useStyles = styled((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  cardContent: {
    flexGrow: 1,
  },
  icon: {
    fontSize: 40,
    color: theme.palette.primary.main,
  },
  chartContainer: {
    marginTop: theme.spacing(4),
  },
  chart: {
    height: 400,
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gridItem: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%', // Make sure the cards take the full width
  },
}));

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminDashboard = () => {
  const classes = useStyles();
  const [data, setData] = useState({
    users: 0,
    orders: 0,
    revenue: 0,
    performance: 0,
  });
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users and orders data from JSON server
        const [usersResponse, ordersResponse] = await Promise.all([
          axios.get('http://localhost:3001/users'),
          axios.get('http://localhost:3001/orders'),
        ]);

        const users = usersResponse.data.length;
        const orders = ordersResponse.data.length;

        // Calculate revenue from orders
        const revenue = ordersResponse.data.reduce((acc, order) => acc + (order.price || 0), 0);

        // Example performance calculation
        const performance = 85;

        setData({
          users,
          orders,
          revenue,
          performance,
        });

        // Prepare data for pie chart
        const pieData = [
          { name: 'Users', value: users },
          { name: 'Orders', value: orders },
          { name: 'Revenue', value: revenue },
        ];

        setPieData(pieData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3} justifyContent="flex-start">
        <Grid item xs={12} sm={6} md={3} className={classes.gridItem}>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Card className={classes.card}>
              <CardContent>
                <div className={classes.cardHeader}>
                  <Typography variant="h6" gutterBottom>
                    Users
                  </Typography>
                  <PeopleIcon className={classes.icon} />
                </div>
                <Typography variant="h4" component="p">
                  {data.users}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  View More
                </Button>
              </CardActions>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={3} className={classes.gridItem}>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Card className={classes.card}>
              <CardContent>
                <div className={classes.cardHeader}>
                  <Typography variant="h6" gutterBottom>
                    Orders
                  </Typography>
                  <ShoppingCartIcon className={classes.icon} />
                </div>
                <Typography variant="h4" component="p">
                  {data.orders}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  View More
                </Button>
              </CardActions>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={3} className={classes.gridItem}>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Card className={classes.card}>
              <CardContent>
                <div className={classes.cardHeader}>
                  <Typography variant="h6" gutterBottom>
                    Revenue
                  </Typography>
                  <AttachMoneyIcon className={classes.icon} />
                </div>
                <Typography variant="h4" component="p">
                  ${data.revenue.toFixed(2)}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  View More
                </Button>
              </CardActions>
            </Card>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6} md={3} className={classes.gridItem}>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Card className={classes.card}>
              <CardContent>
                <div className={classes.cardHeader}>
                  <Typography variant="h6" gutterBottom>
                    Performance
                  </Typography>
                  <BarChart className={classes.icon} />
                </div>
                <Typography variant="h4" component="p">
                  {data.performance}%
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  View More
                </Button>
              </CardActions>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
      <div className={classes.chartContainer}>
        <Paper className={classes.chart}>
          <Typography variant="h6" gutterBottom align="center">
            Sales Analytics
          </Typography>
          <div>
            <PieChart width={400} height={400}>
              <Pie
                data={pieData}
                cx={200}
                cy={200}
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </Paper>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
