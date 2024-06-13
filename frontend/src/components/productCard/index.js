import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const ProductCard = ({ product }) => {

  return (
    <Link style={{textDecoration : "none" , color: "black"}} to={`/product/${product._id}`}>
    <div className="product-card">
      <img src="https://via.placeholder.com/150" alt={product.name} />
      <p className='product-name'>{product.name}</p>
      {/* <p>{product.description}</p> */}
      <p className='product-price'>${product.price.toFixed(2)}</p>
      {/* <Link to={`/product/${product._id}`} className="btn">View Product</Link> */}
    </div>
    </Link>
  );
};

export default ProductCard;
