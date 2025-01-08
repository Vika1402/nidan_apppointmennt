import React, { useState } from "react";
import { assets } from "../assets/assets/assets";

function MyProfile() {
  const [userDate, setUserData] = useState({
    name: "vikas sinha",
    image: assets.profile_pic,
    email: "NideanDental@gmail.com",
    phone: "999999999",
    Address: {
      line1: "br chowk semra ewst 2233",
      line2: "Circle hope sectors",
    },
    gender: "Male",
    dob: "14-2-2000",
  });
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="max-w-lg flex flex-col gap-2 text-md">
      <img className="w-36 rounded-full" src={userDate.image} alt="" />

      {isEdit ? (
        <input
          value={userDate.name}
          className="border bg-gray-50 text-2xl font-medium max-w-60 mt-4"
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className="font-medium text-3xl">{userDate.name}</p>
      )}

      <hr />

      <div className="text-neutral-500 underline mt-3">CONTACT INFORMATION</div>
      <div>
        <p className="fomt-medium">Email Id:</p>
        <p className="text-blue-500">{userDate.email}</p>
        <p>Phone :</p>
        {isEdit ? (
          <input
            value={userDate.phone}
            className="border bg-gray-50 text-2xl font-medium max-w-60 mt-4"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, phone: e.target.value }))
            }
          />
        ) : (
          <p className="font-medium text-blue-400">{userDate.phone}</p>
        )}

        <p>Address :</p>
        {isEdit ? (
          <p>
            <input
              className="border bg-gray-50 text-2xl font-medium max-w-60 mt-4"
              type="text"
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  Address: { ...prev.Address.line1 },
                }))
              }
            />
            <br />
            <input
              className="border bg-gray-50 text-2xl font-medium max-w-60 mt-4"
              type="text"
              onChange={(e) =>
                setUserData((prev) => ({
                  ...prev,
                  Address: { ...prev.Address.line1 },
                }))
              }
            />
          </p>
        ) : (
          <p>
            {userDate.Address.line1} <br />
            {userDate.Address.line2}
          </p>
        )}

        <p className="text-neutral-500 underline mt-3">Basic Information</p>
        <p>Gender</p>
        <div>
          {isEdit ? (
            <select
              className="max-w-20 bg-gray-100"
              value={userDate.gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p className="text-gray-400">{userDate.gender}</p>
          )}
        </div>

        <p className="font-medium">Date Of Birth</p>
        {isEdit ? (
          <input
            className="border bg-gray-50 text-xl font-medium max-w-60 mt-4"
            value={userDate.dob}
            type="date"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, dob: e.target.value }))
            }
          />
        ) : (
          <p className="text-gray-400 ">{userDate.dob}</p>
        )}
      </div>

      {isEdit ? (
        <button
          className="px-8 py-2 bg-primary hover:bg-blue-700 text-white mt-10 rounded-md transition-all duration-300"
          onClick={() => setIsEdit(false)}
        >
          Save Information
        </button>
      ) : (
        <button
          className="px-8 py-2 bg-red-300  hover:bg-red-400 text-white mt-10 rounded-md transition-all duration-300"
          onClick={() => setIsEdit(true)}
        >
          Edit
        </button>
      )}
    </div>
  );
}

export default MyProfile;
