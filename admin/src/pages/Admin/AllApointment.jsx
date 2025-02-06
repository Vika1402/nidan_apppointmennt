import { useContext, useEffect } from "react";
import axiosInstance from "../../utility/axiosInstant";
import { AdminContext } from "../../context/AdminContext";

function AllAppointment() {
  const { atoken, appointments, setAppointments } = useContext(AdminContext);

  const allAppointments = async () => {
    const { data } = await axiosInstance.post(
      "/api/admin/get-appointment",
      {},
      {
        headers: { atoken },
      }
    );

    if (data.success) {
      setAppointments(data.appointments);
      console.log(data);
    } else {
      console.log(data.message);
    }
  };

  useEffect(() => {
    allAppointments();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
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
                  <div className="flex flex-col items-start">
                    <img
                      className="w-14 h-14 rounded-full mb-2 border border-gray-300 shadow"
                      src={item.userData.image}
                      alt="Patient"
                    />
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
                </td>

       
                <td className="p-3">
                  <div className="flex flex-col items-start">
                    <img
                      className="w-14 h-14 rounded-full mb-2 border border-gray-300 shadow"
                      src={item.docData.image}
                      alt="Doctor"
                    />
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
                </td>

                {/* Slot and Payment */}
                <td className="p-3">
                  {item.slotTime || "N/A"}
                  <br />
                  {item.slotDate || "N/A"}
                </td>

                <td className="p-3">{item.paymentStatus || "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllAppointment;
