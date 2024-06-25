import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../API/BaseUrl";
import { add, clearCart } from "./cartSlice";

const orderSlice = createSlice({
  name : "order",
  initialState : {
    orderStatus : "idle",
    orderData : [],
  },

  reducers : {
    setData : (state , action) => {
      state.orderData = action.payload;
    },
    setStatus : (state , action) => {
      state.orderStatus = action.payload;
    }
  }
});


export const {setData , setStatus} = orderSlice.actions;

export default orderSlice.reducer;

// Actions : : 

export function createOrder(par){
  return async function createOrderThunk(dispatch , getState){
    dispatch(setStatus("loading"));
    try {
      const {data} = await axios.post(BASEURL + "v1/api/order/new" , par , {
        headers : {
          "Content-Type" : "application/json"
        }, withCredentials : true,
      });

      dispatch(clearCart());
      dispatch(setStatus("idle"));
      alert("Order Created Successfully");

    } catch (error) {
      console.log(error);     
    }
  }
}


// Get Order

export function getOrderDetails(){
  return async function createOrderThunk(dispatch , getState){
    dispatch(setStatus("loading"));
    try {
      const {data} = await axios.get(BASEURL + "v1/api/order/myorders" , {
         withCredentials : true,
      });

      dispatch(setData(data));
      dispatch(setStatus("idle"));
    } catch (error) {
      console.log(error);     
    }
  }
}

