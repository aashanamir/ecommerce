import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import ProductSlice from './Slice/ProductSlice';
import UserSlice from './Slice/UserSlice';
import { Provider } from 'react-redux';

const store = configureStore({
  reducer:{
    Products : ProductSlice,
    user : UserSlice,
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  {/* <React.StrictMode> */}
    <App />
  {/* </React.StrictMode> */}
  </Provider>
);
