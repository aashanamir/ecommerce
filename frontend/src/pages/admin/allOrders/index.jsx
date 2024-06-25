import React, {useEffect, useState } from "react";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
import Sidebar from "../../../components/admin/sidebar";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import { Link } from "react-router-dom";
import { BASEURL } from "../../../API/BaseUrl";
import { EditOrderStatusByAdmin, deleteOrderByAdmin, deleteProductByAdmin, getAllOrdersByAdmin } from "../../../Slice/adminSlice";

const Index = () => {
  const dispatch = useDispatch();
  const { productStatus, data } = useSelector((state) => state.Products);
  const {adminStatus , adminOrders} = useSelector(state => state.admin);
  const products = data.products;
  const [toggle, setToggle] = useState(false);
  const [editUserId , setEditUserId] = useState(null);
  
  useEffect(()=>{
    dispatch(getAllOrdersByAdmin());
  },[dispatch])

  const deleteUserHandler = (id)=>{
    dispatch(deleteOrderByAdmin(id))
  }
  const editDeliveryStatusHandler = (status , id) => {
    dispatch(EditOrderStatusByAdmin(status , id));
    setToggle(!toggle);
  }

  const toggleHandler = (id) => {
    setToggle(!toggle);
    setEditUserId(id);
  }
  return (
    <>
      {adminStatus === "loading" ? (
        <Loading />
      ) : (
        <div className="admin-layout">
          <div className="admin-container">
            <Sidebar />
            <main className="admin-content">
              <div className="cards">
                <div className="card">
                  <h2>Number of Orders</h2>
                  <p>{adminOrders?.order?.length}</p>
                </div>
                <Link style={{textDecoration : "none" , background : "#ff6600", color : "white"}} className="card" to={"/admin/product/add"}>Add New Product</Link>
              </div>
              <table className="user-list-table">
                <thead>
                  <tr>
                    <th>Order Id</th>
                    <th>Total Price</th>
                    <th>Order Status</th>
                    <th>Order Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {adminOrders?.orders?.map((order, index) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.totalPrice}</td>
                      <td>{order.orderStatus}</td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="actions">
                        <Link to={"/admin/product/info/"+order._id} className="action-button preview">
                          <FaEye /> Preview
                        </Link>
                        <button
                          onClick={()=>toggleHandler(order._id)}
                          className="action-button edit"
                        >
                          <FaEdit /> Edit
                        </button>
                        {
                          toggle && editUserId === order._id && 
                          <ul className="edit-user-menu">
                            <li onClick={()=>editDeliveryStatusHandler("Processing" , order._id)} >Processing</li>
                            <li onClick={()=>editDeliveryStatusHandler("Shipped" , order._id)}  >Shipped</li>
                            <li onClick={()=>editDeliveryStatusHandler("Delivered" , order._id)}  >Delivered</li>
                          </ul>                         
                        }
                        <button
                          onClick={() => deleteUserHandler(order._id)}
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
