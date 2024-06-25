import express from "express";
import { DeleteOrder, getAllOrdersByAdmin, myAllOrders, newOrder, orderDetails, updateOrderStatus } from "../controllers/orderController.js";
import { checkIsAdmin, isAuthenticated } from "../middleware/isAuth.js";

const router = express.Router();

router.route("/order/new").post( isAuthenticated , newOrder);

router.route("/order:id").get( isAuthenticated ,  orderDetails);


router.route("/order/myorders").get( isAuthenticated , myAllOrders);


router.route("/admin/order/allorders").get( isAuthenticated , checkIsAdmin ,  getAllOrdersByAdmin);

router.route("/admin/order/updateorder/:id").patch( isAuthenticated , checkIsAdmin ,  updateOrderStatus);

router.route("/admin/order/deleteorder/:id").delete( isAuthenticated , checkIsAdmin ,  DeleteOrder);







export default router;