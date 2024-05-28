import express from "express";
import { loginUser, logoutUser, registerUser, forgetPassword, resetPassword, updateProfile, getProfile , updatePassword, getAllUsers, getUserDetails, updateUserDetails, deleteUserDetails } from "../controllers/userController.js";
import {isAuthenticated , checkIsAdmin} from "../middleware/isAuth.js"

const router = express.Router();


router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/forgot").get(forgetPassword);

router.route("/reset/:token").get(resetPassword);

router.route("/me").get( isAuthenticated , getProfile);

router.route("/me/update").put( isAuthenticated , updateProfile);

router.route("/me/updatepassword").put( isAuthenticated , updatePassword);


// Only Admin Routes

router.route("/admin/users").get( isAuthenticated , checkIsAdmin ,  getAllUsers);

router.route("/admin/user/:id").get( isAuthenticated , checkIsAdmin ,  getUserDetails).put(isAuthenticated , checkIsAdmin ,  updateUserDetails).delete(isAuthenticated , checkIsAdmin ,  deleteUserDetails);









export default router;