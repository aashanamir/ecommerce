import React from 'react';
import './style.css';
import { FaSpinner } from 'react-icons/fa';

const Loading = () => {
  return (
    <div className="loading-container">
      <FaSpinner className="loading-spinner" />
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
