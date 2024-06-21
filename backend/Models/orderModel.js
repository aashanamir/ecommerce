import mongoose from "mongoose";

const schema = new mongoose.Schema({
 shippingInfo:{
    address : {
      type: String,
      required : true,
    },

    city : {
      type: String,
      required : true,
    },

    country : {
      type: String,
      required : true,
      default : "Pakistan"
    },

    phoneNo : {
      type : Number,
      required : true,
    },

    postalCode : {
      type: String,
      required : true,
    },
 },

 orderItems : [
  {
    name : {
      type : String,
      required : true,
    },
    price : {
      type : Number,
      required : true,
    },
    quantity : {
      type : Number,
      required : true,
    },
    image : {
      type : String,
      required : true,
    },
    product : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "Product",
      required : true,
    }
  }
 ],

 user : {
  type : mongoose.Schema.Types.ObjectId,
  ref : "User",
  required : true,
 },

 paymentInfo : {
  id : {
    type : String,
    required : true,
  },
  status : {
    type : String,
    required : true,
  },
 },

 paidAt : {
  type : Date,
  required : true,
},

 itemsPrice : {
  type : String,
  required : true,
},

taxPrice : {
  type : String,
  required : true,
},

shippingPrice : {
  type : String,
  required : true,
},

totalPrice : {
  type : String,
  required : true,
},

 orderStatus : {
  type : String,
  default : "Processing",
  required : true,
 },

 deliveredAt : Date,

 createdAt : {
  type : Date,
  default : Date.now,
 }

});


export const Order = mongoose.model("Order" , schema); 