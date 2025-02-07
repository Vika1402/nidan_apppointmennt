import React from "react";
import { assets } from "../assets/assets/assets";
import { useNavigate } from "react-router";
import { GiHospital } from "react-icons/gi";

function Footer() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 tetxt-sm ">
        <div className="">
          <p
            className="text-2xl pl-2 font-bold flex items-center gap-2"
            onClick={() => {
              {
                navigate("/"), scrollTo(0, 0);
              }
            }}
          >
            <span className="font-bold  mx-20 text-2xl tracking-widest absolute">
              NIDAN
            </span>
            <img className="w-20" src={assets.medical} alt="" />
          </p>

          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            At Nidan, we are committed to providing high-quality healthcare with
            expert medical professionals and state-of-the-art facilities. Book
            an appointment today and experience compassionate care.
          </p>
        </div>
        <div className="">
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact US</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="">
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>999999999</li>
            <li>vikaskumarsinha1402@gmail.com</li>
          </ul>
        </div>
      </div>

      <hr />

      <div>
        <p className="py-5 text-sm text-center">
          Cpoyright 2025@ nidanndental- All right reserved
        </p>
      </div>
    </div>
  );
}

export default Footer;
