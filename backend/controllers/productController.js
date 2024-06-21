import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Product } from "../Models/productModel.js";
import ErrorMiddleware from "../utils/erroMiddleware.js";
import AppFeatures from "../utils/features.js";


// Create Product ---- Admin

export const createProduct = catchAsyncError(async (req, res) => {
  const { name, description, price, category, stock } = req.body;

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No files uploaded",
    });
  }

  const images = req.files.map(file => ({
    url: file.path,
    public_id: file.filename,
  }));

  // Create the product
  const product = await Product.create({
    name,
    description,
    price,
    category,
    stock,
    images,
  });

  res.status(200).json({
    success: true,
    message: "Product Created Successfully",
    product,
  });
});


// Get All Products 

export const getAllProducts = catchAsyncError(async (req, res) => {

  const productsCount = await Product.countDocuments();
  const productPerpage = 1;

  const Features = new AppFeatures(Product.find(), req.query).search().pagination().filter();

  const products = await Features.query;

  res.status(200).json({
    success: true,
    products,
    productPerpage,
    productsCount,
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
      product,
    })
  }
}
);


// Update Products -- Admin

export const updateProduct = catchAsyncError(async (req, res, next) => {

  const { id } = req.params;

  if (!req.files) {
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
  } else {
    const {name , description , price , category , stock } = req.body;
    const images = req.files.map(file => ({
      url: file.path,
      public_id: file.filename,
    }));

    const product = await Product.findByIdAndUpdate(id, {
      name,
      description,
      price,
      category,
      stock,
      images,
    }, { new: true });

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
      product,
    })
  }
}
);