import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/C0ntext";
import axiosInstance from "../utility/axiosInstant";
import toast from "react-hot-toast";

function MyProfile() {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  const { userData, loadUserProfileData, setUserData, token } =
    useContext(AppContext);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData?.name);
      formData.append("email", userData?.email);
      formData.append("phone", userData?.phone);
      formData.append("line1", userData?.address?.line1 || "");
      formData.append("line2", userData?.address?.line2 || "");
      formData.append("gender", userData?.gender);
      formData.append("dob", userData?.dob);
      if (image) {
        formData.append("image", image);
      }
      console.log(formData);

      const { data } = await axiosInstance.put(
        "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Profile updated successfully");
        await loadUserProfileData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadUserProfileData();
  }, []); // Dependency array is empty to avoid infinite calls

  return (
    userData && (
      <div className="max-w-lg flex flex-col gap-2 text-md mt-24">
        {isEdit ? (
          <label htmlFor="image">
            <div className="inline-block">
              <img
                className="w-20"
                src={image ? URL.createObjectURL(image) : userData?.image}
                alt="Profile"
              />
            </div>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img
            className="w-36 rounded-full"
            src={userData?.image}
            alt="Profile"
          />
        )}

        {isEdit ? (
          <input
            value={userData?.name || ""}
            className="border bg-gray-50 text-2xl font-medium max-w-60 mt-4"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p className="font-medium text-3xl">{userData?.name}</p>
        )}

        <hr />

        <div className="text-neutral-500 underline mt-3">
          CONTACT INFORMATION
        </div>
        <div>
          <p className="font-medium">Email Id:</p>
          <p className="text-blue-500">{userData?.email}</p>

          <p>Phone:</p>
          {isEdit ? (
            <input
              value={userData?.phone || ""}
              className="border bg-gray-50 text-2xl font-medium max-w-60 mt-4"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className="font-medium text-blue-400">{userData?.phone}</p>
          )}

          <p>Address:</p>
          {isEdit ? (
            <div>
              <input
                className="border bg-gray-50 text-xl font-medium max-w-60 mt-4"
                type="text"
                placeholder="Line 1"
                value={userData?.address?.line1 || ""}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...(prev.address || {}), line1: e.target.value },
                  }))
                }
              />
              <br />
              <input
                className="border bg-gray-50 text-xl font-medium max-w-60 mt-4"
                type="text"
                placeholder="Line 2"
                value={userData?.address?.line2 || ""}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...(prev.address || {}), line2: e.target.value },
                  }))
                }
              />
            </div>
          ) : (
            <p>
              {userData?.address?.line1} <br />
              {userData?.address?.line2}
            </p>
          )}

          <p className="text-neutral-500 underline mt-3">Basic Information</p>
          <p>Gender:</p>
          <div>
            {isEdit ? (
              <select
                className="max-w-20 bg-gray-100"
                value={userData?.gender || ""}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p className="text-gray-400">{userData?.gender}</p>
            )}
          </div>

          <p className="font-medium">Date Of Birth:</p>
          {isEdit ? (
            <input
              className="border bg-gray-50 text-xl font-medium max-w-60 mt-4"
              value={userData?.dob || ""}
              type="date"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
            />
          ) : (
            <p className="text-gray-400">{userData?.dob}</p>
          )}
        </div>

        {isEdit ? (
          <button
            type="submit"
            className="px-8 py-2 bg-primary hover:bg-blue-700 text-white mt-10 rounded-md transition-all duration-300"
            onClick={updateUserProfileData}
          >
            Save Information
          </button>
        ) : (
          <button
            className="px-8 py-2 bg-red-300 hover:bg-red-400 text-white mt-10 rounded-md transition-all duration-300"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    )
  );
}

export default MyProfile;
