import React, { useContext } from "react";
import { AppContext } from "../context/C0ntext";

function MyApointment() {
  const { doctors } = useContext(AppContext);

  return (
    <div className="mt-24">
      <p className="pb-3 mt-12 text-xl fomt-medium text-gray-600">
        My Appointments
      </p>
      <hr />
      <div>
        {doctors.slice(0, 2).map((item, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b-2"
            >
              <div>
                <img className="w-32 bg-indigo-50" src={item.image} alt="" />
              </div>
              <div className="flex-1 text-sm text-gray-500">
                <p className="text-lg ">{item.name}</p>
                <p className="font-semibold">{item.speciality}</p>
                <p>Address</p>
                <p>{item.address.line1}</p>
                <p>{item.address.line2}</p>
                <p>
                  <span>Date & Time</span>25 Jan 2025 | 12:30
                </p>
                <p></p>
              </div>
              <div>
                <div className="flex flex-col gap-2 justify-end text-nowrap mt-4">
                  <button className="bg-primary px-8 py-2 rounded-lg text-white hover:bg-blue-700 hover:text-white  transition-all duration-300">
                    Pay Online
                  </button>
                  <button className="border tetxt-gray-700 px-8 py-2 rounded-lg  hover:bg-red-500 hover:text-white transition-all duration-300">
                    Cancel Appointment
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MyApointment;
