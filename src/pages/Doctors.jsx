import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AppContext } from "../context/COntext";

function Doctors() {
  const { speciality } = useParams();
  const [filterDOc, setFilterDoc] = useState([]);
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };
  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);
  console.log(speciality);
  return (
    <div className="flex flex-col md:flex-row items-start gap-5 mt-5">
      <div>
        <p>Browse through the doctors specialist.</p>
        <div className="flex flex-col sm:flex-row items-start mt-5 ">
          <div className="flex flex-col gap-5 text-center text-sm text-gray-600 text-nowrap mr-4">
            <p
              onClick={() =>
                speciality === "General physician"
                  ? navigate("/doctors")
                  : navigate("/doctors/General physician")
              }
              className="{`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded-md transition-all cursor-pointer`}"
            >
              General physician
            </p>
            <p
              onClick={() =>
                speciality === "Gynecologist"
                  ? navigate("/doctors")
                  : navigate("/doctors/Gynecologist")
              }
              className="{`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded-md transition-all cursor-pointer`}"
            >
              Gynecologist
            </p>
            <p
              onClick={() =>
                speciality === "Dermatologist"
                  ? navigate("/doctors")
                  : navigate("/doctors/Dermatologist")
              }
              className="{`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded-md transition-all cursor-pointer`}"
            >
              Dermatologist
            </p>
            <p
              onClick={() =>
                speciality === "Pediatricians"
                  ? navigate("/doctors")
                  : navigate("/doctors/Pediatricians")
              }
              className="{`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded-md transition-all cursor-pointer`}"
            >
              Pediatricians
            </p>
            <p
              onClick={() =>
                speciality === "Neurologist"
                  ? navigate("/doctors")
                  : navigate("/doctors/Neurologist")
              }
              className="{`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded-md transition-all cursor-pointer`}"
            >
              Neurologist
            </p>
            <p
              onClick={() =>
                speciality === "Gynecologist"
                  ? navigate("/doctors")
                  : navigate("/doctors/Gynecologist")
              }
              className="{`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded-md transition-all cursor-pointer`}"
            >
              Gynecologist
            </p>
          </div>
          <div className="w-full flex flex-wrap  gap-4 pt-5 gap-y-6 px-3 sm:px-0 items-center justify-center">
            {filterDOc.map((item, index) => {
              return (
                <div
                  onClick={() => navigate(`/appointment/${item._id}`)}
                  key={index}
                  className="border w-[200px] xl:w-[270px] lg:w-[220px] border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all shadow-md duration-500"
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
        </div>
      </div>
    </div>
  );
}

export default Doctors;
