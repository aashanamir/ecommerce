import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { BASEURL } from "../../API/BaseUrl";
import { createOrder } from "../../Slice/orderSlice";

const CheckoutPage = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Static Data
  const shippingPrice = 60;
  const taxPrice = 20;
  const [totalPrice, setTotalPrice] = useState(0);
  const [itemsPrice, setItemsPrice] = useState(0);
  // End Static Data

  useEffect(() => {
    const calculatedItemsPrice = items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    setItemsPrice(calculatedItemsPrice);
    setTotalPrice(calculatedItemsPrice + shippingPrice + taxPrice);
  }, [items, shippingPrice, taxPrice]);

  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    phoneNo: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const handleShippingChange = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        shippingDetails,
        paymentDetails,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        items,
      })
    );

    setShippingDetails({
      name: "",
      phoneNo: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
    });

    setPaymentDetails({
      cardNumber: "",
      expirationDate: "",
      cvv: "",
    });
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="checkout-container">
        <div className="checkout-form">
          <h2>Shipping Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={shippingDetails.name}
                onChange={handleShippingChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Mobile</label>
              <input
                type="text"
                name="phoneNo"
                value={shippingDetails.phoneNo}
                onChange={handleShippingChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={shippingDetails.address}
                onChange={handleShippingChange}
                required
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={shippingDetails.city}
                onChange={handleShippingChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={shippingDetails.postalCode}
                onChange={handleShippingChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={shippingDetails.country}
                onChange={handleShippingChange}
                required
              />
            </div>

            <h2>Payment Details</h2>
            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handlePaymentChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Expiration Date</label>
              <input
                type="text"
                name="expirationDate"
                value={paymentDetails.expirationDate}
                onChange={handlePaymentChange}
                required
              />
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input
                type="text"
                name="cvv"
                value={paymentDetails.cvv}
                onChange={handlePaymentChange}
                required
              />
            </div>
            <button type="submit" className="checkout-button">
              Place Order
            </button>
          </form>
        </div>
        <div className="checkout-summary">
          <h2>Order Summary</h2>
          {items.map((item) => (
            <div key={item._id} className="checkout-item">
              <img
                src={BASEURL + "images/products/" + item.images[0].public_id}
                alt={item.name}
              />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: Rs {item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
          <div className="total">
            <p>
              Total Items: {items.reduce((acc, item) => acc + item.quantity, 0)}
            </p>
            <p>Items Price: Rs {itemsPrice.toFixed(2)}</p>
            <p>Shipping Price: Rs {shippingPrice}</p>
            <p>Tax: Rs {taxPrice}</p>
            <p>Total Price: Rs {totalPrice.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
