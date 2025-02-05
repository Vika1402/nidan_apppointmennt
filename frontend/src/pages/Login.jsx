import React, { useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaFontAwesomeLogoFull } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { AppContext } from "../context/C0ntext";
import axiosInstance from "../utility/axiosInstant";
import toast from "react-hot-toast";

function Login() {
  const [state, setState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const { token, setToken } = useContext(AppContext);
  const onSubmitHandler = async (e) => {
    event.preventDefault();
    //console.log(e.target.value);
    try {
      if (state === "Sign Up") {
        const { data } = await axiosInstance.post("/api/user/register", {
          email,
          password,
          name,
        });
        console.log(data);

        if (data.success) {
          toast.success(data.message);
          localStorage.setItem("token", data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const userData = {
          email,
          password,
        };

        const { data } = await axiosInstance.post("/api/user/login", userData);
        if (data.success) {
          toast.success(data.message);
          localStorage.setItem("token", data.token);
          setToken(data.token); // Update state to trigger re-render
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };

  function togglePasswordVisibility(e) {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  }

  return (
    <div>
      <div className="flex justify-center mt-32">
        <div className="text-xl">
          <p className="px-8 text-gray-700">
            {state === "Sign Up" ? "Create Acount" : "Login"}
          </p>
          <p className="px-8 text-gray-600">
            Please {state === "Sign Up" ? "sign up" : "sign in"} to book an
            Appointment
          </p>
          <form
            onSubmit={onSubmitHandler}
            className="flex flex-col items-start text-lg w-full p-8 gap-4 shadow-xl rounded-lg"
            action=""
          >
            {state === "Sign Up" && (
              <div>
                <label htmlFor="fullName">Full Name</label>
                <br />
                <input
                  onChange={(e) => setName(e.target.value)}
                  className="px-16 py-3 rounded-md text-lg border text-start"
                  id="fullName"
                  type="text"
                  placeholder="Enter Full Name"
                />
              </div>
            )}

            <div>
              <label htmlFor="email">Email</label>
              <br />
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="px-16 border py-3 rounded-md text-lg"
                id="email"
                value={email}
                type="text"
                placeholder="Enter Email"
              />
            </div>
            <div>
              <label className="flex items-center gap-3" htmlFor="password">
                Password
                <button onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </label>
              <br />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="px-16 border py-3 rounded-md text-lg"
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
              />
            </div>

            <div className="w-full flex items-center justify-center">
              <button className="px-12 py-2 bg-primary text-white rounded-md">
                {state === "Sign Up" ? "Create Account" : "Login"}
              </button>
            </div>
            <p>
              Already Have an Account?{" "}
              {state === "Sign Up" ? (
                <p>
                  Alredy have an account?{" "}
                  <span onClick={() => setState("Login")}>
                    {" "}
                    <Link className="text-primary cursor-pointer" href="#">
                      Login here
                    </Link>
                  </span>
                </p>
              ) : (
                <p>
                  Create an account?{" "}
                  <span onClick={() => setState("Sign Up")}>
                    {" "}
                    <Link className="text-primary cursor-pointer" href="#">
                      Click Here
                    </Link>
                  </span>
                </p>
              )}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
