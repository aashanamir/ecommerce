import React, {useState } from "react";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
import Sidebar from "../../../components/admin/sidebar";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import { Link } from "react-router-dom";
import { BASEURL } from "../../../API/BaseUrl";
import { deleteProductByAdmin } from "../../../Slice/adminSlice";

const Index = () => {
  const dispatch = useDispatch();
  const { productStatus, data } = useSelector((state) => state.Products);
  const products = data.products;
  const [toggle, setToggle] = useState(false);
  const [editUserId , setEditUserId] = useState(null);
  
  const deleteUserHandler = (id)=>{
    dispatch(deleteProductByAdmin(id))
  }
  const editUserHandler = () => {

  }

  const toggleHandler = () => {

  }
  return (
    <>
      {productStatus === "loading" ? (
        <Loading />
      ) : (
        <div className="admin-layout">
          <div className="admin-container">
            <Sidebar />
            <main className="admin-content">
              <div className="cards">
                <div className="card">
                  <h2>Number of Products</h2>
                  <p>{products?.length}</p>
                </div>
                <Link style={{textDecoration : "none" , background : "#ff6600", color : "white"}} className="card" to={"/admin/product/add"}>Add New Product</Link>
              </div>
              <table className="user-list-table">
                <thead>
                  <tr>
                    <th>Sr</th>
                    <th>Profile Image</th>
                    <th>Product Name</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Created By</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((product, index) => (
                    <tr key={product._id}>
                      <td>{index + 1}</td>
                      <td><img style={{width : "60px" , height : "60px" }} src={`${BASEURL}images/products/${product?.images[0]?.public_id}`} alt={product.name} /></td>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>{product.category}</td>
                      <td>{product.price}</td>
                      <td>{product.createdAt}</td>
                      <td className="actions">
                        <Link to={"/admin/product/info/"+product._id} className="action-button preview">
                          <FaEye /> Preview
                        </Link>
                        <Link to={"/admin/product/edit/" + product._id}
                          
                          className="action-button edit"
                        >
                          <FaEdit /> Edit
                        </Link>
                        {
                          toggle && editUserId === product._id && 
                          <ul>
                            <li onClick={()=>editUserHandler("user" , product._id)} >User</li>
                            <li onClick={()=>editUserHandler("admin" , product._id)}  >Admin</li>
                          </ul>                         
                        }
                        <button
                          onClick={() => deleteUserHandler(product._id)}
                          className="action-button delete"
                        >
                          <FaTrash /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
