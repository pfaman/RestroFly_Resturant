import { User } from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// Register User
export const registerController = async (req, res) => {
  console.log(req.body);
  try {
    const { username, email, phone, password, address, answer } = req.body;

    // Validation

    if (!username || !email || !password || !phone || !address || !answer)  {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ message: "User already existed", success: false });
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,
    });
    res  
      .status(200)
      .json(
        { message: "User created successfully!!!!" },
        { user },
        { success: true }
      );
  } catch (error) {
    res.status(501).json({ message: error.message, success: false });
  }
};

// Login User

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    let user = await User.findOne({ email });

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    if (!user) {
      return res
        .status(401)
        .json({ message: "User does not existed" }, { success: true });
    }

    let isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invaild credentials" }, { success: true });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    user.password = undefined;
    res.status(200).json({
      message: "User login successfully",
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    res.status(501).json({ message: error.message }, { success: false });
  }
};

// Get User
export const getUserController = async (req, res) => {
  try {
    let user = await User.findById(req.user.id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found" }, { success: true });
    }
    res
      .status(200)
      .json({ message: "User data get successfully", user }, { success: true });
  } catch (error) {
    res.status(500).json({ message: error.message }, { success: false });
  }
};

// Delete User

export const deleteUserController = async (req, res) => {
  try {
    let user = await User.findByIdAndDelete(req.user.id);

    if(!user){
       return res
         .status(401)
         .json({ message: "User not found" }, { success: true });
    }
    res
      .status(200)
      .json({ message: "User deleted successfully", user }, { success: true });
  } catch (error) {
    res.status(500).json({ message: error.message }, { success: false });
  }
};

// Update User
export const updateUserController = async (req, res) => {
  try {
    const { username, address, phone } = req.body;

    let user = await User.findById(req.user.id);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Update fields
    if (username) user.username = username;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};


// Update User Password
export const updateUserPasswordController = async (req, res) => {
  try {

    const { password } = req.body;

    let user = await User.findById(req.user.id);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    if (!password) {
      return res
        .status(400)
        .json({ message: "Password is required", success: false });
    }

    // Update fields
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    
    await user.save();

    res.status(200).json({
      message: "User password updated successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};


// Reset Password

export const resetPasswordController = async (req, res) => {

  try {

    const { email , newPassword, answer} = req.body;
    
    if (!email || !newPassword || !answer) {
      return res
        .status(404)
        .json({ message: "All fields are required", success: false });
    }
     const user = await User.findOne( { email, answer });

     if(!user){
      return res
        .status(404)
        .json({ message: "User not found or Invalid answer", success: false });
     }

     const hashedPassword = await bcrypt.hash(newPassword, 10);
     user.password = hashedPassword;
     
     await user.save();
     return res
       .status(200)
       .json({ message: "Password reset succesfully", success: true });
  }
  catch(error){
    res.status(500).json({message : error.message}, { success : false})
  }
}

