import jwt from "jsonwebtoken";
import { tokenBlackList } from "./tokenBlackList.js"; // Ensure the correct relative path and file extension

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Authentication failed!" });
    }

    if (tokenBlackList.isTokenBlackListed(token)) {
      res.status(401).json({ message: "Unauthorized", status: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", status: false });
  }
};
export default authMiddleware;
