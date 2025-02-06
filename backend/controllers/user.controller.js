import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import { User } from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import { Appointment } from "../models/appointment.model.js";
import { Doctor } from "../models/doctor.schema.js";
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
    const { userId, name, phone, dob, gender, line1, line2 } = req.body;
    const imageFile = req.file;

    if (!name) return res.json({ success: false, message: "Name is required" });
    if (!phone)
      return res.json({ success: false, message: "Phone is required" });
    if (!dob)
      return res.json({ success: false, message: "Date of birth is required" });
    if (!gender)
      return res.json({ success: false, message: "Gender is required" });
    if (!line1)
      return res.json({ success: false, message: "Address line1 is required" });

    const updateData = {
      name,
      phone,
      dob,
      gender,
      address: { line1, line2: line2 || "" }, // Ensure line2 is an empty string if not provided
    };

    if (imageFile) {
      // Upload image to Cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      updateData.image = imageUpload.secure_url;
    }

    await User.findByIdAndUpdate(userId, updateData, { new: true });

    res.json({ success: true, message: "Profile updated successfully" });
  } catch (err) {
    console.error(err.message);
    res.json({ success: false, message: err.message });
  }
};

//write conntroller ook appountment
// Book an appointment
export const bookAppointment = async (req, res) => {
  try {
    const { docId, slotDate, slotTime, userId } = req.body;

    if (!userId || !docId || !slotDate || !slotTime) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const docData = await Doctor.findById(docId);
    if (!docData || !docData.available) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not available" });
    }

    let slotBooked = docData.slot_booked;
    slotBooked[slotDate] = slotBooked[slotDate] || [];

    if (slotBooked[slotDate].includes(slotTime)) {
      return res
        .status(400)
        .json({ success: false, message: "Slot time not available" });
    }

    slotBooked[slotDate].push(slotTime);
    await Doctor.findByIdAndUpdate(docId, { slotBooked }, { new: true });

    const userData = await User.findById(userId);
    await Appointment.create({
      userId,
      docId,
      slotDate,
      slotTime,
      userData,
      docData,
      amount: docData.fees,
      date: Date.now(),
    });

    res
      .status(201)
      .json({ success: true, message: "Appointment booked successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get user appointments
export const getUserAppointments = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.json({ success: false, message: "User ID is required" });
  }

  try {
    const appointments = await Appointment.find({ userId });
    res.json({
      success: true,
      appointments,
      message: "Appointment fetched",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const cancelAppointment = async (req, res) => {
  const { appointmentId } = req.body;
  console.log(appointmentId);
  
  if (!appointmentId) {
    return res.json({ success: false, message: "Appointment ID is required" });
  }

  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    await Appointment.findByIdAndDelete(appointmentId);

    res.json({
      success: true,
      message: "Appointment cancelled successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.json({ success: false, message: err.message });
  }
};
