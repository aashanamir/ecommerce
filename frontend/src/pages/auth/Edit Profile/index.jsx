import React, { useEffect, useState } from 'react';
import './style.css';
import { FaUser, FaEnvelope } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../Slice/UserSlice';
import Loading from '../../../components/Loading';
import { BASEURL } from '../../../API/BaseUrl';

const EditProfile = () => {
  const formData = new FormData();
  const { userInfo, userStatus } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState('');
  const [filePreview, setFilePreview] = useState(null);
  const [error, setError] = useState('');

  const handleImage = (e) => {
    const img = e.target.files[0];
   setFilePreview(URL.createObjectURL(img));
   setFile(img);
  }

  useEffect(()=>{
    setName(userInfo?.name);
    setEmail(userInfo?.email);
    setFile(userInfo?.avatar);
  },[userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      setError('Please fill in all fields');
      return;
    }

    formData.append("name" , name);
    formData.append("email" , email);
    formData.append("file", file); 
      
    dispatch(updateUser(formData));
    
  };

  return (
    <div className="edit-profile-container">
      {userStatus === 'loading' ? (
        <Loading />
      ) : (
        userInfo && (
          <>
            <h2>Edit Profile</h2>
            <div className="avatar-profile">
              <img
                src={
                  (filePreview ? filePreview : userInfo &&
                  `${BASEURL}images/users/` + userInfo.avatar?.public_id)
                }
                alt={userInfo.name + "profile"}
              />
              <input type="file" name="file" onChange={handleImage} />
            </div>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">
                  <FaUser /> Name:
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  <FaEnvelope /> Email:
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Update Profile</button>
            </form>
          </>
        )
      )}
    </div>
  );
};

export default EditProfile;
