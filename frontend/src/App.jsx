import React from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import About from "./pages/About";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyApointment from "./pages/MyApointment";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Doctors from "./pages/Doctors";
import Appointment from "./pages/Appointment.jsx";

function App() {
  return (
    <div className="mx-10  overflow-y-scroll overflow-hidden">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />

        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/myappointment" element={<MyApointment />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route path="/*" element={<Home />} />
      </Routes>
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
