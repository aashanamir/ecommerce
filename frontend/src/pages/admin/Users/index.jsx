import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";
import Sidebar from "../../../components/admin/sidebar";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserByAdmin, getAllUsersByAdmin, updateUserRole } from "../../../Slice/adminSlice";
import Loading from "../../../components/Loading";
import { Link } from "react-router-dom";
import { BASEURL } from "../../../API/BaseUrl";

const Index = () => {
  const dispatch = useDispatch();
  const { adminData, adminStatus } = useSelector((state) => state.admin);
  const users = adminData.users;
  const [toggle, setToggle] = useState(false);
  const [editUserId , setEditUserId] = useState(null);

  useEffect(() => {
    dispatch(getAllUsersByAdmin());
    }, [dispatch ]);


  const toggleHandler = (id) => {
    setToggle(!toggle);
    setEditUserId(id);
  }

  
  const editUserHandler = (role, id) => {
    toggleHandler();
    dispatch(updateUserRole(id, role));
    dispatch(getAllUsersByAdmin());
  };



  const deleteUserHandler = (id) => {
    dispatch(deleteUserByAdmin(id));
  };

  return adminStatus === "loading" ? (
    <Loading />
  ) : (
     (
        <div className="admin-layout">
          <div className="admin-container">
            <Sidebar />
            <main className="admin-content">
              <div className="cards">
                <div className="card">
                  <h2>Total Users</h2>
                  <p>{users?.length}</p>
                </div>
              </div>
              <table className="user-list-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Profile Picture</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td><img style={{width : "60px" , height : "60px" }} src={`${BASEURL}images/users/${user.avatar.public_id}`} alt={user.name} /></td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td className="actions">
                        <Link to={"/admin/user/info/"+user._id} className="action-button preview">
                          <FaEye /> Preview
                        </Link>
                        <button
                          onClick={()=>toggleHandler(user._id)}
                          className="action-button edit"
                        >
                          <FaEdit /> Edit
                        </button>
                        {
                          toggle && editUserId === user._id && 
                          <ul className="edit-user-menu">
                            <li onClick={()=>editUserHandler("user" , user._id)} >User</li>
                            <li onClick={()=>editUserHandler("admin" , user._id)}  >Admin</li>
                          </ul>                         
                        }
                        <button
                          onClick={() => deleteUserHandler(user._id)}
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
      )
  );
};

export default Index;
