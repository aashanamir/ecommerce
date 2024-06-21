import React, { useEffect, useState } from 'react';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../Slice/ProductSlice';
import ProductCard from '../../components/productCard';
import Category from '../../components/category-card';
import Loading from '../../components/Loading';
import { Helmet } from "react-helmet";
import Pagination from '../../components/pagination/Index';

const AllProductsPage = () => {
  const dispatch = useDispatch();
  const { data, productStatus , productPerpage , productsCount} = useSelector((state) => state.Products);
  const [currentPage, setCurrentPage] = useState(1);
 
  useEffect(() => {
    dispatch(fetchProducts(currentPage));
  }, [dispatch , currentPage]);


  if(data?.products?.length < 1) {
    return productStatus === "loading" ? (<Loading/>) : (
      <div style={{marginTop : 20}}>
        <Helmet>
          <title>All Products | Echo Store</title>
            <meta name="description" content="Welcome to E-Shop, your one-stop shop for all things great." />
          </Helmet>
        <Category/>
        <div className="all-products-page">
          <div className="product-grid">
            Product Not Found
          </div>
          
        </div>
        </div>
      );
  }


  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  }


  return productStatus === "loading" ? (<Loading/>) : (
  <div style={{marginTop : 20}}>
    <Helmet>
      <title>All Products | Echo Store</title>
        <meta name="description" content="Welcome to E-Shop, your one-stop shop for all things great." />
      </Helmet>
    <Category/>
    <div className="all-products-page">
      <div className="product-grid">
        
        {data.products?.map((product) => (
          <ProductCard key={product?.id} product={product} />
        ))}
      </div>
        
      <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={productPerpage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
      </div>
    </div>
    </div>
  );
};

export default AllProductsPage;
