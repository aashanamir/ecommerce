import React, {useEffect, useState } from "react";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
import Sidebar from "../../../components/admin/sidebar";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import { Link } from "react-router-dom";
import { BASEURL } from "../../../API/BaseUrl";
import { deleteProductByAdmin } from "../../../Slice/adminSlice";
import { deleteCategory, fetchCategory } from "../../../Slice/categorySlice";

const Index = () => {
  const dispatch = useDispatch();
  const { status , categories } = useSelector((state) => state.category);

  const deleteHandler = (id) => {
    dispatch(deleteCategory(id));
  }

  useEffect(()=>{
    dispatch(fetchCategory());
  },[dispatch]);

  return (
    <>
      {status === "loading" ? (
        <Loading />
      ) : (
        <div className="admin-layout">
          <div className="admin-container">
            <Sidebar />
            <main className="admin-content">
              <div className="cards">
                <div className="card">
                  <h2>Number of Categories</h2>
                  <p>{categories?.category?.length}</p>
                </div>
                <Link style={{textDecoration : "none" , background : "#ff6600", color : "white"}} className="card" to={"/admin/category/add"}>Add New Category</Link>
              </div>
              <table className="user-list-table">
                <thead>
                  <tr>
                    <th>Sr</th>
                    <th>Category Image</th>
                    <th>Category Name</th>
                    <th>Delete Category</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.category?.map((product, index) => (
                    <tr key={product._id}>
                      <td>{index + 1}</td>
                      <td><img style={{width : "60px" , height : "60px" }} src={`${BASEURL}images/categories/${product?.image?.public_id}`} alt={product.name} /></td>
                      <td>{product.name}</td>
                      <td><FaTrash onClick={()=>deleteHandler(product._id)} /></td>
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
