import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetail } from '../../Slice/ProductSlice';
import Loading from "../../components/Loading"

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, productStatus } = useSelector(state => state.Products);
  const product = data.message;

  useEffect(() => {
    dispatch(fetchProductDetail(id));
  }, [id])


  return (

    <div className="product-details">
      {
        productStatus == "loading" ? (<Loading></Loading>) : (<>
          <img src={"https://via.placeholder.com/150"} alt={"hy"} />
          <div className="product-info">
            <h1>{product?.name || ""}</h1>
            <p>{product?.description || ""}</p>
            <p>{product?.price.toFixed(2) || ""}</p>
          </div>
        </>)
      }
      {/* {product && (
        <>
          <img src={"https://via.placeholder.com/150"} alt={"hy"} />
          <div className="product-info">
            <h1>{product.name|| ""}</h1>
            <p>{product.description|| ""}</p>
            <p>{product.price.toFixed(2)|| ""}</p>
          </div>
        </>
      )}  */}
    </div>
  );
};

export default ProductDetails;
