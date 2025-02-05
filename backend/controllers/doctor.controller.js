import { Doctor } from "../models/doctor.schema.js";

const changeAvailability = async (req, res) => {
  try {
    const { doctorId } = req.body;
    const doctor = await Doctor.findById({ doctorId });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }
    await doctor.findbyIdAndUpdate(doctorId, {
      available: !doctorId.available,
    });
    res.status(200).json({
      success: true,
      message: "Availability updated successfully",
      doctor,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export { changeAvailability };
