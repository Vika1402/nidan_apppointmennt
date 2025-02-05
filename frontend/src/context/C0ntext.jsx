import { createContext, useEffect, useState } from "react";
import { doctors } from "../assets/assets/assets";
import axiosInstance from "../utility/axiosInstant";
import toast, { Toaster } from "react-hot-toast";
export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "₹";
  const [doctors, setDoctors] = useState([]);

  const getAllDoctors = async () => {
    try {
      const { data } = await axiosInstance("/api/doctor/list");

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error("Failed to fetch doctors");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }

    useEffect(() => {
      getAllDoctors();
    }, []);

    const value = {
      doctors,
      currencySymbol,
    };
    return (
      <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
    );
  };
};

export default AppContextProvider;
