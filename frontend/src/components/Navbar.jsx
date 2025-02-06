import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets/assets";
import { NavLink, useNavigate } from "react-router";
import { GiHospital } from "react-icons/gi";
import { AppContext } from "../context/C0ntext";
function Navbar() {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setToken(null); // Update state
  };

  return (
    <div className="flex items-center justify-between py-4 mb-5 z-10 shadow-md fixed top-0 right-0 left-0 bg-white">
      <p
        className="text-2xl pl-2 font-bold flex items-center gap-2"
        onClick={() => {
          navigate("/");
          scrollTo(0, 0);
        }}
      >
        <GiHospital className="text-green-700 font-bold text-3xl" />{" "}
        <span className="font-bold text-2xl">𝒩𝒾𝒹𝒶𝓃</span>
      </p>

      <ul className="hidden md:flex gap-5 items-start lg:text-xl font-medium">
        <NavLink to={"/"}>
          <li className="py-1">Home</li>
          <hr className="h-0.5 bg-primary w-3/5 m-auto border-none outline-none hidden " />
        </NavLink>
        <NavLink to={"/doctors"}>
          <li className="py-1">All Doctors</li>
          <hr className="h-0.5 bg-primary w-3/5 m-auto border-none outline-none hidden " />
        </NavLink>
        <NavLink to={"/about"}>
          <li className="py-1">About</li>
          <hr className="h-0.5 bg-primary w-3/5 m-auto border-none outline-none hidden " />
        </NavLink>
        <NavLink to={"/contact"}>
          <li className="py-1">Contact</li>
          <hr className="h-0.5 bg-primary w-3/5 m-auto border-none outline-none hidden " />
        </NavLink>
      </ul>

      <div className="flex items-center justify-center gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              className="w-8 rounded-full"
              src={userData?.image ? userData?.image : assets.profile_pic}
              alt=""
            />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 text-base font-medium text-gray-600 hidden group-hover:block">
              <div className="min-w-32 flex flex-col rounded gap-4 p-4 shadow-lg hover:cursor-pointer bg-white mt-20">
                <p
                  onClick={() => navigate("/myprofile")}
                  className="hover:text-black"
                >
                  Profile
                </p>
                <p
                  onClick={() => navigate("/myappointment")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={logoutHandler}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block hover:bg-blue-600"
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
