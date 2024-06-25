import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewProduct } from "../../../Slice/adminSlice";
import "./style.css";

const AddProduct = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const { categories, status } = useSelector((state) => state.category);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("description", description);
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    dispatch(addNewProduct(formData));
    setName("");
    setCategory("");
    setPrice("");
    setDescription("");
    setFiles([]);
    setImagePreviews([]);
  };

  const changeHandler = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    const filePreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews(filePreviews);
  };

  return (
    <div className="add-product-page">
      <div className="form-container">
        <h2>Add New Product</h2>
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
            <select
              id="category"
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Option</option>
              {categories?.category?.map((cat) => (
                <option key={cat.path} value={cat.path}>
                  {cat.name}
                </option>
              ))}
            </select>
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
          <div className="images-holder">
            {imagePreviews.map((src, index) => (
              <img key={index} src={src} alt={`Preview ${index}`} />
            ))}
          </div>
          <button type="submit">Add Product</button>
        </form>
      </div>

      <div className="preview-container">
        <h2>Product Preview</h2>
        <div className="product-container">
          <div className="product-image-container">
            {<img src={imagePreviews[0]?.src} alt={imagePreviews[0]?.src} />}
            <div className="images-holder">
              {imagePreviews.map((src, index) => (
                <img key={index} src={src} alt={`Preview ${index}`} />
              ))}
            </div>
          </div>
          <div className="product-info">
            <h1>{name || ""}</h1>
            {price && (
              <p>
                Rs : <span className="price">{price}</span>
              </p>
            )}
            <p>{description || ""}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
