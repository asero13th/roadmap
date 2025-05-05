import expres from "express";
import {
  userRegister,
  loginUser,
  logoutUser,
  verifyOTP,
  sendOtp,
} from "../controllers/authControllers.js";

const router = expres.Router();

router.post("/register", userRegister);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/sendotp", sendOtp);
router.post("verofyotp", verifyOTP);
export default router;
