import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { BASEURL } from '../../API/BaseUrl';

const ProductCard = ({ product }) => {
  return (
    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/product/${product._id}`}>
      <div className="product-card">
        <img src={BASEURL + "images/products/" + product.images[0].public_id} alt={product.name} />
        <p className="product-name">{product.name}</p>
        <p>{product.description}</p>
        <p className="product-price">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
