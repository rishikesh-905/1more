import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, TextField, Button, Grid, Container, MenuItem, Select, InputLabel, FormControl, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import '../styles/StockMovement.css';

const StockMovement = () => {
  const [stockMovements, setStockMovements] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState('All');
  const [summary, setSummary] = useState({
    totalMovements: 0,
    totalItems: 0,
  });
  const [newMovement, setNewMovement] = useState({
    date: '',
    item: '',
    quantity: '',
    from: '',
    to: '',
    warehouse: ''
  });
  const [editMovement, setEditMovement] = useState(null);

  useEffect(() => {
    const fetchStockMovements = async () => {
      try {
        const response = await axios.get('http://localhost:3001/stockMovements');
        setStockMovements(response.data);

        const totalItems = response.data.reduce((acc, movement) => acc + movement.quantity, 0);
        setSummary({
          totalMovements: response.data.length,
          totalItems,
        });
      } catch (error) {
        console.error('Failed to fetch stock movements:', error);
      }
    };

    const fetchWarehouses = async () => {
      try {
        const response = await axios.get('http://localhost:3001/warehouses');
        setWarehouses(response.data);
      } catch (error) {
        console.error('Failed to fetch warehouses:', error);
      }
    };

    fetchStockMovements();
    fetchWarehouses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovement({ ...newMovement, [name]: value });
  };

  const handleWarehouseChange = (e) => {
    setSelectedWarehouse(e.target.value);
  };

  const filteredMovements = selectedWarehouse === 'All'
    ? stockMovements
    : stockMovements.filter(movement => movement.warehouse === selectedWarehouse);

  const handleAddMovement = async () => {
    try {
      const response = await axios.post('http://localhost:3001/stockMovements', newMovement);
      setStockMovements([...stockMovements, response.data]);
      setSummary(prev => ({
        totalMovements: prev.totalMovements + 1,
        totalItems: prev.totalItems + parseInt(newMovement.quantity, 10),
      }));
      setNewMovement({ date: '', item: '', quantity: '', from: '', to: '', warehouse: '' });
    } catch (error) {
      console.error('Failed to add stock movement:', error);
    }
  };

  const handleEditClick = (movement) => {
    setEditMovement(movement);
    setNewMovement(movement);
  };

  const handleUpdateMovement = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/stockMovements/${editMovement.id}`, newMovement);
      setStockMovements(stockMovements.map((movement) => (movement.id === editMovement.id ? response.data : movement)));
      setSummary(prev => ({
        totalMovements: prev.totalMovements,
        totalItems: prev.totalItems - editMovement.quantity + parseInt(newMovement.quantity, 10),
      }));
      setEditMovement(null);
      setNewMovement({ date: '', item: '', quantity: '', from: '', to: '', warehouse: '' });
    } catch (error) {
      console.error('Failed to update stock movement:', error);
    }
  };

  const handleDeleteMovement = async (id, quantity) => {
    try {
      await axios.delete(`http://localhost:3001/stockMovements/${id}`);
      setStockMovements(stockMovements.filter((movement) => movement.id !== id));
      setSummary(prev => ({
        totalMovements: prev.totalMovements - 1,
        totalItems: prev.totalItems - quantity,
      }));
    } catch (error) {
      console.error('Failed to delete stock movement:', error);
    }
  };

  return (
    <Container maxWidth="lg" className="stock-movement">
      <Typography variant="h4" gutterBottom>
        Stock Movement and Warehouse Management
      </Typography>
      <Typography variant="body1" gutterBottom>
        Track stock movements and manage multiple warehouses or storage locations.
      </Typography>

      <div className="summary-section">
        <Card className="summary-card">
          <CardContent>
            <Typography variant="h5">Total Movements</Typography>
            <Typography variant="h6">{summary.totalMovements}</Typography>
          </CardContent>
        </Card>
        <Card className="summary-card">
          <CardContent>
            <Typography variant="h5">Total Items Moved</Typography>
            <Typography variant="h6">{summary.totalItems}</Typography>
          </CardContent>
        </Card>
      </div>

      <div className="filter-section">
        <FormControl fullWidth margin="normal">
          <InputLabel>Filter by Warehouse</InputLabel>
          <Select
            value={selectedWarehouse}
            onChange={handleWarehouseChange}
          >
            <MenuItem value="All">All Warehouses</MenuItem>
            {warehouses.map(warehouse => (
              <MenuItem key={warehouse.id} value={warehouse.name}>{warehouse.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <Card className="form-card">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {editMovement ? 'Update Stock Movement' : 'Add New Stock Movement'}
          </Typography>
          <form noValidate autoComplete="off">
            <TextField
              label="Date"
              name="date"
              type="date"
              value={newMovement.date}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Item"
              name="item"
              value={newMovement.item}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              value={newMovement.quantity}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="From"
              name="from"
              value={newMovement.from}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="To"
              name="to"
              value={newMovement.to}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Warehouse</InputLabel>
              <Select
                name="warehouse"
                value={newMovement.warehouse}
                onChange={handleInputChange}
              >
                <MenuItem value="">Select Warehouse</MenuItem>
                {warehouses.map(warehouse => (
                  <MenuItem key={warehouse.id} value={warehouse.name}>{warehouse.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={editMovement ? handleUpdateMovement : handleAddMovement}
              style={{ marginTop: '20px' }}
            >
              {editMovement ? 'Update Movement' : 'Add Movement'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="movement-list">
        <Typography variant="h5" gutterBottom>
          Stock Movements
        </Typography>
        <table className="movement-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>From</th>
              <th>To</th>
              <th>Warehouse</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovements.map(movement => (
              <tr key={movement.id}>
                <td>{movement.date}</td>
                <td>{movement.item}</td>
                <td>{movement.quantity}</td>
                <td>{movement.from}</td>
                <td>{movement.to}</td>
                <td>{movement.warehouse}</td>
                <td>
                  <IconButton onClick={() => handleEditClick(movement)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteMovement(movement.id, movement.quantity)} color="secondary">
                    <Delete />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default StockMovement;
