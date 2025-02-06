import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { User } from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
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
    res.json({ success: false, message: err.message });
  }
};

// Get user profile data
export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await User.findById(userId).select("-password");
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      success: true,
      userData,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { userId, name, phone, dob, gender, address } = req.body;
    const imageFile = req.file;

    if (!name) {
      return res.json({ success: false, message: "Name is required" });
    }
    if (!phone) {
      return res.json({ success: false, message: "Phone is required" });
    }
    if (!dob) {
      return res.json({ success: false, message: "Date of birth is required" });
    }
    if (!gender) {
      return res.json({ success: false, message: "Gender is required" });
    }

    await User.findByIdAndUpdate(userId, {
      name,
      phone,
      dob,
      gender,
      address: address ? JSON.parse(address) : undefined,
    });
    if (imageFile) {
      //upload image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;
      await User.findByIdAndUpdate(userId, { image: imageUrl });
    }

    res.json({ success: true, message: "profile updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.json({ success: false, message: err.message });
  }
};
