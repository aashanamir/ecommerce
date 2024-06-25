import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASEURL } from "../API/BaseUrl";


const categorySlice = createSlice({
  name : "category",
  initialState : {
    status : "idle",
    categories : [],
  },
  reducers : {
    addCategory : (state , action) => {
     state.categories = action.payload; 
    },
    addStatus : (state , action) => {
      state.status = action.payload;
    },
  }
});


export const {addCategory , addStatus} = categorySlice.actions;

export default categorySlice.reducer;


// Actions

// Fetch Categories
export function fetchCategory () {
  return async function fetchCategoryThunk(dispatch , getState){
        dispatch(addStatus("loading"));
    try {
      
      const {data} = await axios.get(BASEURL + "v1/api/category/all");

      dispatch(addCategory(data));
      dispatch(addStatus("idle"));

    } catch (error) {
      dispatch(addStatus("error"));
    }
  }
}



// Add Category


export function createCategory (formData) {
  return async function fetchCategoryThunk(dispatch){
        dispatch(addStatus("loading"));
    try {
      
      const {data} = await axios.post(BASEURL + "v1/api/category/create" , formData , {
        headers: {
          'Content-Type': 'multipart/form-data',
        }, withCredentials : true,
      });
      alert("Category Created Successfully");
      dispatch(fetchCategory());
      dispatch(addStatus("idle"));

    } catch (error) {
      dispatch(addStatus("error"));
      console.log(error);
    }
  }
}


// Delete Category
export function deleteCategory (id) {
  return async function fetchCategoryThunk(dispatch , getState){
        dispatch(addStatus("loading"));
    try {
      const {data} = await axios.delete(BASEURL + "v1/api/category/"+id , {
        withCredentials : true,
      });

      alert(data.message);
      dispatch(fetchCategory());
      dispatch(addStatus("idle"));

    } catch (error) {
      dispatch(addStatus("error"));
    }
  }
}