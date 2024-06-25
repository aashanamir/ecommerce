import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCategory } from '../../../Slice/categorySlice';


const AddProduct = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState();
  const [imagePreviews, setImagePreviews] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('file', file);

    dispatch(createCategory(formData));
    
    setName("");
    setCategory("");
    setFile("");
    setImagePreviews("");
  };

  const changeHandler = (e) => {
    const selectedFiles = e.target.files[0];
    setFile(selectedFiles);

    
    setImagePreviews(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="add-product-page">
      <div className="form-container">
        <h2>Add New Category</h2>
        <form onSubmit={submitHandler} className="add-product-form">
          <div className="form-group">
            <label htmlFor="name">Category Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category Path:</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="images">Product Images:</label>
            <input
              className='upload-btn'
              type="file"
              id="images"
              accept="image/*"
              onChange={changeHandler}
            />
            <span style={{marginTop : "10px"}}>Image Recommeded size is 512px</span>
          </div>
          <div className='images-holder'>
          
                <img src={imagePreviews !== "" ? imagePreviews : "https://via.placeholder.com/150"} alt={`Preview`} />
 
           </div>   
          <button type="submit">Add Category</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
