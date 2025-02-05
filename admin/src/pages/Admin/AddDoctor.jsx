import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utility/axiosInstant";
import { assets } from "../../assets/assets_admin/assets";
import { AdminContext } from "../../context/AdminContext";
import toast from "react-hot-toast";

function AddDoctor() {
  const navigate = useNavigate();
  const [doc_img, setDoc_img] = useState("");
  const [name, setName] = useState("");
  const [speciality, setSpeciality] = useState("Gynecologist");
  const [degree, setDegree] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [experience, setExperience] = useState("1 Yaer");
  const [about, setAbout] = useState("");
  const [fees, setFees] = useState("");

  const { atoken } = useContext(AdminContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!doc_img) {
        toast.error("Doctor Image not selected");
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("phone", phone);
      formData.append("email", email);
      formData.append("password", password);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );
      formData.append("experience", experience);
      formData.append("about", about);
      formData.append("fees", fees);
      formData.append("image", doc_img);

      const { data } = await axiosInstance.post(
        "/api/admin/add-doctor",
        formData,
        {
          headers: { atoken },
        }
      );

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }

      setName("");
      setSpeciality("");
      setDegree("");
      setPhone("");
      setEmail("");
      setPassword("");
      setAddress1("");
      setExperience("");
      setAbout("");
      setFees("");
      setDoc_img("");
      setAddress2("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between bg-gray-100 w-full">
      <div>
        <form onSubmit={submitHandler} className="flex flex-col text-nowrap ">
          <h3 className="text-xl">Doctor&apos;s Information</h3>
          <div className="flex gap-2 items-center">
            <label className="text-2xl" htmlFor="doc_img">
              <img
                className="w-12 rounded-full"
                src={
                  doc_img ? URL.createObjectURL(doc_img) : assets.upload_area
                }
                alt=""
              />
            </label>
            <input
              onChange={(e) => setDoc_img(e.target.files[0])}
              hidden
              id="doc_img"
              type="file"
            />
            <p>
              upload doctor <br /> image
            </p>
          </div>

          <div className="flex gap-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border-2 w-full  rounded-sm px-4 py-2 text-lg mt-1"
              placeholder="Name"
            />
            <select
              onChange={(e) => setSpeciality(e.target.value)}
              value={speciality}
              className="border-2 w-full  rounded-sm px-4 py-2 text-lg mt-1"
            >
              <option value="">Select speciality</option>
              <option value="">General physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-2 w-full rounded-sm px-4 py-2 text-lg mt-1"
              placeholder="Email"
            />
            <input
              type="text"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              required
              className="border-2 w-full rounded-sm px-4 py-2 text-lg mt-1"
              placeholder="education"
            />
          </div>
          <div className="flex gap-2">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-2 w-full rounded-sm px-4 py-2 text-lg mt-1"
              placeholder="Password"
            />
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="border-2 w-full rounded-sm px-4 py-2 text-lg mt-1"
              placeholder="Phone"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
              className="border-2 w-full rounded-sm px-4 py-2 text-lg mt-1"
            >
              <option value="">Select Experience</option>
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={`${i + 1} year`}>
                  {i + 1} year
                </option>
              ))}
            </select>

            <input
              type="text"
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              required
              className="border-2 w-full rounded-sm px-4 py-2 text-lg mt-1"
              placeholder="Address 1"
            />
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              required
              className="border-2 w-full rounded-sm px-4 py-2 text-lg mt-1"
              placeholder="Fees"
            />
            <input
              type="text"
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              required
              className="border-2 w-full rounded-sm px-4 py-2 text-lg mt-1"
              placeholder="Address 2"
            />
          </div>

          <div className="flex gap-2">
            <textarea
              type="text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              required
              className="border-2 w-full rounded-sm px-4 py-2 text-lg mt-1"
              placeholder="About"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 mt-4 bg-black text-white text-xl rounded-sm mb-2"
          >
            Add Now
          </button>
        </form>
      </div>
    </div>
  );
}

export { AddDoctor };
