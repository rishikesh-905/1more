import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';
import '../styles/Footer.css'; // Ensure you have the correct path for the CSS

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-column">
          <h3>About Us</h3>
          <p>
            We are a leading provider of inventory management solutions, dedicated to helping businesses optimize their operations and streamline their supply chain.
          </p>
          <Link to="/contact" className="footer-link">Contact Us</Link>
        </div>
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/inventory-tracking" className="footer-link">Inventory Tracking</Link></li>
            <li><Link to="/product-info-management" className="footer-link">Product Info Management</Link></li>
            <li><Link to="/order-management" className="footer-link">Order Management</Link></li>
            <li><Link to="/stock-movement" className="footer-link">Stock Movement</Link></li>
            <li><Link to="/reorder-management" className="footer-link">Reorder Management</Link></li>
            <li><Link to="/reporting-analytics" className="footer-link">Reporting & Analytics</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Subscribe</h3>
          <p>Stay updated with our latest news and offers. Subscribe to our newsletter.</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" className="newsletter-input" />
            <button type="submit" className="newsletter-button">Subscribe</button>
          </form>
        </div>
        <div className="footer-column">
          <h3>Follow Us</h3>
          <div className="social-media">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon"><Facebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon"><Twitter /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon"><LinkedIn /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon"><Instagram /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Inventory Management System. All rights reserved.</p>
        <p>Designed by Your Company</p>
      </div>
    </footer>
  );
};

export default Footer;
