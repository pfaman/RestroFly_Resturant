import jwt from "jsonwebtoken";
import { User } from "../Models/User.js";

export const AuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Login first", success: false });
    }

    const token = authHeader.split(" ")[1]; // get token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({
          message: "User not found, authorization denied",
          success: false,
        });
    }

    req.user = user; // attach user to request
    next();
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
