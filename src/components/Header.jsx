import React from "react";
import { assets } from "../assets/assets/assets";

function Header() {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20">
      {/* left side div  */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb[-30px]">
        <p className="text-3xl lg:text-6xl md:text-4xl text-white font-semibold lineh leading-tight md:leading-tight lg:leading-tight">
          Book Apointment <br /> With Trusted Doctors
        </p>

        <div className="flex flex-col md:flex-row items-center gap-3 text-white lg:text-xl sm:text-sm font-light">
          <img className="w-28 " src={assets.group_profiles} alt="" />
          <p>
            Lorem, ipsum dolor sit amet consectetur{" "}
            <br className="hidden md:block" /> adipisicing elit. Eius,
            consectetur!
          </p>
        </div>
        <a
          className="flex items-center gap-4 bg-white px-8 py-3 rounded-full lg:text-lg text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
          href="#speciality"
        >
          Book Aponintment
          <img className="w-3" src={assets.arrow_icon} alt="" />
        </a>
      </div>

      {/* right side div */}
      <div className="md:w-1/2 relative">
        <img
          className="w-full md:absolute bottom-0 h-auto rounded-lg "
          src={assets.header_img}
          alt=""
        />
      </div>
    </div>
  );
}

export default Header;
