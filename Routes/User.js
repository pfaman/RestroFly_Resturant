import express from 'express';
import {
  loginController,
  registerController,
  getUserController,
  deleteUserController,
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
router.get("/delete/:id", AuthMiddleware, deleteUserController);


export default router;