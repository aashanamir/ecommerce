import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";


const schema  = new mongoose.Schema({
  name : {
    type : String,
    required : [true , "Please Enter Name"],
  },
  email : {
    type : String,
    required : [true , "Please Enter Name"],
  },
  password : {
    type : String,
    required : [true , "Please Enter Name"],
    select : false,
  },
  avatar : {
    public_id : {
      type : String,
      required : true,
    },
    url : {
      type : String,
      required : true,
    }
  },
  role : {
    type : String,
    default : "user",
  },

  resetPasswordToken : {
    type : String,
  },
  resetPasswordExpires : {
    type : Date,
  }

});

// Hash Password

schema.pre("save" , async function(next){

  if(!this.isModified("password")){
    next();
  }

  this.password = await bcrypt.hash(this.password , 10);

});


// Jwt Token

schema.methods.getJwtToken = async function(){

  return await jwt.sign({id : this._id} , process.env.JWTSECRET , {
    expiresIn : process.env.JWTEXPIRES
  });

}

// Compare Password

schema.methods.comparePassword = async function(pass){

  console.log(pass);

  return await bcrypt.compare(pass , this.password);

}


// Reset Token

schema.methods.resetToken = async function(){
  
  const token = crypto.randomBytes(20).toString("hex");

  const tokenCrypto = crypto.createHash('sha256').update(token).digest('hex');

  this.resetPasswordToken = tokenCrypto;

  this.resetPasswordExpires = new Date() + 15 * 60 * 60 * 1000;

  return token;
}

export const User = mongoose.model("User" , schema);