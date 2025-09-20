import express from 'express';
import {
  loginController,
  registerController,
  getUserController,
  deleteUserController,
  updateUserController,
  updateUserPasswordController,
  resetPasswordController,
} from "../Controllers/User.js";
import { AuthMiddleware } from '../MIddlewares/Auth.js';
const router = express.Router();

// Register Routes
// Request Type : POST
// @api /api/user/register
router.post('/register',registerController)

// Login Routes
// Request Type : POST
// @api /api/user/login
router.post('/login',loginController)


// Get User Routes
// Request Type : GET
// @api /api/user/getuser
router.get("/getUser", AuthMiddleware, getUserController);

// Delete User Routes
// Request Type : DELETE
// @api /api/user/delete/:id
router.delete("/delete/:id", AuthMiddleware, deleteUserController);

// Update User Routes
// Request Type : PUT
// @api /api/user/updateuser
router.put("/updateuser", AuthMiddleware, updateUserController);

// Update User PasswordRoutes
// Request Type : PUT
// @api /api/user/updatepassword
router.put("/updatepassword", AuthMiddleware, updateUserPasswordController);


// Reset User Password Routes
// Request Type : PUT
// @api /api/user/resetpassword
router.put("/resetpassword", AuthMiddleware, resetPasswordController);


export default router;