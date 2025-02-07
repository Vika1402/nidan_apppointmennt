import { useContext } from "react";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { AdminContext } from "./context/AdminContext";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashbord from "./pages/Admin/Dashbord";
import AllApointment from "./pages/Admin/AllApointment";

import DoctorsList from "./pages/Admin/DoctorsList";
import { AddDoctor } from "./pages/Admin/AddDoctor";
function App() {
  const { atoken } = useContext(AdminContext);

  return atoken ? (
    <div className="bg-gray-100 h-screen w-full">
      <Navbar />
      <div className="flex items-start mt-18">
        <Sidebar />
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/admin-dashbord" element={<Dashbord />} />
          <Route path="/all-appointments" element={<AllApointment />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<DoctorsList />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  ) : (
    <>
      <Login />
      <Toaster />
    </>
  );
}

export default App;
