import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import toast from "react-hot-toast";

function DoctorsList() {
  const { atoken, getAllDoctors, doctors } = useContext(AdminContext);

  useEffect(() => {
    try {
      if (atoken) {
        getAllDoctors();
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [atoken]);

  console.log(doctors);

  return (
    <div>
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="m-5 flex flex-wrap gap-4 gap-y-6 w-full pt-5">
        {doctors &&
          doctors.map((item, index) => {
            return (
              <div
                key={index}
                className="border rounded-xl max-w-52  border-amber-500 overflow-hidden cursor-pointer"
              >
                <img
                  className="object-cover object-center hover:bg-orange-400 w-full bg-amber-100"
                  src={item.image}
                  alt=""
                />
                <div className="p-4">
                  <p className="text-lg font-medium">{item.name}</p>
                  <p>{item.speciality}</p>
                </div>
                <div className="flex items-center gap-2 text-sm px-4 py-2">
                  <input type="checkbox" checked={item.available} />
                  <p>Availale</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default DoctorsList;
