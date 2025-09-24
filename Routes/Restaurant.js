import express from 'express';

import { AuthMiddleware } from '../MIddlewares/Auth.js';
import { createRestaurant, getAllRestaurantController, getOneRestaurantController } from '../Controllers/Restaurant.js';
const router = express.Router();


//Routes

//Create Resaurant 
// Request Type : POST
// @api /api/restaurant/create
router.post('/create', AuthMiddleware, createRestaurant)


//Read All Resaurant 
// Request Type : GET
// @api /api/restaurant/get
router.get("/getAll", AuthMiddleware, getAllRestaurantController);

//Read One Resaurant 
// Request Type : GET
// @api /api/restaurant/getOne
router.get("/getOne/:id", AuthMiddleware, getOneRestaurantController);


export default router;