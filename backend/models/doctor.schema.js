import mongoose from "mongoose";
import bcrypt from "bcrypt";
const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    degree: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    address: {
      type: Object,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    slot_booked: {
      type: Object,
      default: {},
    },
    experience: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    fees: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    minimize: false,
  }
);

doctorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

doctorSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Doctor = mongoose.model.Doctor || mongoose.model("Doctor", doctorSchema);

export { Doctor };
