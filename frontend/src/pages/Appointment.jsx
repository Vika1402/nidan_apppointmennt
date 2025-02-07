import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { AppContext } from "../context/C0ntext";
import axiosInstance from "../utility/axiosInstant";
import SimilarSeciality from "../components/SimilarSeciality";
import { assets } from "../assets/assets/assets";

function Appointment() {
  const { docId } = useParams();
  const { doctors, currencySymbol, token, getDoctorsList } =
    useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState({ dateIndex: 0, time: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (doctors.length) {
      const doctor = doctors.find((doc) => doc._id === docId);
      setDocInfo(doctor);
    }
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) generateAvailableSlots();
  }, [docInfo]);

  const generateAvailableSlots = () => {
    const today = new Date();
    let slots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      currentDate.setHours(
        i === 0 ? Math.max(10, today.getHours() + 1) : 10,
        0,
        0,
        0
      );

      let endTime = new Date(currentDate);
      endTime.setHours(24, 0, 0, 0);

      let dailySlots = [];
      while (currentDate < endTime) {
        const slotDate = `${currentDate.getDate()}_${
          currentDate.getMonth() + 1
        }_${currentDate.getFullYear()}`;

        const slotTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        if (
          !docInfo.bookedSlots ||
          !docInfo.bookedSlots.some(
            (slot) => slot.date === slotDate && slot.time === slotTime
          )
        ) {
          dailySlots.push({
            dateTime: new Date(currentDate),
            time: slotTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      slots.push(dailySlots);
    }
    setDocSlots(slots);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.error("Login required to book an appointment");
      return navigate("/login");
    }

    try {
      const selectedSlotData = docSlots[selectedSlot.dateIndex]?.find(
        (slot) => slot.time === selectedSlot.time
      );

      if (!selectedSlotData) {
        return toast.error("Invalid slot selection.");
      }

      const { dateTime } = selectedSlotData;

      // Ensure correct "DD/MM/YYYY" format for backend
      const slotDate = `${dateTime.getDate()}/${
        dateTime.getMonth() + 1
      }/${dateTime.getFullYear()}`;

      const { data } = await axiosInstance.post(
        "/api/user/appointment",
        { docId, slotDate, slotTime: selectedSlot.time },
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Appointment booked successfully!");
        navigate("/myappointment");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Slot Not Available. Please choose another date and time.");
    }
  };

  return (
    docInfo && (
      <div className="mt-32">
        <div className="flex flex-col sm:flex-row gap-4">
          <img
            className="bg-primary w-full sm:max-w-72  sm:max-h-72 rounded-lg object-cover object-center"
            src={docInfo.image}
            alt=""
          />
          <div className="flex-1 border border-gray-400 rounded-lg p-8 bg-white">
            <p className="text-2xl font-medium flex items-center gap-2 text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="Verified" />
            </p>
            <p className="text-sm text-gray-900 mt-1">
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <p className="text-sm text-gray-900 max-w-[700px] mt-1">
              {docInfo.about}
            </p>
            <p className="mt-4 text-gray-500 font-medium">
              Appointment Fees: {docInfo.fees} {currencySymbol}
            </p>
          </div>
        </div>

        {/* Booking Slots */}
        <div className="sm:ml-72 sm:pl-4 mt-4 text-gray-700">
          <p className="font-medium">Booking Slots</p>
          <div className="flex gap-3 flex-wrap">
            {docSlots.map((item, index) => (
              <div
                key={index}
                onClick={() =>
                  setSelectedSlot({ ...selectedSlot, dateIndex: index })
                }
                className={`text-center py-6 w-16 rounded-full cursor-pointer ${
                  selectedSlot.dateIndex === index
                    ? "bg-primary text-white"
                    : "border border-gray-200"
                }`}
              >
                <p>
                  {item[0] &&
                    new Date(item[0].dateTime).toLocaleDateString("en", {
                      weekday: "short",
                    })}
                </p>
                <p>{item[0] && new Date(item[0].dateTime).getDate()}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-4 overflow-x-auto">
            {docSlots[selectedSlot.dateIndex]
              ?.filter((slot) => {
                const hour = parseInt(slot.time.split(":")[0], 10);
                return hour >= 9 && hour < 17;
              })
              .map((slot, index) => {
                // Convert "HH:mm" time to AM/PM format
                const [hours, minutes] = slot.time.split(":");
                const formattedTime = new Date(
                  2000,
                  0,
                  1,
                  hours,
                  minutes
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                });

                return (
                  <p
                    key={index}
                    onClick={() =>
                      setSelectedSlot({ ...selectedSlot, time: slot.time })
                    }
                    className={`text-sm px-5 py-2 rounded-full cursor-pointer ${
                      selectedSlot.time === slot.time
                        ? "bg-primary text-white"
                        : "text-gray-400 border border-gray-300"
                    }`}
                  >
                    {formattedTime}
                  </p>
                );
              })}
          </div>

          <button
            onClick={bookAppointment}
            className="bg-primary text-white text-sm py-3 rounded-full px-12 mt-4"
          >
            Book Appointment
          </button>
        </div>

        <SimilarSeciality speciality={docInfo.speciality} />
      </div>
    )
  );
}

export default Appointment;
