import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { BASEURL } from "../../../API/BaseUrl";
import Loading from "../../../components/Loading";
import { useParams } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { getUserDetailsByAdmin } from "../../../Slice/adminSlice";

const Index = () => {
  const dispatch = useDispatch();
  const { adminData, adminStatus } = useSelector((state) => state.admin);

  const {id} = useParams();

  console.log(adminStatus);
  useEffect(() => {
    dispatch(getUserDetailsByAdmin(id));
  }, [dispatch]);


  return (
    <div className="user-profile-container">
      {
        adminStatus === "idle" ? (
adminData.user &&<>
      <Helmet>
        <title>{adminData?.user.name} - Profile</title>
        <meta name="description" content="Welcome to E-Shop, your one-stop shop for all things great." />
      </Helmet>
          <h2>User Profile</h2>
          <div className="profile-container">
            <div className="avatar-profile">
              <img
                src={
                  adminData.user &&
                  `${BASEURL}images/users/` + adminData.user.avatar?.public_id
                }
                alt={adminData.user.name + "profile"}
              />
            </div>
            <div className="profile-details">
              <p>
                <strong>Name:</strong> {adminData.user?.name}
              </p>
              <p>
                <strong>Email:</strong> {adminData.user?.email}
              </p>
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
