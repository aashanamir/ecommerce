import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProduct, updateProductDetails } from '../../../Slice/adminSlice';
import {useParams} from "react-router-dom"
import { fetchProductDetail } from '../../../Slice/ProductSlice';

const AddProduct = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const {adminStatus , adminData , updateProduct} = useSelector(state => state.admin);

  useEffect(()=>{
    dispatch(updateProductDetails(id));

  },[dispatch , id])

  console.log(adminStatus , updateProduct);
  

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('price', price);
    formData.append('description', description);
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    for(var pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    dispatch(updateProductDetails(id , formData));
  };


  const changeHandler = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    const filePreviews = selectedFiles.map(file => URL.createObjectURL(file));
    setImagePreviews(filePreviews);
  };

  return (
    <div className="add-product-page">
      <div className="form-container">
        <h2>Edit The Product</h2>
        <form onSubmit={submitHandler} className="add-product-form">
          <div className="form-group">
            <label htmlFor="name">Product Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="images">Product Images:</label>
            <input
              type="file"
              id="images"
              multiple
              accept="image/*"
              onChange={changeHandler}
            />
          </div>
          <div className='images-holder'>
          {
              imagePreviews.map((src, index) => (
                <img key={index} src={src} alt={`Preview ${index}`} />
              ))
          }
           </div>   
          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
