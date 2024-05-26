import { User } from "../Models/userModel.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorMiddleware from "../utils/erroMiddleware.js";
import { sendToken } from "../utils/sendToken.js";


export const registerUser = catchAsyncError(async (req , res , next) => {
  
  const {name , email , password} = req.body;

  if(!name || !email || !password){

    return next(new ErrorMiddleware("Please Fill All The Details", 400));

  }

  const user = await User.create({name , email ,password , avatar : {
    public_id : "kk",
    url : "url",
  }});

  sendToken(user , 201 , res);
  
});


export const loginUser = catchAsyncError(async (req , res , next) => {

  const {email , password} = req.body;

  if (!email || !password) {

    return next(new ErrorMiddleware("Fill All the required Feild" , 400));
  
  }

  const user = await User.findOne({email}).select("+password");

  if(!user){

    return next(new ErrorMiddleware("User Not Found" , 404));

  }

  const decodePassword = await user.comparePassword(password);

  if(!decodePassword){

    return next(new ErrorMiddleware("Password Not Matched" , 401));

  }

  sendToken(user , 200 , res);

});

export const logoutUser = catchAsyncError(async (req , res , next) => {

  res.cookie("token" , null , {
    expires : new Date(Date.now())
  });

  res.status(200).json({
    success : true,
    message : "Logout SuccessFully"
  })
});