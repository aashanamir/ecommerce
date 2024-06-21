import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../API/BaseUrl"


const userSlice = createSlice({
  name: "user",
  initialState: {
    userStatus: "idle",
    userInfo: null,
  },

  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload.user;
    },
    setStatus: (state, action) => {
      state.userStatus = action.payload;
    }
  }
});

export const { setStatus, setUser } = userSlice.actions;

export default userSlice.reducer;

/*
************
************
Actions
************
************
*/

// SignUp User

export function SignUpUser(formData) {
  return async function SignUpUserThunk(dispatch, getState) {
    dispatch(setStatus("loading"));
    try {
      const { data } = await axios.post(BASEURL + "v1/api/register", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }, withCredentials : true,
      });
      console.log(data);
      dispatch(setUser(data));
      dispatch(setStatus("idle"));

    } catch (error) {
      console.log(error.response.data.message);
      dispatch(setStatus("error"));
    }
  }
}




// Fetch user

export function FetchUser() {
  return async function FetchUserThunk(dispatch) {
    dispatch(setStatus("loading"));
    try {
      const { data } = await axios.get(BASEURL + "v1/api/me", {
        withCredentials: true,
      });
      dispatch(setUser(data));
      dispatch(setStatus("idle"));
    } catch (error) {
      setStatus("error");
    }
  }
}


// Login User

export function LoginUser(email, password) {
  return async function LoginUserThunk(dispatch, getState) {
    dispatch(setStatus("loading"));
    try {
      const { data } = await axios.post(BASEURL + "v1/api/login", { email, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });
      dispatch(setUser(data));
      dispatch(setStatus("idle"));
    } catch (error) {
      console.log(error.response.data.message);
      alert(error.response.data.message);
      dispatch(setStatus("error"));
    }
  }
}

// Logout user

export function logoutUser() {
  return async function logoutUserThunk(dispatch) {
    dispatch(setStatus("loading"));
    try {

      const { data } = await axios.get(BASEURL + "v1/api/logout", {
        withCredentials: true,
      });
      dispatch(setUser(data));
      dispatch(setStatus("idle"));
      alert(data.message);
    } catch (error) {
      console.warn(error.response.data.message);
      alert(error.response.data.message);
      dispatch(setStatus("error"));
    }
  }
}



// Update User

export function updateUser(formData) {
  return async function updateUserFetch(dispatch) {
    dispatch(setStatus("loading"));
    try {
      const { data } = await axios.patch(
        'http://localhost:5000/v1/api/me/update',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',

          },
          withCredentials: true,
        });
      console.log(data);
      dispatch(setUser(data));
      dispatch(setStatus("idle"));
    } catch (error) {
      setStatus("error");
      alert(error.response.data.message)
    }
  }
}


