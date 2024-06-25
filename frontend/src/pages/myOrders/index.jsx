import React, { useEffect, useState } from 'react';
import "./style.css"
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loading';

const AllOrdersPage = () => {
  const {orderData , orderStatus} = useSelector(state => state.order);

  console.log(orderData , orderStatus);

  if(orderStatus === "loading"){
    return(
      <Loading />
    )
  }

  return (
    <div className="all-orders-page">
      <h1>All Orders</h1>
      <div className="order-list">
        {orderData?.orders?.map(order => (
          <Link to={"/order/"+order._id} className="order-item">
          <h3><strong>Order ID:</strong> {order._id}</h3>
          <p><strong>Total Price:</strong> Rs {order?.totalPrice}</p>
          <p><strong>Order Status:</strong> {order?.orderStatus}</p>
          <p><strong>Order Date:</strong> {new Date(order?.createdAt).toLocaleDateString()}</p>
        </Link>
        ))}
      </div>
    </div>
  );
};

export default AllOrdersPage;
