import React, { useEffect } from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";

function Dashbord() {
  const { doctors, getAllDoctors, appointments, atoken } =
    useContext(AdminContext);

  useEffect(() => {
    try {
      if (atoken) {
        getAllDoctors();
      }
    } catch (error) {
      console.log(error);
    }
  }, [atoken]);
  console.log(doctors);
  console.log(appointments);


  return (
    <div className="h-screen bg-orange-100 w-full">
      <div className="flex w-full gap-6 font-normal text-xl">
        <div className=" bg-gray-400 px-10 py-4">
          Total No Of Doctors:{doctors.length}
        </div>
        <div className=" bg-gray-400 px-10 py-4">
          Total No Of Appointments:{appointments?.length}
        </div>
        { 
          <div className=" bg-gray-400 px-10 py-4">
            Total No Of Appointment Today
          </div>
        }
      </div>
    </div>
  );
}

export default Dashbord;
