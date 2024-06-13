import React from 'react';
import './style.css';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const index = () => {
  return (
    <div className="notfound-container">
      <FaExclamationTriangle className="notfound-icon" />
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="notfound-link">Go Back Home</Link>
    </div>
  );
};

export default index;
