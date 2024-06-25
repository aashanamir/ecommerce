import React from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { BASEURL } from '../../API/BaseUrl';
import { remove, updateQuantity } from "../../Slice/cartSlice";
import { Link } from 'react-router-dom';

const Index = () => {
  const { items } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    dispatch(remove(id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const increaseQuantity = (id, currentQuantity) => {
    handleQuantityChange(id, currentQuantity + 1);
  };

  const decreaseQuantity = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      handleQuantityChange(id, currentQuantity - 1);
    }
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      <div className="cart-items">
        {items.map(item => (
          <div key={item._id} className="cart-item">
            <div className="img">
            <img src={BASEURL + "images/products/" + item.images[0].public_id} alt={item.name} />
            </div>
            <div className="item-details">
              <h2>{item.name}</h2>
              <p>Price: Rs {item.price.toFixed(2)}</p>
              <div className="quantity-controls">
                <button
                  onClick={() => decreaseQuantity(item._id, item.quantity)}
                >-</button>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  readOnly
                />
                <button
                  onClick={() => increaseQuantity(item._id, item.quantity)}
                >+</button>
              </div>
              <button className="remove-button" onClick={() => handleRemoveItem(item._id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Cart Summary</h2>
        <p>Total Items: {items.reduce((acc, item) => acc + item.quantity, 0)}</p>
        <p>Total Price: Rs {items.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</p>
        <Link to={"/checkout"} className="checkout-button">Proceed to Checkout</Link>
      </div>
    </div>
  );
};

export default Index;
