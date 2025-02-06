import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/C0ntext";
import axiosInstance from "../utility/axiosInstant";
import toast from "react-hot-toast";

function MyApointment() {
  const { doctors, myAppointment, setMyAppointment, token } =
    useContext(AppContext);

  const getAppointments = async () => {
    const { data } = await axiosInstance.post(
      "/api/user/get-appointment",
      {},
      {
        headers: { token },
      }
    );

    if (data.success) {
      toast.success("appointment fetched");
      setMyAppointment(data.appointments);
      console.log(data);
    } else {
      toast.error(data.message);
    }
  };

  const cancelAppointments = async (appointmentId) => {
    const { data } = await axiosInstance.post(
      "/api/user/cancel-appointment",
      { appointmentId },
      { headers: { token } }
    );

    if (data.success) {
      toast.success("appointment Canceled");
      setMyAppointment((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment._id !== appointmentId)
      );
      console.log(data);
    } else {
      toast.error(data.message);
      console.log(data);
    }
  };
  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div className="mt-24">
      <p className="pb-3 mt-12 text-xl fomt-medium text-gray-600">
        My Appointments
      </p>
      <hr />
      <div>
        {myAppointment?.map((item, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b-2"
            >
              <div>
                <img
                  className="w-32 bg-indigo-50"
                  src={item.docData.image}
                  alt=""
                />
              </div>
              <div className="flex-1 text-sm text-gray-500">
                <p className="text-lg ">{item?.docData?.name}</p>
                <p className="font-semibold">{item?.docData?.speciality}</p>
                <p>Address</p>
                <p>{item?.docData?.address.line1}</p>
                <p>{item?.docData?.address.line2}</p>
                <p>
                  <span>{item.slotDate}</span>
                  {item.slotTime}
                </p>
                <p></p>
              </div>
              <div>
                <div className="flex flex-col gap-2 justify-end text-nowrap mt-4">
                  <button className="bg-primary px-8 py-2 rounded-lg text-white hover:bg-blue-700 hover:text-white  transition-all duration-300">
                    Pay Online
                  </button>
                  <button
                    onClick={() => cancelAppointments(item._id)}
                    className="border text-gray-700 px-8 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300"
                  >
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
