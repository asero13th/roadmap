import User from "../models/userModel.js";
import {
  hashPassword,
  generateSalt,
  validatePassword,
} from "../utils/passwordUtility.js";
import {
  validateEmail,
  validateUsername,
  validatePasswordStrength,
} from "../utils/validationUtility.js";
import jwt from "jsonwebtoken";
import { tokenBlackList } from "../middleware/tokenBlackList.js";

export const userRegister = async (req, res) => {
  try {
    const { user_name, user_email, user_password } = req.body;

    if (!validateEmail(user_email)) {
      return res.status(400).send({ message: "Invalid email" });
    }

    if (!validateUsername(user_name)) {
      return res.status(400).send({ message: "Invalid username" });
    }

    if (!validatePasswordStrength(user_password)) {
      return res.status(400).send({ message: "Password too weak" });
    }

    const salt = await generateSalt();
    const hashedPassword = await hashPassword(user_password, salt);

    const newUser = await User.create({
      user_name,
      user_email,
      user_password: hashedPassword,
      salt,
    });

    await newUser.save();

    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred while creating the user" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user) {
    return res.status(400).send({ message: "Invalid credentials", data: user });
  }

  const isValid = await validatePassword(password, user.password);

  if (!isValid) {
    return res.status(400).send({ message: "Invalid credentials" });
  }

  const { password: _, ...userWithoutPassword } = user.dataValues;

  const token = jwt.sign(
    { id: user.id, username: user.username }, // Include any user information you need
    process.env.JWT_SECRET_KEY,
    { expiresIn: "30d" } // Token expiration time
  );

  return res.status(200).json({ token });
};

export const logoutUser = (req, res) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ error: "No token provided." });
  }

  if (tokenBlackList.isTokenBlacklisted(token)) {
    return res.status(400).json({ error: "Invalid token." });
  }

  tokenBlackList.addTokenToBlacklist(token);

  return res.status(200).json({ message: "Logout successful" });
};
