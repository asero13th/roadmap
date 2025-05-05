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
// import User from "../models/userModel.js";
import { transporter } from "../utils/verificationUtility.js";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import dotenv from "dotenv";
let otpStore = {};

dotenv.config();
export const userRegister = async (req, res) => {
  try {
    const { email, password, firstName, lastName, dateOfBirth } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).send({ message: "Invalid email" });
    }

    const userExists = await User.findOne({ where: { email: email } });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exists", status: false });
    }

    if (!validatePasswordStrength(password)) {
      return res.status(400).send({ message: "Password too weak" });
    }

    const salt = await generateSalt();
    const hashedPassword = await hashPassword(password, salt);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      dateOFBirth: dateOfBirth,
      id: uuidv4(),
    });

    await newUser.save();

    const userWithoutPassword = {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      streak: newUser.streak,
      role: newUser.role,
      dateOFBirth: newUser.dateOFBirth,
    };

    res.status(201).send({
      message: "User created successfully",
      status: true,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .send({ message: "An error occurred while creating the user", error });
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

  // if (!user.isVerified) {
  //   return res.status(400).send({ message: "User is not verified" });
  // }

  const { password: _, ...userWithoutPassword } = user.dataValues;

  const token = jwt.sign(
    { id: user.id, username: user.firstName }, // Include any user information you need
    process.env.JWT_SECRET_KEY,
    { expiresIn: "30d" } // Token expiration time
  );

  return res.status(200).json({ token, data: userWithoutPassword });
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

export const sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).send("Email is required");
  }

  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    return res.status(400).send({ message: "Invalid email" });
  }

  const otp = crypto.randomInt(100000, 999999).toString();
  otpStore[email] = { otp, expires: Date.now() + 300000 };

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res
        .status(500)
        .send({ message: "Error sending email", status: false });
    }
    console.log(info.response);
    res.status(200).send({ message: "OTP sent", status: true });
  });

  setTimeout(() => {
    if (otpStore[email]) delete otpStore[email];
  }, 300000);
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).send("Email and OTP are required");
  }

  const storedOtpData = otpStore[email];
  if (!storedOtpData) {
    return res.status(400).send("OTP not found");
  }

  // Check if OTP is correct and not expired
  if (storedOtpData.otp === otp && Date.now() < storedOtpData.expires) {
    delete otpStore[email]; // Remove OTP after successful validation
    await User.update({ email }, { isVerified: true });
    return res.status(200).send("OTP verified successfully");
  }

  res.status(400).send("Invalid or expired OTP");
};
