import express from "express";
import { getDoctorsList } from "../controllers/doctor.controller.js";

const doctorRouter = express.Router();

// Define your routes here
doctorRouter.get("/list", getDoctorsList);

doctorRouter.post("/", (req, res) => {
  // Logic to add a new doctor
  res.send("Doctor added");
});

doctorRouter.put("/:id", (req, res) => {
  // Logic to update a doctor by id
  res.send(`Doctor with id ${req.params.id} updated`);
});

doctorRouter.delete("/:id", (req, res) => {
  // Logic to delete a doctor by id
  res.send(`Doctor with id ${req.params.id} deleted`);
});

export { doctorRouter };
