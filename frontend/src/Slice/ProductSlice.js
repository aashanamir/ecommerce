import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name : "Product",
  initialState : {
    productStatus : "idle",
    data : [],
    productDetail : {},
  },

  reducers : {
    setProduct : (state , action) => {
      state.data = action.payload;
    },
    setStatus : (state , action) => {
      state.productStatus = action.payload;
    },
    setProductDetail : (state , action) => {
      state.productDetail = action.payload;
    }
  }
});

export const {setProduct , setStatus , setProductDetail} = productSlice.actions;

export default productSlice.reducer;


// Thunk

export function fetchProducts (){
  return async function fetchProductsThunk(dispatch , getState){
   dispatch(setStatus("loading"));
    try {
      const res = await fetch('http://localhost:5000/v1/api/products');
      const data = await res.json();
      dispatch(setProduct(data));      
     dispatch(setStatus("idle"));
    } catch (error) {
      console.log(error);
     dispatch(setStatus("error"));
    }
  }
}

export function fetchProductDetail (id){
  return async function productDetailThunk(dispatch , getState){
    try {
      dispatch(setStatus("loading"));
      console.log(id);
      const res = await fetch(`http://localhost:5000/v1/api/product/${id}`);
      const data = await res.json();
      dispatch(setProductDetail(data));      
      dispatch(setStatus("idle"));
    } catch (error) {
      console.log(error);
     dispatch(setStatus("error"));
    }
  }   
  }
