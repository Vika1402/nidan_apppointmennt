import React from "react";
import { assets } from "../assets/assets/assets";

function Contact() {
  return (
    <div>
      <div className="text-center text-2xl text-gray-500 pt-10">
        CONTACT <span className="text-gray-700 font-semibold">US</span>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <img
            className="bg-primary w-full sm:max-w-72 rounded-lg"
            src={assets.contact_image}
            alt=""
          />
        </div>
        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 text-xl bg-white mx-2">
          <p className="text-xl text-gray-700">Out Office</p>
          <p className="text-xl">Bazar Chowk Bhakhara, dhmatrai,493770,C.G.</p>
          <p className="text-xl py-4 font-medium">
            TeliPhone:
          </p>
          <p className="text-xl">Email Address: nidan123@gmail.com</p>
          <p className="py-4">Carrer At NidanDental</p>
          <p>Lern more About our jobs and Openings..</p>
          <button className="px-12 py-2 mt-1 bg-primary text-white rounded-lg hover:bg-blue-700 divide-neutral-400 transition-all">
            Expolore Jobs
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
