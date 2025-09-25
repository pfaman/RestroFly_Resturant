import { json } from "express"
import { Category } from "../Models/Category.js";



// Create Category
export const createCategoryController = async (req,res) => {

  try {

    const {title, imageUrl } = req.body;

    if(!title || !imageUrl){
         
         return res.status(404).json({ message: " All fields are required!!" }, { success: false });

    }

    const newCategory = new Category({
      title,
      imageUrl
    })

    await newCategory.save();

    res.status(200).json ({ message : " New Category added successfully"} , { success : true });

  }
  catch(error){
             console.log("Errror" + error.message);

    return res.status(500).json({ message : error.message}, { success : false })
  }
}

// Get All Category

export const getAllCategoryController = async (req,res) => {

  try{

    let category = await Category.find({});

    if(!category){
      return res.status(404).json({ message: "No category found" }, { success: false });
    }
    res.status(200).json({ message: "All category get successfully " , category }, { success: false });
  }
  catch(err){

    res.status(500).json({message : err.message}, { success : false })
  }
}



// Get One Category
export const getOneCategoryController = async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);

    if (!category) {
      return res
        .status(404)
        .json({ message: "No category found" }, { success: false });
    }
    res
      .status(200)
      .json(
        { message: "One Category get successfully ", category },
        { success: false }
      );
  } catch (err) {
    res.status(500).json({ message: err.message }, { success: false });
  }
};


// Delete Category


export const deleteOneCategory = async (req,res) =>{

  try {
    const categoryId = req.params.id;

    if(!categoryId){
      return res.status(404).json({ message: "Please provide valid Id" }, { success: false });
    }

    category = await Category.findById(categoryId);

    if (!category) {
      return res
        .status(404)
        .json({ message: "No category found with this id" }, { success: false });
    }

    const category = await Category.findByIdAndDelete(categoryId);

    if (!category) {
      return res
        .status(404)
        .json({ message: "No category found" }, { success: false });
    }

    res.status(200).json({ message: "Category deleted successfully" , category }, { success: true });
  }
  catch(error){
    res.status(500).json({message : error.message}, {success : false })
  }
}


// Update category

export const updateCategoryController = async (req,res) => {

  try {
    const { title , imageUrl } = req.body;

    let category = await Category.findById(req.params.id);

    if (!category) {
      return res
        .status(404)
        .json({ message: "No category found", success: false });
    }

    // Update fields
    if (title) category.title = title;
    if (imageUrl) category.imageUrl = imageUrl;

    await category.save();

    res.status(200).json({ message: " Category updated successfully" , category }, { success: false });

  }
  catch(error){
        res.status(500).json({ message: error.message }, { success: false });

  }
}

