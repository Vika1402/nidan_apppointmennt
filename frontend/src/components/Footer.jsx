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
            <GiHospital className="text-green-700 font-bold text-3xl" /> 𝒩𝒾𝒹𝒶𝓃
          </p>

          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
            labore molestiae minus odio, totam, nihil rem aut exercitationem
            debitis vel repellendus id eaque quis maiores eius! Ipsum eaque
            magni esse.
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
