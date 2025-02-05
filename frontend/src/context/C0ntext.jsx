import { createContext, useEffect, useState } from "react";
import { doctors } from "../assets/assets/assets";
import axiosInstance from "../utility/axiosInstant";
import { toast, Toaster } from "react-hot-toast";
export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "₹";
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const getDOctorsList = async () => {
    try {
      const { data } = await axiosInstance.get("/api/doctor/list");
      console.log(data);

      if (data?.success) {
        setDoctors(data?.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDOctorsList();
  }, []);

  const value = {
    doctors,
    currencySymbol,
    getDOctorsList,
    token,
    setToken,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
