import express from 'express';
import { loginController, registerController } from '../Controllers/User.js';

const router = express.Router();

// Register Routes
// Request Type : POST
// @api /api/user/register
router.post('/register',registerController)

// Login Routes
// Request Type : POST
// @api /api/user/login
router.post('/login',loginController)

export default router;