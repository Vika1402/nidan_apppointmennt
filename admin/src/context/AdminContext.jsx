import { createContext, useState } from "react";
import axiosInstance from "../utility/axiosInstant";
import toast from "react-hot-toast";
export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [atoken, setAtoken] = useState(
    localStorage.getItem("atoken") ? localStorage.getItem("atoken") : ""
  );

  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState(null);

  const getAllDoctors = async () => {
    try {
      const response = await axiosInstance.post(
        "/api/admin/all-doctors",
        {},
        {
          headers: { atoken },
        }
      );

      const data = response.data;
      //console.log(data);

      if (data.success) {
        setDoctors(data.doctors);
        //console.log(data.doctors);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeAvailablity = async (doctorId) => {
    try {
      const response = await axiosInstance.post(
        "/api/admin/change-availability",
        { doctorId },
        { headers: { atoken } }
      );

      const data = response.data;

      if (data.success) {
        toast.success(data.message);
        await getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    atoken,
    setAtoken,
    doctors,
    getAllDoctors,
    changeAvailablity,
    appointments,
    setAppointments,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export { AdminContextProvider };
