import { useContext, useEffect } from "react";
import axiosInstance from "../../utility/axiosInstant";
import { AdminContext } from "../../context/AdminContext";
import { MdDeleteOutline } from "react-icons/md";

function AllAppointment() {
  const { atoken, appointments, setAppointments, allAppointments } =
    useContext(AdminContext);

  useEffect(() => {
    allAppointments();
  }, []);

  const deleteAppointmenet = async (appointmentId) => {
    const { data } = await axiosInstance.post(
      "/api/admin/delete-appointment",
      { appointmentId },
      { headers: { atoken } }
    );
    console.log(data);

    if (data.success) {
      console.log("deleetd successfully", data.message);
      allAppointments();
    } else {
      console.log(data.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100  overflow-hidden overflow-y-scroll">
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
        <h1 className="text-3xl font-semibold text-gray-700 text-center mb-4">
          All Appointments
        </h1>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="border border-gray-300 p-3">Patient</th>
              <th className="border border-gray-300 p-3">Doctor</th>
              <th className="border border-gray-300 p-3">Slot</th>
              <th className="border border-gray-300 p-3">Payment</th>
            </tr>
          </thead>

          <tbody>
            {appointments?.map((item) => (
              <tr
                key={item._id}
                className="border border-gray-300  hover:bg-gray-100 transition justify-center"
              >
                <td className="p-3">
                  <div className="flex  items-start gap-4">
                    <div>
                      <img
                        className="w-14 h-14 rounded-full  border border-gray-300 shadow"
                        src={item.userData.image}
                        alt="Patient"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{item.userData.name}</p>
                      <p className="text-gray-600 text-sm">
                        {item.userData.email}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {item.userData.phone}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {item.userData.gender}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="p-3">
                  <div className="flex  items-start gap-4">
                    <div>
                      <img
                        className="w-14 h-14 rounded-full mb-2 border border-gray-300 shadow"
                        src={item.docData.image}
                        alt="Doctor"
                      />
                    </div>
                    <div>
                      {" "}
                      <p className="font-medium">{item.docData.name}</p>
                      <p className="text-gray-600 text-sm">
                        {item.docData.email}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {item.docData.phone}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {item.docData.gender}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Slot and Payment */}
                <td className="p-3">
                  {item.slotTime || "N/A"}
                  <br />
                  {item.slotDate || "N/A"}
                </td>

                <td className="p-3 flex gap-4 items-center  justify-center">
                  {" "}
                  {item.payment ? (
                    <button className="px-4 py-2 bg-green-500 rounded-lg disabled">
                      Paid
                    </button>
                  ) : (
                    <button className="bg-amber-300 px-4 py-2 rounded-lg disabled">
                      Unpaid
                    </button>
                  )}
                  {item.cancelled ? (
                    <button className="px-4 py-2 bg-red-400 rounded-lg disabled">
                      cancelled
                    </button>
                  ) : (
                    <button className="bg-amber-500 px-4 py-2 rounded-lg disabled">
                      ongoing
                    </button>
                  )}
                  <button
                    onClick={() => deleteAppointmenet(item._id)}
                    className="text-2xl text-red-600 font-bold p-2 bg-gray-200 rounded-full"
                  >
                    <MdDeleteOutline />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllAppointment;
