import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/COntext";
import { useParams } from "react-router";
import { assets } from "../assets/assets/assets";
import SimilarSeciality from "../components/SimilarSeciality";

function Apointmet() {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docSlot, setdocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const daysOOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const fetchDocInfo = async () => {
    const docInfo = await doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };
  const getAvailableSlots = async () => {
    setdocSlot([]); // Clear previous slots
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      // Get the current date for the loop index
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // Set the end time of the day (9:00 PM)
      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      // Set the start time for the slots
      if (i === 0) {
        // For the current day, start after the current hour or at 10:00 AM
        currentDate.setHours(
          currentDate.getHours() >= 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        // For future days, start at 10:00 AM
        currentDate.setHours(10, 0, 0, 0);
      }

      const timeSlots = [];
      while (currentDate < endTime) {
        const formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // Push time slots
        timeSlots.push({
          dateTime: new Date(currentDate), // Exact DateTime
          time: formattedTime, // Formatted Time
        });

        // Increment time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      // Add the time slots for the day
      setdocSlot((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    console.log(docSlot);
  }, [docSlot]);
  return (
    docInfo && (
      <div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt=""
            />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-900">
              <p>
                {docInfo.degree}-{docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>

            <div>
              <p className="flex items-center gap-1 text-sm text-gray-900 font-medium">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-900 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>

            <p className="mt-4 text-gray-500 font-medium">
              Appointmet Fees: {docInfo.fees}{" "}
              <span className="text-gray-600">{currencySymbol}</span>
            </p>
          </div>
        </div>

        {/* booking slotes  */}

        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking slotes</p>
          <div className="flex gap-3 items-center w-full overscroll-scroll flex-wrap">
            {docSlot.length &&
              docSlot.map((item, index) => {
                return (
                  <div
                    onClick={() => setSlotIndex(index)}
                    className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                      slotIndex === index
                        ? "bg-primary text-white"
                        : "border border-gray-200"
                    }`}
                    key={index}
                  >
                    <p>{item[0] && daysOOfWeek[item[0].dateTime.getDay()]}</p>
                    <p>{item[0] && item[0].dateTime.getDate()}</p>
                  </div>
                );
              })}
          </div>
          <div className="flex items-center gap-3 w-full overflow-x-scroll">
            {docSlot.length &&
              docSlot[slotIndex].map((i, index) => {
                return (
                  <>
                    <p
                      onClick={() => {
                        setSlotTime(i.time);
                      }}
                      className={`text-sm font-light mt-4 flex-shrink-0 px-5 py-2 rounded-full cursor-pointer  ${
                        i.time === slotTime
                          ? "bg-primary text-white"
                          : "text-gray-400 border order-gray-300"
                      }`}
                      key={index}
                    >
                      {" "}
                      {i.time.toLowerCase()}
                    </p>
                  </>
                );
              })}
          </div>

          <button className="bg-primary text-white text-sm font-light py-3 rounded-full px-12 mt-4">
            Book and Appointment
          </button>
        </div>

        <SimilarSeciality speciality={docInfo.speciality} />
      </div>
    )
  );
}

export default Apointmet;
