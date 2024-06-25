import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { BASEURL } from '../../API/BaseUrl';
import './style.css';

const OrderDetailPage = () => {
  const { id } = useParams();
  const { orderData } = useSelector(state => state.order);
  const order = orderData?.orders?.find(order => order._id === id);

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="order-detail-page">
      <h1>Order Details</h1>
      <div className="order-detail-container">
        <div className="order-info">
          <div className="order-summary">
            <h2>Order ID: {order._id}</h2>
            <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {order.orderStatus}</p>
            <p><strong>Total Price:</strong> Rs {order.totalPrice}</p>
          </div>
          <div className="shipping-info">
            <h2>Shipping Information</h2>
            <p><strong>Name:</strong> {order.shippingInfo.name}</p>
            <p><strong>Phone:</strong> {order.shippingInfo.phoneNo}</p>
            <p><strong>Address:</strong> {order.shippingInfo.address}, {order.shippingInfo.city}, {order.shippingInfo.postalCode}, {order.shippingInfo.country}</p>
          </div>
        </div>
        <div className="order-items">
          <h2>Items</h2>
          {order.orderItems.map(item => (
            <div key={item._id} className="order-item">
              <img src={`${BASEURL}images/products/${item.image}`} alt={item.name} />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p><strong>Price:</strong> Rs {item.price.toFixed(2)}</p>
                <p><strong>Quantity:</strong> {item.quantity}</p>
                <p><strong>Total:</strong> Rs {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
