import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../Slice/ProductSlice";
import ProductCard from "../../components/productCard";
import { Pagination } from "@mui/material";
import Loading from "../../components/Loading";
import { Helmet } from "react-helmet";
import { BASEURL } from "../../API/BaseUrl";

const AllProductsPage = () => {
  const dispatch = useDispatch();
  const { data, productStatus } = useSelector((state) => state.Products);

  const { productPerpage, productsCount, products } = data;

  console.log(products);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentCategory, setCurrentCategory] = useState("");
  const { categories, status } = useSelector((state) => state.category);

  const categoryHandler = (name, category = "") => {
    setCurrentCategory(category);
  };

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
    console.log(value);
  };

  useEffect(() => {
    dispatch(fetchProducts(currentPage, currentCategory));
  }, [dispatch, currentPage, currentCategory]);

  console.log(categories, status);

  // const categoreis = [
  //   {
  //     src: 'https://cdn-icons-png.flaticon.com/128/10951/10951869.png',
  //     alt: 'Slide 1',
  //     name : "All Products",
  //     path : ""
  //   },

  //   {
  //     src: 'https://cdn-icons-png.flaticon.com/128/11078/11078771.png',
  //     alt: 'Slide 1',
  //     name : "Mobiles",
  //     path : "Mobile"
  //   },
  //   {
  //     src: 'https://cdn-icons-png.flaticon.com/128/123/123400.png',
  //     alt: 'Slide 1',
  //     name : "Laptops",
  //     path : "/"
  //   },
  //   {
  //     src: 'https://cdn-icons-png.flaticon.com/128/8863/8863863.png',
  //     alt: 'Slide 1',
  //     name : "Fashion",
  //     path : "/"
  //   },
  //   {
  //     src: 'https://cdn-icons-png.flaticon.com/128/2681/2681760.png',
  //     alt: 'Slide 1',
  //     name : "Man",
  //     path : "man"
  //   },
  //   {
  //     src: 'https://cdn-icons-png.flaticon.com/128/2763/2763444.png',
  //     alt: 'Slide 1',
  //     name : "Woman",
  //     path : "woman"
  //   },

  // ];

  /******************
   * JSX Starts
   * Overhere
   * **************
   * *************
   ******************/

  if (data?.products?.length < 1) {
    return productStatus === "loading" ? (
      <Loading />
    ) : (
      <div style={{ marginTop: 20 }}>
        <Helmet>
          <title>All Products | Echo Store</title>
          <meta
            name="description"
            content="Welcome to E-Shop, your one-stop shop for all things great."
          />
        </Helmet>

        <div className="category-card-container">
          <div onClick={() => categoryHandler()} className="category-card">
            <img
              src={BASEURL + "images/categories/" + "delivery-box.png"}
              alt={"All Products"}
            />
            <span>{"All Products"}</span>
          </div>
          {categories?.category?.map((category) => (
            <div
              key={category.name}
              onClick={() => categoryHandler(category.name, category.path)}
              className="category-card"
            >
              <img
                src={
                  BASEURL + "images/categories/" + category?.image?.public_id
                }
                alt={category?.alt}
              />
              <span>{category?.name}</span>
            </div>
          ))}
        </div>

        <div className="all-products-page">
          <div className="product-grid">Product Not Found</div>
        </div>
      </div>
    );
  }

  return productStatus === "loading" ? (
    <Loading />
  ) : (
    <div style={{ marginTop: 20 }}>
      <Helmet>
        <title>All Products | Echo Store</title>
        <meta
          name="description"
          content="Welcome to E-Shop, your one-stop shop for all things great."
        />
      </Helmet>
      {/* <Category /> */}
      <div className="category-card-container">
        <div onClick={() => categoryHandler()} className="category-card">
          <img
            src={BASEURL + "images/categories/" + "delivery-box.png"}
            alt={"All Products"}
          />

          <span>{"All Products"}</span>
        </div>
        {categories?.category?.map((category) => (
          <div
            key={category.name}
            onClick={() => categoryHandler(category.name, category.path)}
            className="category-card"
          >
            <img
              src={BASEURL + "images/categories/" + category?.image?.public_id}
              alt={category?.alt}
            />
            <span>{category?.name || "Category Name"}</span>
          </div>
        ))}
      </div>

      <div className="all-products-page">
        <div className="product-grid">
          {data.products?.map((product) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>

        <div className="paginationBox">
          <Pagination
            count={Math.ceil(productsCount / productPerpage)} // 7 / 7 = 1 ; 3 / 7 = 2
            page={currentPage}
            onChange={handlePageChange}
            size="large"
            showFirstButton
            showLastButton
          />
        </div>
      </div>
    </div>
  );
};

export default AllProductsPage;
