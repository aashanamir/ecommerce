import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetail } from '../../../Slice/ProductSlice';
import Loading from "../../../components/Loading"
import { BASEURL } from '../../../API/BaseUrl';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productDetail, productStatus } = useSelector(state => state.Products);
  const {product} = productDetail;
  const [imgPreview , setImgPreview] = useState();
  
  const productImages = product?.images || [];

  useEffect(() => {
    dispatch(fetchProductDetail(id));
  }, [id , dispatch])

  const imageHandler = (image) => {
    setImgPreview(BASEURL + "/images/products/"  + image)
  }


  return productStatus === "loading" ? (<Loading />) : (

    <div className="product-details"> 
        <div className='product-container'>
          <div className='product-image-container'>
          {
            imgPreview === undefined || null ? (<img src={BASEURL + "images/products/" + product?.images[0]?.public_id} />) : (<img src={imgPreview} />)
          }
          <div className='images-holder'>
            {
              productImages && productImages.map((image , index) => (
                <img key={index} onClick={()=>imageHandler(image.public_id)} src={BASEURL + "images/products/" + image.public_id} alt={image.public_id} />
              ))
            }
          </div>
          </div>
          <div className="product-info">
            <h1>{product?.name || ""}</h1>
            <p >Rs : <span className='price'>{ product?.price.toFixed(2) || ""}</span></p>
            <p>{product?.description || ""}</p>
          </div>
        </div>
    </div>
  );
}

export default ProductDetails;
