// src/pages/OrderConfirmation.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/OrderConfirmation.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const [quantity, setQuantity] = useState(1); // Default quantity set to 1

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleSubmitOrder = () => {
    if (quantity > product.stock) {
      alert(`The quantity you entered exceeds the available stock. Available stock: ${product.stock}`);
      return;
    }
    navigate('/payment', { state: { product, quantity } });
  };

  return (
    <div className="order-confirmation-page">
      {product ? (
        <div className="order-summary">
          <h1>Order Summary</h1>
          <div className="product-details">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <h2>{product.name}</h2>
              <p><strong>SKU:</strong> {product.sku}</p>
              <p><strong>Price:</strong> ${product.price}</p>
              <p><strong>Stock:</strong> {product.stock}</p>
              <p><strong>Supplier:</strong> {product.supplier}</p>
              <p><strong>Category:</strong> {product.category}</p>
            </div>
          </div>
          <div className="quantity-selector">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
            />
          </div>
          <button className="submit-order-button" onClick={handleSubmitOrder}>Submit Order</button>
        </div>
      ) : (
        <p>No product selected for ordering.</p>
      )}
    </div>
  );
};

export default OrderConfirmation;
