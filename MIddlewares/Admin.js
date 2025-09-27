import { User } from "../Models/User.js";

export const AdminMiddleware = async (req, res, next) => {
  try {
    const user = await req.user;

    console.log("User" , user);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (user.userType !== "admin") {
      return res.status(403).json({
        message: "Only admin access",
        success: false,
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
