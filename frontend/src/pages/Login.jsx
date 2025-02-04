import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

function Login() {
  const [state, setState] = useState("Sign Up");
  const [emial, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = (e) => {
    event.preventDefault();
    console.log(e.target);
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
