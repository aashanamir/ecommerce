import { Category } from "../Models/categoryModel.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorMiddleware from "../utils/erroMiddleware.js";

// Create Category

export const createCategory = catchAsyncError(async (req , res , next)=> {

  const {name , category:path } = req.body;

  if(!name || !path) {
    return next(new ErrorMiddleware("Fill All the required Feilds" , 400));
  }

  const category = await Category.create({
    name , path , image:{
      public_id : req.file.filename || "",
      url : req.file.path || "",
    }
  });
  
  res.status(200).json({
    success : true,
    category,
  })
  
});


export const getAllCategories = catchAsyncError(async (req , res , next)=> {
  
  const category = await Category.find();
  
  res.status(200).json({
    success : true,
    category,
  })
  
});



export const deleteCategory = catchAsyncError(async (req , res , next)=> {

  const category = await Category.findByIdAndDelete({_id : req.params.id});

  if(!category){
    return next(new ErrorMiddleware("No Category Exist with this id" , 404));
  }
  
  res.status(200).json({
    success : true,
    message : "Category Deleted Successfully",
  })
  
});