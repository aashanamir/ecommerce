import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

  emailToken : {
    type : String,
  },
  emailTokenexpires : {
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

  return await bcrypt.compare(pass , this.password);

}

export const User = mongoose.model("User" , schema);