//api for adddding doctor
import { Doctor } from "../models/doctor.schema.js";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import { accessTokenGeneratorFromJWT } from "../utility/jwtTokenGenrator.js";
import { Appointment } from "../models/appointment.model.js";
const addDoctor = async (req, res) => {
  const {
    name,
    speciality,
    degree,
    phone,
    email,
    password,
    address,
    experience,
    about,
    fees,
  } = req.body;

  const imageFile = req.file;
  if (
    !name ||
    !speciality ||
    !degree ||
    !phone ||
    !email ||
    !password ||
    !address ||
    !experience ||
    !about ||
    !fees ||
    !imageFile
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Plese Enter Valid Email Address" });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Plese Enter a strong Password atleast 8 charcter ",
    });
  }

  //upload image to cludinary
  const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
    resource_type: "image",
  });
  console.log(imageUpload);

  const imageUrl = imageUpload.secure_url;
  const doctorData = {
    name,
    speciality,
    degree,
    phone,
    email,
    password,
    address: JSON.parse(address),
    experience,
    about,
    fees,
    image: imageUrl,
  };
  try {
    const newDoctor = new Doctor(doctorData);
    await newDoctor.save();
    res
      .status(201)
      .json({ success: true, newDoctor, message: "Doctor added successfully" });
  } catch (error) {
    res.status(400).send({
      success: false,
      error: "Error adding doctor",
      details: error.message,
    });
  }
};

//api fro admin login

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = accessTokenGeneratorFromJWT(email, password);
      res.json({
        success: true,
        token,
        message: "Login successful",
      });
    } else {
      res.json({
        success: false,

        message: "Invalid credentials",
      });
    }
  } catch (error) {
    res
      .status(400)
      .send({ error: "Error adding doctor", message: error.message });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).select("-password");
    res.json({ success: true, doctors, message: "Data fetched" });
  } catch (error) {
    res
      .status(400)
      .send({ error: "Error adding doctor", message: error.message });
  }
};
const getAdminAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({});
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
export const deleteAppointment = async (req, res) => {
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
      message: "Appointment deleted successfully",
    });
  } catch (err) {
    console.error(err.message);
    res.json({ success: false, message: err.message });
  }
};
export { addDoctor, loginAdmin, getAllDoctors, getAdminAppointments };
