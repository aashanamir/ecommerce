import React from 'react';
import './style.css';
import { FaMobileAlt } from 'react-icons/fa';

const index = () => {
  return (
    <div className="not-mobile-access-container">
      <FaMobileAlt className="not-mobile-access-icon" />
      <h1>Admin Panel Not Accessible on Mobile</h1>
      <p>Please access the admin panel from a desktop or laptop.</p>
    </div>
  );
};

export default index;
