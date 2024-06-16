import express from "express";
import { getAllProducts , createProduct , productDetails , updateProduct , deleteProduct} from "../controllers/productController.js";
import { checkIsAdmin, isAuthenticated } from "../middleware/isAuth.js";
import { uploadProductImage, uploadUserImage} from "../middleware/multerMiddleware.js";
const router = express.Router();


router.route("/products").get(getAllProducts);


router.route("/product/:id").get(productDetails).put(isAuthenticated, checkIsAdmin, uploadProductImage.array("files" , 10) , updateProduct).delete(isAuthenticated, checkIsAdmin,deleteProduct);

// Admin route
router.route("/add-product").post(isAuthenticated, checkIsAdmin, uploadProductImage.array("files" , 10), createProduct);


export default router