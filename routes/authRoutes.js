import expres from "express";
import {
  userRegister,
  loginUser,
  logoutUser,
} from "../controllers/authControllers.js";

const router = expres.Router();

router.post("/login", (req, res) => {
  res.send("Login");
});

router.post("/register", userRegister);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
