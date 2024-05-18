import mongoose from "mongoose";

const schema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },

  images: [
    {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      }
    }
  ],

  rating: {
    type: Number,
    default: 0,
  },

  stock: {
    type: Number,
    required: true,
    default: 1,
  },

  ratings: [
    {
      rate: {
        type: Number,
        required: true,
      },

      message: {
        type: String,
        required: true,
      },
    }
],

  createdAt: {
    type: Date,
    default: Date.now,
  }

  
});

export const Product = mongoose.model("Product", schema);