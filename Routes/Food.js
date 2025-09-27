import express from 'express';
import { AuthMiddleware } from '../MIddlewares/Auth.js';
import {
  createFoodController,
  deleteFoodController,
  getAllFoodController,
  getFoodListByRestaurantController,
  getOneFoodController,
  placeOrderController,
  updateFoodController,
} from "../Controllers/Food.js";

const router = express.Router();


//Routes

// Create food Item
// Request Type : POST
// @api/food/create

router.post('/create', AuthMiddleware, createFoodController);

// Get food
// Request Type : GET
// @api/food/getAll

router.get('/getAll', AuthMiddleware, getAllFoodController);


// Get All food list by Rest Id
// Request Type : GET
// @api/food/getAllByRestaurant/:id

router.get(
  "/getAllByRestaurant/:id",
  AuthMiddleware,
  getFoodListByRestaurantController
);

//Read One Food 
// Request Type : GET
// @api /api/food/getOne
router.get("/getOne/:id", AuthMiddleware, getOneFoodController);

// Delete food
// Request Type : Delete
// @api/food/delete/:id

router.delete('/delete/:id', AuthMiddleware, deleteFoodController);


// Update food
// Request Type : PUT
// @api/food/update/:id

router.put("/update/:id", AuthMiddleware, updateFoodController);


/// Place Order
router.post("/placeOrder", AuthMiddleware, placeOrderController);

export default router;