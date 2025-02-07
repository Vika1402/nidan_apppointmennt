import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/C0ntext";
import axiosInstance from "../utility/axiosInstant";
import toast from "react-hot-toast";
import { GiWingedSword } from "react-icons/gi";
import { useNavigate } from "react-router";

function MyApointment() {
  const navigate = useNavigate();
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
      // toast.success("appointment fetched");
      setMyAppointment(data.appointments);
      //console.log(data);
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
      // setMyAppointment((prevAppointments) =>
      //   prevAppointments.filter((appointment) => appointment._id !== appointmentId)
      // );
      getAppointments();
      console.log(data);
    } else {
      toast.error(data.message);
      console.log(data);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_TEST_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const { data } = await axiosInstance.post(
            "/api/user/verify-razorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            getAppointments();
            navigate("/myappointment");
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  const appointmentRazorPay = async (appointmentId) => {
    try {
      const { data } = await axiosInstance.post(
        "/api/user/payment",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        console.log(data.order);
        initPay(data.order);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    token && (
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
                    className="w-32 h-32 object-cover  bg-indigo-50 rounded-xl"
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
                    {!item.cancelled && item.payment && (
                      <button
                        className={` px-8 py-2 rounded-lg text-white bg-orange-500 hover:text-white  transition-all duration-300`}
                      >
                        paid
                      </button>
                    )}

                    {!item.payment && (
                      <button
                        onClick={() => appointmentRazorPay(item._id)}
                        className={`bg-primary px-8 py-2 rounded-lg text-white hover:bg-blue-700 hover:text-white  transition-all duration-300 ${
                          item.cancelled ? "hidden" : "btn-active"
                        }`}
                      >
                        Pay Online
                      </button>
                    )}
                    <button
                      onClick={() => cancelAppointments(item._id)}
                      className={`border text-gray-700 px-8 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300 ${
                        item.cancelled
                          ? "btn-disabled  text-red-500"
                          : "btn-active"
                      } `}
                    >
                      {`${
                        item.cancelled
                          ? "Appointment Cancelled"
                          : "Cancel Appointments"
                      }`}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  );
}

export default MyApointment;
