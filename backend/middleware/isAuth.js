import { User } from "../Models/userModel.js";
import ErrorMiddleware from "../utils/erroMiddleware.js";
import { catchAsyncError } from "./catchAsyncError.js";
import jwt from "jsonwebtoken";


// Checking Authentication

export const isAuthenticated = catchAsyncError(async(req , res , next)=> {

  const {token} = req.cookies;

  if(!token){
    return next(new ErrorMiddleware("Please Login First" , 400));
  }

  const decoded = jwt.verify(token , process.env.JWTSECRET);

  const user = await User.findById(decoded.id);

  req.user = user;

  next();

});


// Checking Admin

export const checkIsAdmin = catchAsyncError(async (req , res , next) => {
  const {role} = req.user;

  if(role !== "admin"){
    next(new ErrorMiddleware(`Dear ${req.user.name} you are not Authorise to access this path`, 401));
  }

  next();

});