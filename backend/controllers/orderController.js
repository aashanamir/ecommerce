import { Order } from "../Models/orderModel.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Product } from "../Models/productModel.js";
import ErrorMiddleware from "../utils/erroMiddleware.js";


// New Order

export const newOrder = catchAsyncError(async (req, res, next) => {
  const { shippingDetails: shippingInfo, items: orderItems, paymentDetails: paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;


  if (!shippingInfo || !paymentInfo) {
    return next(new ErrorMiddleware("Please Fill All the required info to place the order", 400));
  }


  let orderItemMap = orderItems.map((e) => (
    {
      product : e._id,
      image : e.images[0].public_id,
      name : e.name,
      quantity : e.quantity,
      price : e.price
    }
  ))

  const order = await Order.create({
    shippingInfo, orderItems: orderItemMap , user: req.user, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, paidAt: Date.now()
  });


  res.status(201).json({
    success: true,
    order,
  })

});

// Order Details 

export const orderDetails = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "name  email");

  if (!order) {
    return next(new ErrorMiddleware("No Order Found By This id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  })
})

// All Orders of a user

export const myAllOrders = catchAsyncError(async (req, res, next) => {

  const orders = await Order.find({ user: req.user.id });

  console.log(orders.length);

  res.status(200).json({
    success: true,
    orders
  });
});


// Add Orders -----------------------> Admin

export const getAllOrdersByAdmin = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {

    totalAmount += Number(order.totalPrice);

  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  })

});


// Update Order Status -------------------> Admin

export const updateOrderStatus = catchAsyncError(async (req, res, next) => {

  const order = await Order.findById(req.params.id);

  if (order.orderStatus === "Delivered") {

    return next(new ErrorMiddleware("You Have Already Delivered This Product", 400));

  }

  order.orderStatus = req.body.status;

  order.orderItems.forEach(async (order) => {

    await updateStock(order.product, order.quantity)

  })

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now;
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    order,
  })

});


async function updateStock(id, qty) {

  const product = await Product.findById(id);

  if (product.stock > 0) {
    product.stock -= qty;
  }

  product.save({ validateBeforeSave: false })
}


// Delete Order -------------------> Admin

export const DeleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) {
    return next(new ErrorMiddleware("No Order Exist with this id", 404));
  }

  res.status(200).json({
    success: true,
    order,
    message: "Order Deleted Successfully",
  })

})
