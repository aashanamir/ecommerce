import express from "express";
import { getAllProducts , createProduct , productDetails , updateProduct , deleteProduct} from "../controllers/productController.js";
const router = express.Router();


router.route("/products").get(getAllProducts)

router.route("/add-product").post(createProduct);

router.route("/product/:id").get(productDetails).put(updateProduct).delete(deleteProduct);


export default router