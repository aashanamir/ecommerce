import React from 'react'
import "./style.css"
import { Link } from 'react-router-dom';


const index = () => {
  return (
    <nav className="admin-sidebar">
          <ul>
            <li><Link to="/admin">Dashboard</Link></li>
            <li><Link to="/admin/users">Users</Link></li>
            <li><Link to="/admin/products">Products</Link></li>
            <li><Link to="/admin/category">Category</Link></li>
            <li><Link to="/admin/orders">Orders</Link></li>
            <li><Link to="/admin/settings">Settings</Link></li>
          </ul>
        </nav>
  )
}

export default index