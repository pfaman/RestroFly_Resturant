import express from 'express';
import { AuthMiddleware } from '../MIddlewares/Auth.js';
import { createCategoryController, deleteOneCategory, getAllCategoryController, getOneCategoryController, updateCategoryController } from '../Controllers/Category.js';
const router = express.Router();

// Routes 

//Create Category 
// Request Type : POST
// @api /api/category/create
router.post('/create', AuthMiddleware, createCategoryController)

// Get all category
// Request Type : GET
//@api /api/category/getAll
router.get('/getAll', AuthMiddleware,getAllCategoryController);


// Get One category
// Request Type : GET
//@api /api/category/getOne/:id
router.get('/getOne/:id', AuthMiddleware,getOneCategoryController);

// Delete one category
// Request Type : Delete
//@api /api/category/delete/:id
router.delete('/delete/:id', AuthMiddleware,deleteOneCategory);

// Update one category
// Request Type : PUT
//@api /api/category/update/:id
router.put('/update/:id', AuthMiddleware,updateCategoryController);




export default router;