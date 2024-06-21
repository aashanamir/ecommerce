import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import ProductSlice from './Slice/ProductSlice';
import UserSlice from './Slice/UserSlice';
import { Provider } from 'react-redux';
import adminSlice from './Slice/adminSlice';
import cartSlice from './Slice/cartSlice';

const store = configureStore({
  reducer:{
    Products : ProductSlice,
    user : UserSlice,
    admin : adminSlice,
    cart : cartSlice,
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>
);
