import express from "express";
import {
  addDoctor,
  deleteAppointment,
  getAdminAppointments,
  getAllDoctors,
  loginAdmin,
} from "../controllers/admin.controller.js";
import { upload } from "../middlewares/multer.js";
import { adminAuthentication } from "../middlewares/authAdmin.js";
import { changeAvailability } from "../controllers/doctor.controller.js";
import { getUserAppointments } from "../controllers/user.controller.js";

const adminRouter = express.Router();

adminRouter.post(
  "/add-doctor",
  adminAuthentication,
  upload.single("image"),
  addDoctor
);

adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-doctors", adminAuthentication, getAllDoctors);
adminRouter.post(
  "/change-availability",
  adminAuthentication,
  changeAvailability
);
adminRouter.post("/delete-appointment", adminAuthentication, deleteAppointment);
adminRouter.post("/get-appointment", adminAuthentication, getAdminAppointments);

export { adminRouter };
