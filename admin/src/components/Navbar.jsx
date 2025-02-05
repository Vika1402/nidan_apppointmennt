import { useContext } from "react";
import { assets } from "../assets/assets_admin/assets";
import { AdminContext } from "../context/AdminContext";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from "react-router-dom";
function Navbar() {
  const { atoken, setAtoken } = useContext(AdminContext);

  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
    atoken && setAtoken("");
    atoken && localStorage.removeItem("atoken");
  };
  return (
    <div className="fixed top-0 right-0 left-0 w-full z-10 bg-white overflow-hidden shadow-sm">
      <div className="p-3 flex items-center justify-between ">
        <span className="font-normal text-2xl text-green-500">𝒩𝒾𝒹𝒶𝓃</span>
        <div className="text-xl rounded-full border border-gray-500 p-2">
          {atoken ? "Admin-panel" : "Doctor"}
        </div>
        <button onClick={logout} className="text-2xl bg-red-300">
          <IoIosLogOut />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
