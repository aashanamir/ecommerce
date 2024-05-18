import mongoose from "mongoose";

export const connectDb = async ()=>{
  try{
    await mongoose.connect(process.env.DATABASE,{
      dbName : "Ecommerce"
    });
    console.log("Database Connected Successfully");
  }catch{
    console.log("Some Error occured in database connection");
  }
}