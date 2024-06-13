// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaCaretDown , FaOpencart } from 'react-icons/fa';
import { RxAvatar } from "react-icons/rx";

import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { BASEURL } from '../../API/BaseUrl';
import { logoutUser } from '../../Slice/UserSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const [profileMenu , setProfileMenu] = useState(false);  
  const { userInfo , userStatus } = useSelector((state) => state.user);

  const toggleProfileMenu = () => {
    setProfileMenu(!profileMenu);
  };

  const logoutHandler = ()=> {
    dispatch(logoutUser());
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo"><img src="/Assets/images/logo.png" alt="E Store" /></Link>
      <div className="search-bar">
      <FaSearch/>  
      <input type="text" placeholder='Search For Products Brand And More'/>
      </div>
      <div className='header-third-box'>
        <div className="header-cart">
          <FaOpencart />
          <span>Cart</span>
        </div>
      {
        userInfo && userStatus !== "loading" ?<>
        <div onClick={toggleProfileMenu} className='header-avatar'>
        <img src={userInfo && `${BASEURL}images/users/` +   userInfo.avatar?.public_id} alt={userInfo.name + " profile"} /> 
        </div> 
        {
         profileMenu && <div className="avatar-menu">
          <ul>
            <li><Link onClick={toggleProfileMenu} to="/profile">Profile</Link></li>
            <li><Link onClick={toggleProfileMenu} to="/settings">Settings</Link></li>
            <li onClick={toggleProfileMenu}><Link onClick={logoutHandler}>Logout</Link></li>
          </ul>
        </div>
        } 
      </> 
      : <Link className='sign-in-button' to={"/login"}><RxAvatar/></Link>
      }
      </div>
    </nav>
  );
};

export default Navbar;
