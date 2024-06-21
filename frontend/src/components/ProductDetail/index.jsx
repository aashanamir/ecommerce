import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetail } from '../../Slice/ProductSlice';
import Loading from "../Loading";
import { BASEURL } from '../../API/BaseUrl';
import { add, updateQuantity } from '../../Slice/cartSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productDetail, productStatus } = useSelector(state => state.Products);
  const {userInfo} = useSelector(state => state.user)
  const { items } = useSelector(state => state.cart);
  const { product } = productDetail;
  const [imgPreview, setImgPreview] = useState();
  const [quantity , setQuantity] = useState(1);

  const productImages = product?.images || [];

  useEffect(() => {
    dispatch(fetchProductDetail(id));
  }, [id, dispatch]);

  const imageHandler = (image) => {
    setImgPreview(BASEURL + "/images/products/" + image);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  }

  const addToCartHandler = () => {
    
    if(!userInfo){
      alert("Please Login First");
      return;
    }
    const existingItem = items.find(item => item._id === product._id);

    if (existingItem) {
      dispatch(updateQuantity({ id: product._id, quantity: existingItem.quantity + quantity }));
    } else {
      dispatch(add({ ...product, quantity }));
    }
  };

  return productStatus === "loading" ? (
    <Loading />
  ) : (
    <div className="product-details"> 
      <div className='product-container'>
        <div className='product-image-container'>
          {
            imgPreview === undefined || null ? (
              <img src={BASEURL + "images/products/" + product?.images[0]?.public_id} alt="product" />
            ) : (
              <img src={imgPreview} alt="product preview" />
            )
          }
          <div className='images-holder'>
            {
              productImages && productImages.map((image, index) => (
                <img key={index} onClick={() => imageHandler(image.public_id)} src={BASEURL + "images/products/" + image.public_id} alt={image.public_id} />
              ))
            }
          </div>
        </div>
        <div className="product-info">
          <h1>{product?.name || ""}</h1>
          <p>Rs: <span className='price'>{product?.price.toFixed(2) || ""}</span></p>
          <p>{product?.description || ""}</p>
          <div className="quantity-controls">
            <button onClick={decreaseQuantity} className="quantity-btn">-</button>
            <span>{quantity}</span>
            <button onClick={increaseQuantity} className="quantity-btn">+</button>
          </div>
          <button onClick={addToCartHandler} className="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
