import { User } from "../Models/User";
import jwt from "jsonwebtoken";
export const authMiddleware = async (req,res) =>{

  try {
    const token = req.header('Auth');
    console.log("Token check" + token);

    if(!token){
      return res.json({message : "Login in first"} , {success : false})
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const id = decoded.id;

    let user = await User.findById(id);

    if(!user){
      return res
        .status(401)
        .json({ message: "User not found, authorization denied" }, { success : false});
    }
    req.user = user;
    next();
  }catch(error){
    return res
      .status(501)
      .json(
        { message: error.message},
        { success: false }
      );
  }
}