import express from "express"; // Corrected the typo: 'expres' to 'express'
import {
  userRegister,
  loginUser,
  logoutUser,
  verifyOTP,
  sendOtp,
} from "../controllers/authControllers.js";



// You had two routes for "/login". I removed the first one since it was just sending "Login" as a response.
// The second route for "/login" uses the `loginUser` controller, which is what you want.
const router = expres.Router();

router.post("/register", userRegister); // Route for user registration
router.post("/login", loginUser); // Route for user login
router.post("/logout", logoutUser); // Route for user logout

export default router;
