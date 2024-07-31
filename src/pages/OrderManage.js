import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, TextField, Button, Grid, Container, MenuItem, Select, InputLabel, FormControl, CircularProgress } from '@mui/material';
import '../styles/OrderManagement.css';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    product: '',
    quantity: '',
    orderDate: '',
    status: '',
    customer: '',
    paymentStatus: '',
    paymentMethod: ''
  });
  const [editOrder, setEditOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3001/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddOrder = async () => {
    if (Object.values(newOrder).some(val => val === '')) {
      alert('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/orders', newOrder);
      setOrders(prevOrders => [...prevOrders, response.data]);
      resetForm();
    } catch (error) {
      console.error('Failed to add order:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateOrder = async () => {
    if (Object.values(newOrder).some(val => val === '')) {
      alert('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(`http://localhost:3001/orders/${editOrder.id}`, newOrder);
      setOrders(prevOrders =>
        prevOrders.map(order => (order.id === editOrder.id ? response.data : order))
      );
      resetForm();
    } catch (error) {
      console.error('Failed to update order:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3001/orders/${id}`);
      setOrders(prevOrders => prevOrders.filter(order => order.id !== id));
    } catch (error) {
      console.error('Failed to delete order:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (order) => {
    setEditOrder(order);
    setNewOrder(order);
  };

  const resetForm = () => {
    setEditOrder(null);
    setNewOrder({
      product: '',
      quantity: '',
      orderDate: '',
      status: '',
      customer: '',
      paymentStatus: '',
      paymentMethod: ''
    });
  };

  return (
    <Container maxWidth="lg" className="order-management">
      <Typography variant="h4" gutterBottom>
        Order Management
      </Typography>
      {loading && <CircularProgress className="loading-spinner" />}
      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order.id}>
            <Card className="order-card">
              <CardContent>
                <Typography variant="h6">{order.product}</Typography>
                <Typography><strong>Quantity:</strong> {order.quantity}</Typography>
                <Typography><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</Typography>
                <Typography><strong>Status:</strong> {order.status}</Typography>
                <Typography><strong>Customer:</strong> {order.customer}</Typography>
                <Typography><strong>Payment Status:</strong> {order.paymentStatus}</Typography>
                <Typography><strong>Payment Method:</strong> {order.paymentMethod}</Typography>
                <Button variant="contained" color="primary" onClick={() => handleEditClick(order)} className="edit-button">Edit</Button>
                <Button variant="contained" color="secondary" onClick={() => handleDeleteOrder(order.id)} className="delete-button">Delete</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Card className="order-form-card" style={{ marginTop: '20px' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {editOrder ? 'Update Order' : 'Add New Order'}
          </Typography>
          <form noValidate autoComplete="off">
            <TextField
              label="Product"
              name="product"
              value={newOrder.product}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              value={newOrder.quantity}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label="Order Date"
              name="orderDate"
              type="date"
              value={newOrder.orderDate}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={newOrder.status}
                onChange={handleInputChange}
                label="Status"
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Shipped">Shipped</MenuItem>
                <MenuItem value="Delivered">Delivered</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Customer"
              name="customer"
              value={newOrder.customer}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Payment Status</InputLabel>
              <Select
                name="paymentStatus"
                value={newOrder.paymentStatus}
                onChange={handleInputChange}
                label="Payment Status"
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Failed">Failed</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel>Payment Method</InputLabel>
              <Select
                name="paymentMethod"
                value={newOrder.paymentMethod}
                onChange={handleInputChange}
                label="Payment Method"
              >
                <MenuItem value="Credit Card">Credit Card</MenuItem>
                <MenuItem value="PayPal">PayPal</MenuItem>
                <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={editOrder ? handleUpdateOrder : handleAddOrder}
              className={editOrder ? 'update-button' : 'add-button'}
              style={{ marginTop: '20px' }}
            >
              {editOrder ? 'Update Order' : 'Add Order'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default OrderManagement;
