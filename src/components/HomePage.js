// src/components/HomePage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/HomePage.css';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handlePlaceOrder = (product) => {
    navigate('/order-confirmation', { state: { product } });
  };

  return (
    <div className="home-page">
      <header className="hero-banner">
        <div className="hero-content">
          <h1>Welcome to Inventory Management System</h1>
          <p>Your ultimate solution for efficient B2B inventory management.</p>
          <button className="cta-button">Get Started</button>
        </div>
      </header>

      <section className="products">
        <h2>Our Products</h2>
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-details">
                <h3>{product.name}</h3>
                <p><strong>SKU:</strong> {product.sku}</p>
                <p><strong>Price:</strong> ${product.price}</p>
                <p><strong>Stock:</strong> {product.stock}</p>
                <p><strong>Supplier:</strong> {product.supplier}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <button className="order-button" onClick={() => handlePlaceOrder(product)}>Place Order</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
