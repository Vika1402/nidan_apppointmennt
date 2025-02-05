import { createContext, useState } from "react";
import axiosInstance from "../utility/axiosInstant";
import toast from "react-hot-toast";
export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [atoken, setAtoken] = useState(
    localStorage.getItem("atoken") ? localStorage.getItem("atoken") : ""
  );

  const [doctors, setDoctors] = useState([]);

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

  const changeAvailablity = async () => {
    try {
      const { data } = await axiosInstance.post(
        "/api/admin/change-availability",
        { doctorId },
        { headers: { atoken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error);
    }
  };

  
  const value = {
    atoken,
    setAtoken,
    doctors,
    getAllDoctors,
    changeAvailablity
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export { AdminContextProvider };
