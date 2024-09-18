import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const isAuth = async (req, res, next) => {
  try {
    // Lấy token từ header Authorization hoặc cookie
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized access",
      });
    }

    // Giải mã token
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    
    // Tìm người dùng dựa trên token đã giải mã
    req.user = await userModel.findById(decoded._id);

    next();
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "Invalid token or expired",
    });
  }
};


// ADMIN AUTH
export const isAdmin = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(401).send({
      success: false,
      message: "admin only",
    });
  }
  next();
};
