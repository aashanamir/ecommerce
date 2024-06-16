// src/components/AdminPanel.js
import React, { useEffect } from 'react';
import Sidebar from '../../../components/admin/sidebar'
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../components/Loading';
import { getAllUsersByAdmin } from '../../../Slice/adminSlice';

const AdminPanel = () => {
  const dispatch = useDispatch();
  const {adminData , adminStatus} = useSelector(state => state.admin);
  const {data} = useSelector(state => state.Products);
  const users = adminData?.users;

  // console.log(data);

  useEffect(()=>{
    dispatch(getAllUsersByAdmin())
  },[dispatch]);


  return adminStatus === "loading" ? (<Loading />) : (
    <>
    
       (<div className="admin-layout">
        <div className="admin-container">
          <Sidebar/>
          <main className="admin-content">
            <div className="cards">
              <div className="card">
                <h2>Total Users</h2>
                <p>{users?.length}</p>
              </div>
              <div className="card">
                <h2>Total Products</h2>
                <p>{data?.products?.length}</p>
              </div>
              <div className="card">
                <h2>Total Orders</h2>
                <p>1200</p>
              </div>
              <div className="card">
                <h2>Total Revenue</h2>
                <p>$50,000</p>
              </div>
            </div>
          </main>
        </div>
      </div>)
    </>
    
  );
};

export default AdminPanel;
