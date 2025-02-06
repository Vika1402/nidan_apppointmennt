import { createContext, useEffect, useState } from "react";
import { doctors } from "../assets/assets/assets";
import axiosInstance from "../utility/axiosInstant";
import { toast, Toaster } from "react-hot-toast";
export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "₹";
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userData, setUserData] = useState(null);
  const [myAppointment, setMyAppointment] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const loadUserProfileData = async () => {
    try {
      const { data } = await axiosInstance.get("/api/user/profile", {
        headers: { token },
      });
      if (data.success) {
        toast.success(data.message);
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

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
    loadUserProfileData,
    userData,
    setUserData,
    myAppointment,
    setMyAppointment,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
