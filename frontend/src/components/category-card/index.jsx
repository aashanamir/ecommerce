import React from 'react'
import "./style.css";
import { Link, useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import { fetchProducts } from '../../Slice/ProductSlice';
const Index = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categoryHandler = (name , category) => {
    console.log(name);
    navigate("/products");
    dispatch(fetchProducts(category));


  }

  const categoreis = [
    {
      src: 'https://cdn-icons-png.flaticon.com/128/10951/10951869.png',
      alt: 'Slide 1',
      name : "All Products",
      path : ""
    },

    {
      src: 'https://cdn-icons-png.flaticon.com/128/11078/11078771.png',
      alt: 'Slide 1',
      name : "Mobiles",
      path : "Mobile"
    },
    {
      src: 'https://cdn-icons-png.flaticon.com/128/123/123400.png',
      alt: 'Slide 1',
      name : "Laptops",
      path : "/"
    },
    {
      src: 'https://cdn-icons-png.flaticon.com/128/8863/8863863.png',
      alt: 'Slide 1',
      name : "Fashion",
      path : "/"
    },
    {
      src: 'https://cdn-icons-png.flaticon.com/128/2681/2681760.png',
      alt: 'Slide 1',
      name : "Man",
      path : "man"
    },
    {
      src: 'https://cdn-icons-png.flaticon.com/128/2763/2763444.png',
      alt: 'Slide 1',
      name : "Woman",
      path : "woman"
    },
    
  ];
  return (
    <div className='category-card-container'>
      {
        categoreis.map((category)=>(<div key={category.name} onClick={()=>categoryHandler(category.name , category.path)} className="category-card">
          <img src={category?.src } alt={category?.alt} />
          <span>{ category?.name || "Category Name"}</span>
          </div>))
      }
    </div>
  )
}

export default Index