import React, {useEffect} from "react";
import "./style.css";
import ProductCard from "../../components/productCard";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts} from "../../Slice/ProductSlice";
import Loading from "../../components/Loading";
import Carousel from "../../components/carusel";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const HomePage = () => {
  
  const dispatch = useDispatch();
  const {productStatus, data} = useSelector((state) => state.Products);
  const products = data.products || [];

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  
  return productStatus === "loading" ? (
    <Loading />
  ) : (

    <div className="home-page">

      <Helmet>
      <title>Echo Shop - Home</title>
        <meta name="description" content="Welcome to E-Shop, your one-stop shop for all things great." />
      </Helmet>


      <Carousel />

      <section className="product-section">
        <h2>Latest Products</h2>
        <div className="product-grid">
          {products.map((product , index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>

       <div className="btn-container">
        <Link className="all-products-btn" to={"/products"}>All Products</Link>
          
        </div>   
      </section>
    </div>
   
  );
};

export default HomePage;
