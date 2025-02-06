import express from "express";
import {
  bookAppointment,
  cancelAppointment,
  getUserAppointments,
  getUserProfile,
  loginUser,
  registerUser,
  updateUserProfile,
} from "../controllers/user.controller.js";
import { userAuthentication } from "../middlewares/authUser.js";
import { upload } from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", userAuthentication, getUserProfile);
userRouter.put(
  "/update-profile",
  upload.single("image"),
  userAuthentication,
  updateUserProfile
);
userRouter.post("/appointment", userAuthentication, bookAppointment);
userRouter.post("/get-appointment", userAuthentication, getUserAppointments);
userRouter.post("/cancel-appointment", userAuthentication, cancelAppointment);
export { userRouter };
