import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { User } from "../models/user.model.js";

// Register a new user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ success: false, message: "missing details" });
  }

  if (!validator.isEmail(email)) {
    return res.json({ success: false, message: "Enter a valid email" });
  }

  if (password.length < 8) {
    return res.json({ success: false, message: "password atleast 8 length" });
  }
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }
  try {
    // Check if user already exists

    // Create a new user
    const userData = {
      name,
      email,
      password,
    };

    const newUser = await User.create(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      success: true,
      token,
      message: "User registerd successfully",
    });
  } catch (err) {
    console.log(err.message);
    res.json({ success: false, message: err.message });
  }
};

// Login a user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User Not registerd" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN_SECRET, {
      expiresIn: "3d",
    });
    user.password = undefined;
    res.json({
      success: true,
      user,
      token,
      message: "user login successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
