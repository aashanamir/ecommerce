// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2 className="footer-title">E-Shop</h2>
          <p className="footer-text">
            E-Shop is your one-stop shop for all things great. We offer a wide range of products to meet all your needs.
          </p>
          <div className="socials">
            <a href="https://facebook.com" className="social-link">Facebook</a>
            <a href="https://twitter.com" className="social-link">Twitter</a>
            <a href="https://instagram.com" className="social-link">Instagram</a>
          </div>
        </div>
        <div className="footer-section links">
          <h2 className="footer-title">Quick Links</h2>
          <ul className="footer-list">
            <li className="footer-item"><Link to="/" className="footer-link">Home</Link></li>
            <li className="footer-item"><Link to="/products" className="footer-link">Products</Link></li>
            <li className="footer-item"><Link to="/about" className="footer-link">About</Link></li>
            <li className="footer-item"><Link to="/contact" className="footer-link">Contact</Link></li>
            <li className="footer-item"><Link to="/cart" className="footer-link">Cart</Link></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h2 className="footer-title">Contact Us</h2>
          <p className="footer-text">123 E-Shop St, Commerce City, CO 12345</p>
          <p className="footer-text">Email: support@eshop.com</p>
          <p className="footer-text">Phone: +1 123 456 7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} E-Shop. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
