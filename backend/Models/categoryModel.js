import mongoose from "mongoose";


const schema = new mongoose.Schema({
  name : {
    type : String,
    requried : true,
  },
  image : {
    public_id : {
      type : String,
      required : true,
    },
    url : {
      type : String,
      required : true,
    }
  },
  path : {
    type : String,
    required : true,
    default : "",
  }
})


export const Category = mongoose.model("Category" , schema);