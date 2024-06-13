import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { isAuthenticated } from "../middleware/isAuth.js";
import { Product } from "../Models/productModel.js";
import ErrorMiddleware from "../utils/erroMiddleware.js";
import AppFeatures from "../utils/features.js";


// Create Product ---- Admin

export const createProduct = catchAsyncError( async (req, res) => {
  const products = await Product.create(req.body);

  res.status(200).json({
    success: true,
    message: products,
  })
}
);

// Get All Products 

export const getAllProducts = catchAsyncError(async (req, res) => {

  const Features = new AppFeatures(Product.find() , req.query).search().pagination().filter();

  const products = await Features.query;

  res.status(200).json({
    success: true,
    products,
  })
}
);

// Get Product

export const productDetails = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    next(new ErrorMiddleware("Product Not Found"));
  }
  else {
    res.status(200).json({
      success: true,
      message: product,
    })
  }
}
);


// Update Products -- Admin

export const updateProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, { new: true });

  if (!product) {
    return next(new ErrorMiddleware("Product Not Found", 404));
  }
  else {
    res.status(200).json({
      success: true,
      message: product,
    })
  }
}
);

// Delete Product

export const deleteProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return next(new ErrorMiddleware("Product Not Found", 404));
  }
  else {
    res.status(200).json({
      success: true,
      message: product,
    })
  }
}
);