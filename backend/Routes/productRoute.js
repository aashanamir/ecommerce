import express from "express";
import { getAllProducts , createProduct , productDetails , updateProduct , deleteProduct} from "../controllers/productController.js";
import { checkIsAdmin, isAuthenticated } from "../middleware/isAuth.js";
const router = express.Router();


router.route("/products").get(getAllProducts);

router.route("/add-product").post(isAuthenticated, checkIsAdmin,createProduct);

router.route("/product/:id").get(productDetails).put(isAuthenticated, checkIsAdmin,updateProduct).delete(isAuthenticated, checkIsAdmin,deleteProduct);


export default router