import express from "express";
import { checkIsAdmin, isAuthenticated } from "../middleware/isAuth.js";
import { uploadCategoryImage } from "../middleware/multerMiddleware.js";
import { createCategory, deleteCategory, getAllCategories } from "../controllers/categoryController.js";


 const router = express.Router();


router.route("/category/create").post( isAuthenticated ,  checkIsAdmin ,   uploadCategoryImage.single("file")  ,  createCategory);

router.route("/category/all").get(getAllCategories);

router.route("/category/:id").delete(isAuthenticated , checkIsAdmin , deleteCategory);






export default router;
