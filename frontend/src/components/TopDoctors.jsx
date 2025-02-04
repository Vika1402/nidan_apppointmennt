import React from "react";
import { useContext } from "react";

import { useNavigate } from "react-router";
import { AppContext } from "../context/C0ntext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10 ">
      <h1 className="text-3xl font-medium">Top Doctors Book</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </p>
      <div className="w-full flex flex-wrap  gap-4 pt-5 gap-y-6 px-3 sm:px-0 items-center justify-center">
        {doctors.slice(0, 10).map((item, index) => {
          return (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              key={index}
              className="border w-[200px] xl:w-[270px] lg:w-[220px] border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 shadow-md"
            >
              <img className="bg-blue-50" src={item.image} alt="" />
              <div className="p-4 ">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                  <p className="w-2 h-2 bg-green-500 rounded-full "></p>
                  <p>Available</p>
                </div>
                <p className="font-semibold">{item.name}</p>
                <p>{item.speciality}</p>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => {
          navigate("/doctors"), scrollTo(0, 0);
        }}
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
      >
        More
      </button>
    </div>
  );
};

export default TopDoctors;
