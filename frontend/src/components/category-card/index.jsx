import React from 'react'
import "./style.css";
import { Link } from 'react-router-dom';

const index = ({category}) => {

  const categoreis = [
    {
      src: 'https://cdn-icons-png.flaticon.com/128/10951/10951869.png',
      alt: 'Slide 1',
      name : "All Products",
      path : "/products"
    },
    {
      src: 'https://cdn-icons-png.flaticon.com/128/11078/11078771.png',
      alt: 'Slide 1',
      name : "Mobiles",
      path : "/"
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
      path : "/"
    },
    {
      src: 'https://cdn-icons-png.flaticon.com/128/2763/2763444.png',
      alt: 'Slide 1',
      name : "Woman",
      path : "/"
    },
    
  ];
  return (
    <div className='category-card-container'>
      {
        categoreis.map((category)=>(<Link to={category?.path || "/"} className="category-card">
          <img src={category?.src } alt={category?.alt} />
          <span>{ category?.name || "Category Name"}</span>
          </Link>))
      }
    </div>
  )
}

export default index