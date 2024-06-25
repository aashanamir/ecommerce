import { createSlice } from "@reduxjs/toolkit";
import { BASEURL } from "../API/BaseUrl";
import axios from "axios";
import { fetchProducts, setProduct } from "./ProductSlice";


const adminSlice = createSlice({
  name : "admin",
  initialState : {
    adminStatus : "idle",
    adminData : [],
    updateProduct : [],
    adminOrders : [],
  },

  reducers : {
    setStatus : (state , action) => {
      state.adminStatus = action.payload;
    },

    setData : (state , action) => {
      state.adminData = action.payload;
    },

    setProduct : (state , action) => {
      state.updateProduct = action.payload;
    },

    setOrders : (state , action) => {
      state.adminOrders = action.payload;
    }
  }
});


export const {setData , setStatus , setOrders } = adminSlice.actions;

export default adminSlice.reducer;
  
/*
************
************
Only Admin
***********
Actions

For Users
***********
*/

export function getAllUsersByAdmin() {
  return async function getAllUsersByAdminThunk(dispatch ) {
    dispatch(setStatus("loading"));
    try {
      const { data } = await axios.get(BASEURL + "v1/api/admin/users", { withCredentials: true });
      dispatch(setData(data));
      dispatch(setStatus("idle"));
    } catch (error) {
      dispatch(setStatus("error"));
      alert(error?.data.response.message);
      console.log(error);
    }
  }
}


export function getUserDetailsByAdmin(id) {
  return async function getUserDetailsByAdminThunk(dispatch) {
    dispatch(setStatus("loading"));
    try {
      const { data } = await axios.get(BASEURL + "v1/api/admin/user/"+id, { withCredentials: true });
      dispatch(setData(data));
      dispatch(setStatus("idle"));
      console.log(data);
    } catch (error) {
      dispatch(setStatus("error"));
      alert(error?.response.data.message);
      console.log(error);
    }
  }
}

export function updateUserRole (id , role){
  return async function updateUserRoleThunk(dispatch , getState){
    dispatch(setStatus("loading"));
    try {
       await axios.put(BASEURL + "v1/api/admin/user/" + id , {role} , {
        headers : {
          'Content-Type': 'application/json',
        }, withCredentials : true,
      })
      dispatch(setStatus("idle"));
      dispatch(getAllUsersByAdmin());

    } catch (error) {
      alert(error.response.data.message);
      dispatch(setStatus("error"));
    } 
  }
}


export function deleteUserByAdmin (id){
  return async function deleteUserByAdmin(dispatch){
    dispatch(setStatus("loading"));
    try {
      const {data} = await axios.delete(BASEURL + "v1/api/admin/user/" + id , {
        withCredentials : true,
      })
      dispatch(setStatus("idle"));
      alert(`${data.user.name} is deleted successfully`);
      dispatch(getAllUsersByAdmin());
    } catch (error) {
      alert(error.response.data.message);
      dispatch(setStatus("error"));
    } 
  }
}




/*
************
************
Only Admin
*************
Actions

For Products
*************
*/


export function addNewProduct(formData){
  return async function addNewProductThunk(dispatch){
    dispatch(setStatus("loading"));
   try {
    const {data} = await axios.post(BASEURL + "v1/api/add-product" , formData , {
      headers: {
        'Content-Type': 'multipart/form-data',
      },withCredentials : true,
    });
    dispatch(fetchProducts());
    dispatch(setStatus("idle"));
   } catch (error) {
     console.log(error);
     alert(error.response.data.message);
   }
  }
}


// Delete Product

export function deleteProductByAdmin (id) {
  return async function deleteProductByAdminThunk(dispatch){
    dispatch(setStatus("loading"));
    try {
      const {data} = await axios.delete(BASEURL + "v1/api/product/" + id  , {
        withCredentials : true,
      })
      dispatch(setStatus("idle"));
      alert(data.product.name + " Deleted Successfully");
      dispatch(fetchProducts());
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
}


// Update Product Details

export function updateProductDetails(id , formData){
  return async function updateProductDetailsThunk(dispatch){
    try {
      const {data} = await axios.put(BASEURL + "v1/api/product/" + id , formData , {
        headers: {
          'Content-Type': 'multipart/form-data',
        }, withCredentials : true,
      } )
      console.log(data);
      dispatch(setProduct(data));
    } catch (error) {
      console.warn(error);
    }
  }
}




// Admin Orders


export function getAllOrdersByAdmin(){
  return async function getAllOrdersByAdminThunk(dispatch){
    try {
      const {data} = await axios.get(BASEURL + "v1/api/admin/order/allorders" , {
        withCredentials : true,
      });

      dispatch(setOrders(data));
    } catch (error) {
      console.log(error);      
    }
  }
}

export function EditOrderStatusByAdmin(status , id){
  return async function deleteOrderByAdminThunk(dispatch){
    try {
      const {data} = await axios.patch(BASEURL + "v1/api/admin/order/updateorder/" + id , {status} , {
        withCredentials : true,
      });
      dispatch(getAllOrdersByAdmin());
      alert("Order Updated Successfully");
    } catch (error) {
      alert(error.response.data.message);      
      console.log(error);
    }
  }
}

export function deleteOrderByAdmin(id){
  return async function deleteOrderByAdminThunk(dispatch){
    try {
      const {data} = await axios.delete(BASEURL + "v1/api/admin/order/deleteorder/" + id , {
        withCredentials : true,
      });
      alert(data.message)
      dispatch(getAllOrdersByAdmin());
    } catch (error) {
      console.log(error);      
    }
  }
}