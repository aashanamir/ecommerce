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
    // required : true,
  },
  status : {
    type : String,
    // required : true,
  },
 },

 paidAt : {
  type : Date,
  required : true,
},

 itemsPrice : {
  type : String,
  required : true,
  default : 0,
},

taxPrice : {
  type : String,
  required : true,
  default : 0,
},

shippingPrice : {
  type : String,
  required : true,
  default : 0,
},

totalPrice : {
  type : String,
  required : true,
  default : 0,
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