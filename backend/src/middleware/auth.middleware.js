import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute =async (requestAnimationFrame,res, next) =>{
    try{
        const token = requestAnimationFrame.cookies.jwt

        if(!token){
            return res.status(401).json({message: "Unauthorized - no token provide"});
        }

        const decode = jwt.verify(token , process.env.JWT_SECRET);

        if(!decode){
            return res.status(401).json({ message:"Unauthorized -Invalid credentil"})
        }

        const user = await User.findById(decode.userId).select("-password");

        if(!user){
           return res.status(404).json({message:"user not found"});
        }
      
        req.user=user;

        next();


    }catch(error){
        console.log("Error in protectRoute middleware",error.message);
        res.status(500).json({ message: "Invalid Server Error"});
    }
}