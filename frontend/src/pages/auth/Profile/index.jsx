import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { FetchUser } from "../../../Slice/UserSlice";
import { BASEURL } from "../../../API/BaseUrl";
import Loading from "../../../components/Loading";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

const Index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, userStatus } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(FetchUser());

  }, [dispatch]);

  
  if (userInfo == null) {
    navigate("/login");
  }

  return (
    <div className="user-profile-container">
      {
        userStatus === "idle" ? (
 userInfo &&<>
      <Helmet>
        <title>{userInfo?.name} - Profile</title>
        <meta name="description" content="Welcome to E-Shop, your one-stop shop for all things great." />
      </Helmet>
          <h2>User Profile</h2>
          <div className="profile-container">
            <div className="avatar-profile">
              <img
                src={
                  userInfo &&
                  `${BASEURL}images/users/` + userInfo.avatar?.public_id
                }
                alt={userInfo.name + "profile"}
              />
            </div>
            <div className="profile-details">
              <p>
                <strong>Name:</strong> {userInfo?.name}
              </p>
              <p>
                <strong>Email:</strong> {userInfo?.email}
              </p>
              <div className="proifle-button-cont">
                <Link to={"/edit-profile"}>Edit Profile</Link>
                <Link>Manage Password</Link>
              </div>
            </div>
          </div>
        </>) : (
          <Loading/>
        )
      }
    </div>
  );
};

export default Index;
