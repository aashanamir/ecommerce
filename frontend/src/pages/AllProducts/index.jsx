import React, { useEffect } from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../Slice/ProductSlice';
import ProductCard from '../../components/productCard';
import Category from '../../components/category-card';
import Loading from '../../components/Loading';
import { Helmet } from "react-helmet";

const AllProductsPage = () => {
  const dispatch = useDispatch();
  const { data, productStatus } = useSelector((state) => state.Products);
  const products = data.products;
  console.log(products , productStatus);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
  <div style={{marginTop : 20}}>
    <Helmet>
      <title>{products[0].name} | Echo Store</title>
        <meta name="description" content="Welcome to E-Shop, your one-stop shop for all things great." />
      </Helmet>
    <Category/>
    <div className="all-products-page">
      {productStatus === 'loading' ? (<Loading/>) : (<div className="product-grid">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>)} 
      
    </div>
    </div>
  );
};

export default AllProductsPage;
