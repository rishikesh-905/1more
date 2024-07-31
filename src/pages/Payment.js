// src/pages/Payment.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Payment.css';

const Payment = () => {
  const location = useLocation();
  const product = location.state?.product;
  const quantity = location.state?.quantity || 1; // Default quantity set to 1 if not provided

  return (
    <div className="payment-page">
      <h1>Payment</h1>
      {product ? (
        <div className="payment-details">
          <h2>Product: {product.name}</h2>
          <p>Price per unit: ${product.price}</p>
          <p>Quantity: {quantity}</p>
          <p>Total Price: ${product.price * quantity}</p>
          <button className="pay-now-button">Pay Now</button>
        </div>
      ) : (
        <p>No product selected for payment.</p>
      )}
    </div>
  );
};

export default Payment;
