import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown, faEdit, faTrash, faPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import InventoryChart from '../InventoryChart'; // Import the chart component
import '../styles/InventoryTracking.css';

const InventoryTracking = () => {
  const [trackingDetails, setTrackingDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    status: '',
    location: '',
    lastUpdated: ''
  });
  const [editItem, setEditItem] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  useEffect(() => {
    const fetchTrackingDetails = async () => {
      try {
        const response = await axios.get('http://localhost:3001/tracking-details');
        setTrackingDetails(response.data);
      } catch (error) {
        setError('Failed to fetch tracking details.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrackingDetails();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: value
    });
  };

  const handleAddItem = async () => {
    try {
      const response = await axios.post('http://localhost:3001/tracking-details', newItem);
      setTrackingDetails([...trackingDetails, response.data]);
      setNewItem({
        name: '',
        quantity: '',
        status: '',
        location: '',
        lastUpdated: ''
      });
    } catch (error) {
      setError('Failed to add item.');
    }
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    setNewItem(item); // Populate form with item details for editing
  };

  const handleUpdateItem = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/tracking-details/${editItem.id}`, newItem);
      setTrackingDetails(trackingDetails.map(item => item.id === editItem.id ? response.data : item));
      setEditItem(null);
      setNewItem({
        name: '',
        quantity: '',
        status: '',
        location: '',
        lastUpdated: ''
      });
    } catch (error) {
      setError('Failed to update item.');
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/tracking-details/${id}`);
      setTrackingDetails(trackingDetails.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error.response ? error.response.data : error.message);
      setError('Failed to delete item.');
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedTrackingDetails = [...trackingDetails].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        return <FontAwesomeIcon icon={faSortUp} />;
      } else {
        return <FontAwesomeIcon icon={faSortDown} />;
      }
    }
    return null;
  };

  return (
    <div className="inventory-tracking-page">
      <h1>Inventory Tracking</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        <>
          <table className="tracking-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('name')}>Item {getSortIcon('name')}</th>
                <th onClick={() => handleSort('quantity')}>Quantity {getSortIcon('quantity')}</th>
                <th onClick={() => handleSort('status')}>Status {getSortIcon('status')}</th>
                <th onClick={() => handleSort('location')}>Location {getSortIcon('location')}</th>
                <th onClick={() => handleSort('lastUpdated')}>Last Updated {getSortIcon('lastUpdated')}</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedTrackingDetails.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.status}</td>
                  <td>{item.location}</td>
                  <td>{item.lastUpdated}</td>
                  <td>
                    <button onClick={() => handleEditClick(item)} className="action-button edit-button">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button onClick={() => handleDeleteItem(item.id)} className="action-button delete-button">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="add-item-form">
            <h2>{editItem ? 'Update Item' : 'Add New Item'}</h2>
            <input
              type="text"
              name="name"
              value={newItem.name}
              onChange={handleInputChange}
              placeholder="Item Name"
              className="form-input"
            />
            <input
              type="number"
              name="quantity"
              value={newItem.quantity}
              onChange={handleInputChange}
              placeholder="Quantity"
              className="form-input"
            />
            <input
              type="text"
              name="status"
              value={newItem.status}
              onChange={handleInputChange}
              placeholder="Status"
              className="form-input"
            />
            <input
              type="text"
              name="location"
              value={newItem.location}
              onChange={handleInputChange}
              placeholder="Location"
              className="form-input"
            />
            <input
              type="date"
              name="lastUpdated"
              value={newItem.lastUpdated}
              onChange={handleInputChange}
              placeholder="Last Updated"
              className="form-input"
            />
            {editItem ? (
              <button onClick={handleUpdateItem} className="action-button update-button">
                <FontAwesomeIcon icon={faCheck} /> Update Item
              </button>
            ) : (
              <button onClick={handleAddItem} className="action-button add-button">
                <FontAwesomeIcon icon={faPlus} /> Add Item
              </button>
            )}
            {editItem && (
              <button onClick={() => setEditItem(null)} className="action-button cancel-button">
                <FontAwesomeIcon icon={faTimes} /> Cancel
              </button>
            )}
          </div>
          <InventoryChart data={trackingDetails} /> {/* Add the chart */}
        </>
      )}
    </div>
  );
};

export default InventoryTracking;
