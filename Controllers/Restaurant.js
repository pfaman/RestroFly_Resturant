// Create Restaurant

import { Restaurant } from "../Models/Restaurant.js";

export const createRestaurant = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;

    if (!title || !coords)
      return res
        .status(404)
        .json(
          { message: "Please provide title and Address" },
          { sucess: false }
        );

    const newRestaurant = new Restaurant({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newRestaurant.save();
    res.status(201).send({
      success : true,
      message : " New Restaurant created successfully"
    })

  } catch (error) {
    console.log("Errrorrr" + error.message);
    res.status(501).json({ message: error.message }, { success: false });
  }
};


// Get All Restaurant
export const getAllRestaurantController = async (req, res) => {

  try{

  let restaurant = await Restaurant.find ({ });

  if (!restaurant) {
    return res.status(404).json({ message: " No  restaurant available " }, { success: false });
  }
  res
    .status(200)
    .json({ message: " All get restaurant successfully " , restaurant }, { success: true });

}
catch(error){
 res.status(500).json({ message : error.message}, {success : false })
}
}


// Get One  Restaurant
export const getOneRestaurantController = async (req, res) => {

  try{

  const restaurantId = req.params.id;

  if (!restaurantId) {
    return res
      .status(404)
      .json({ message: " Please provide restaurant Id " }, { success: false });
  }

  let restaurant = await Restaurant.findById(restaurantId);


  if (!restaurant) {
    return res.status(404).json({ message: " No  restaurant available " }, { success: false });
  }
  res
    .status(200)
    .json({ message: "Restaurant get successfully " , restaurant }, { success: true });

}
catch(error){
 res.status(500).json({ message : error.message}, {success : false })
}
}


// Delete  Restaurant
export const deleteRestaurantController = async (req, res) => {

  try{

  const restaurantId = req.params.id;

  if (!restaurantId) {
    return res
      .status(404)
      .json({ message: " Please provide restaurant Id " }, { success: false });
  }

  let restaurant = await Restaurant.findByIdAndDelete(restaurantId);


  if (!restaurant) {
    return res.status(404).json({ message: " No  restaurant available " }, { success: false });
  }
  res
    .status(200)
    .json({ message: "Restaurant delete successfully " , restaurant }, { success: true });

}
catch(error){
 res.status(500).json({ message : error.message}, {success : false })
}
}

// 