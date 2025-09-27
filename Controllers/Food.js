import { Food } from "../Models/Food.js";
import { Orders } from "../Models/Orders.js";

// Create food
export const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;

    if (!title || !description || !price || !restaurant) {
      return res
        .status(500)
        .json(
          { message: "title, desc and price is required!!" },
          { success: false }
        );
    }

    const food = new Food({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    });
    await food.save();
    res
      .status(200)
      .json({ message: "New food item created", food }, { success: false });
  } catch (error) {
    res.status(500).json({ message: error.message }, { success: false });
  }
};

// Get all food list

export const getAllFoodController = async (req, res) => {
  try {
    const food = await Food.find({});

    if (!food) {
      return res
        .status(404)
        .json({ message: "No data found" }, { success: false });
    }
    res
      .status(200)
      .json(
        { message: "Food list get successfully", food },
        { success: false }
      );
  } catch (error) {
    res.status(500).json({ message: error.message }, { success: false });
  }
};

// Get One Food

export const getOneFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;

    if (!foodId) {
      return res
        .status(404)
        .json({ message: " Please provide food Id " }, { success: false });
    }

    let food = await Food.findById(foodId);

    if (!food) {
      return res
        .status(404)
        .json({ message: " No  food available " }, { success: false });
    }
    res
      .status(200)
      .json({ message: "food One get successfully ", food }, { success: true });
  } catch (error) {
    res.status(500).json({ message: error.message }, { success: false });
  }
};

// Get Food list By Restaurant Id

export const getFoodListByRestaurantController = async (req, res) => {
  try {
    const restauntId = req.params.id;

    if (!restauntId) {
      return res
        .status(404)
        .json(
          { message: " Please provide restaurant Id " },
          { success: false }
        );
    }

    let foodlistByRestaurant = await Food.find({ restaurant: restauntId });

    if (!foodlistByRestaurant) {
      return res
        .status(404)
        .json({ message: " No food available by Rest Id" }, { success: false });
    }
    res
      .status(200)
      .json(
        {
          message: "food list get successfully by restaurant ",
          foodlistByRestaurant,
        },
        { success: true }
      );
  } catch (error) {
    res.status(500).json({ message: error.message }, { success: false });
  }
};

// Delete food

export const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;

    if (!foodId) {
      return res
        .status(404)
        .json({ message: " Please provide food Id " }, { success: false });
    }

    const food = await Food.findByIdAndDelete(foodId);
    if (!food) {
      return res
        .status(404)
        .json({ message: "No food item with above id " }, { success: false });
    }

    res
      .status(200)
      .json(
        { message: "food item deleted successfully ", food },
        { success: true }
      );
  } catch (error) {
    res.status(500).json({ message: error.message }, { success: false });
  }
};

// Update food

export const updateFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;

    if (!foodId) {
      return res
        .status(404)
        .json({ message: " Please provide food Id " }, { success: false });
    }

    const food = await Food.findById(foodId);

    if (!food) {
      return res
        .status(404)
        .json({ message: "No food item with above id " }, { success: false });
    }

    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;

    const updatedFood = await Food.findById(
      foodId,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        category,
        code,
        isAvailable,
        restaurant,
        rating,
      },
      { new: true }
    );

    if (!updatedFood) {
      return res
        .status(500)
        .json({ message: "No data found with this id" }, { success: false });
    }
    await food.save();
    res
      .status(200)
      .json({ message: "Food updated successfully", food }, { success: false });
  } catch (error) {
    res.status(500).json({ message: error.message }, { success: false });
  }
};

//// Place Order

export const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart)
      return res
        .status(500)
        .json(
          { message: "Please add food cart or payment method " },
          { success: false }
        );
    // Calculate Price
    let total = 0;

    cart.map((i) => {
      total += i.price;
    });

    const newOrder = await new Orders({
      foods: cart,
      payment: total,
      buyer: req.body.id,
    });

    await newOrder.save();
    res
      .status(200)
      .json({ message: "Order placed sucessfully" , newOrder }, { success: true });
  } catch(error) {
    res
      .status(500)
      .json(
        { message: error.message },
        { success: false }
      );
  }
};
