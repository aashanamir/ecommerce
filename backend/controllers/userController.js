import { User } from "../Models/userModel.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorMiddleware from "../utils/erroMiddleware.js";
import { sendEmail } from "../utils/sendEmail.js";
import { sendToken } from "../utils/sendToken.js";
import crypto from "crypto";


export const registerUser = catchAsyncError(async (req , res , next) => {
  
  const {name , email , password} = req.body;

  if(!name || !email || !password){

    return next(new ErrorMiddleware("Please Fill All The Details", 400));

  }

  const user = await User.create({name , email ,password , avatar : {
    public_id : req.file.filename,
    url : req.file.path ,
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


// Forget Password 

export const forgetPassword = catchAsyncError(async (req , res , next)=> {

  const {email} = req.body;
  
  const user = await User.findOne({email});

  if(!user){
    return next(new ErrorMiddleware("No User Exist with this email Address" , 404));
  }

  const resetToken = await user.resetToken();

  await user.save();

  const resetLink = `${req.protocol}://${req.hostname}:5000/v1/api/${resetToken}`;
  
  const message = `<div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
  <div style="text-align: center; background-color: green; padding: 20px; border-top-left-radius: 8px; border-top-right-radius: 8px;">
      <h1 style="color: #ffffff; margin: 0;">Reset Your Password</h1>
  </div>
  <div style="padding: 20px; color: #333333;">
      <p style="line-height: 1.6;">Hi ${user.name},</p>
      <p style="line-height: 1.6;">We received a request to reset your password. Click the button below to reset it:</p>
      <a href="${resetLink}" style="display: block; width: 200px; margin: 20px auto; padding: 10px; text-align: center; background-color: green; color: #ffffff; text-decoration: none; border-radius: 5px;">Reset Password</a>
      <p style="line-height: 1.6;">If you didn't request a password reset, please ignore this email or contact support if you have questions.</p>
      <p style="line-height: 1.6;">Thanks,<br>Ecommerce Store</p>
  </div>
</div>`;

  try {

    await sendEmail({
      subject : "Reset Password",
      email : user.email,
      message : message,
    });

    res.status(200).json({
      success : true,
      message : `Email Sent Successfully to ${email}`
    })
    
  } catch (error) {
    user.resetPasswordToken = undefined;

    await user.save();

    return next(new ErrorMiddleware(error.message , 500));
  }

}); 


export const resetPassword = catchAsyncError(async(req , res , next) => {

  const {token} = req.params;

  const resetToken = crypto.createHash('sha256').update(token).digest("hex");

  const user = await User.findOne({resetPasswordToken : resetToken , resetPasswordExpires : {$gt: Date.now()}});

  if(!user){
    return next(new ErrorMiddleware("Reset Password token is expire" , 404));
  }

  user.password = req.body.password;

  await user.save();

  sendToken(user , 200 , res);

});


// Get Profile ----------- User

export const getProfile = catchAsyncError(async (req , res , next) => {
  
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success : true,
    user,
  })

})


// Update Profile ----- User

export const updateProfile = catchAsyncError(async (req , res , next) => {
  
  const user = await User.findByIdAndUpdate(req.user.id , req.file ? ({
    name : req.body.name,
    email : req.body.email,
    
     avatar : {
        public_id : req.file.filename,
        url : req.file.path ,
      }
    
    
  }) : ({
    name : req.body.name,
    email : req.body.email,
    
  }) , {new : true, });

  await user.save();

  res.status(200).json({
    success : true,
    user,
  })

});

// Update Password User

export const updatePassword = catchAsyncError(async (req , res , next) => {

  const user = await User.findById(req.user.id).select("+password");

  const oldPassword = await user.comparePassword(req.body.password);

  // console.log(oldPassword);

  if(!oldPassword)
    {
      return next(new ErrorMiddleware("Old Password is not Correct" , 400));
    }

  if(req.body.newPassword !== req.body.confirmPassword)  
    {
      return next(new ErrorMiddleware("Password and confirm password not matched" , 400));
    }

  user.password = req.body.newPassword;

  await user.save();

  res.status(200).json({
    success : true,
    message : "Password updated successfully"
  })

});



// Get All Users -----------> Admin

export const getAllUsers = catchAsyncError(async (req , res , next) => {

  const users = await User.find();

  res.status(200).json({
    success : true,
    users,
  });

});


// Get User Details -----------> Admin

export const getUserDetails = catchAsyncError(async (req , res , next) => {

  const user = await User.findById(req.params.id);

  if(!user){
    return next(new ErrorMiddleware("No User Exist with this id" , 404))
  }

  res.status(200).json({
    success : true,
    user,
  });

});


// Update User Details -----------> Admin

export const updateUserDetails = catchAsyncError(async (req , res , next) => {

  const user = await User.findByIdAndUpdate(req.params.id , {
    name : req.body.name,
    email : req.body.email,
    role : req.body.role,

  } , {new : true, });

  if(!user){
    return next(new ErrorMiddleware("No User Exist with this id" , 404))
  }

  await user.save();
  res.status(200).json({
    success : true,
    user,
  });

});


// Delete User -----------> Admin

export const deleteUserDetails = catchAsyncError(async (req , res , next) => {

  const user = await User.findByIdAndDelete(req.params.id);

  if(!user){
    return next(new ErrorMiddleware("No User Exist with this id" , 404))
  }

  res.status(200).json({
    success : true,
    user,
  });

});