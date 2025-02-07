import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { IoHome } from "react-icons/io5";
import { FaAddressBook } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
function Sidebar() {
  const { atoken } = useContext(AdminContext);
  return (
    <div className="bg-red-50 min-h-screen ">
      {atoken && (
        <ul>
          <NavLink
            to={"/admin-dashbord"}
            className={({ isActive }) =>
              `flex items-center gap-3 cursor-pointer md:min-w-72 md:px-9  py-3.5 px-3  ${
                isActive ? " bg-gray-200 border-r-4 border-blue-500" : ""
              }`
            }
          >
            <span>
              <IoHome />
            </span>
            <span>Dashbord</span>
          </NavLink>
          <NavLink
            to={"/all-appointments"}
            className={({ isActive }) =>
              `flex items-center gap-3 cursor-pointer md:min-w-72 md:px-9  py-3.5 px-3  ${
                isActive ? " bg-gray-200 border-r-4 border-blue-500" : ""
              }`
            }
          >
            <span>
              <FaAddressBook />
            </span>
            <span>Appointment</span>
          </NavLink>
          <NavLink
            to={"/add-doctor"}
            className={({ isActive }) =>
              `flex items-center gap-3 cursor-pointer md:min-w-72 md:px-9  py-3.5 px-3  ${
                isActive ? " bg-gray-200 border-r-4 border-blue-500" : ""
              }`
            }
          >
            <span>
              <FaUserPlus />
            </span>
            <span>Add Doctor</span>
          </NavLink>
          <NavLink
            to={"/doctor-list"}
            className={({ isActive }) =>
              `flex items-center gap-3 cursor-pointer md:min-w-72 md:px-9  py-3.5 px-3  ${
                isActive ? " bg-gray-200 border-r-4 border-blue-500" : ""
              }`
            }
          >
            <span>
              <FaUserDoctor />
            </span>
            <span>Doctor List</span>
          </NavLink>
        </ul>
      )}
    </div>
  );
}

export default Sidebar;
