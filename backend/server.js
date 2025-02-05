import express from "express";
import cors from "cors";
import dootenv from "dotenv";
import { connectDb } from "./config/db.js";
import { adminRouter } from "./Routers/admin.route.js";
import { connectCloudinary } from "./config/cloudinary.js";
import { doctorRouter } from "./Routers/doctor.route.js";
import { userRouter } from "./Routers/user.route.js";

dootenv.config();

const app = express();
const PORT = process.env.PORT || 4001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));
connectDb();
connectCloudinary();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//api end points
app.get("/hello", (req, res) => {
  res.json({ message: "hello" });
});
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
