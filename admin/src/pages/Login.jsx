import { useContext, useState } from "react";
import axiosInstance from "../utility/axiosInstant";
import { AdminContext } from "../context/AdminContext";
import toast, { Toaster } from "react-hot-toast";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [state, setState] = useState("Admin");
  const { setAtoken } = useContext(AdminContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Admin") {
        const response = await axiosInstance.post("/api/admin/login", {
          email,
          password,
        });
        console.log(response);

        if (response.status === 200) {
          console.log(response.data.token);
          setAtoken(response.data.token);
          if (response.data.success) {
            localStorage.setItem("atoken", response.data.token);
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
        }
      } else {
        toast.error("Something went Wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-7 h-screen flex flex-col justify-between ">
      <div>
        <h1 className="text-green-500 text-2xl text-center mb-5">
          {state} <span className="text-gray-800">Login</span>
        </h1>
        <form onSubmit={(e) => submitHandler(e)} className=" flex flex-col">
          <h3 className="text-xl">Whats your Email</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-2 rounded-sm px-4 py-2 text-lg mt-1"
            placeholder="email@example.com"
            required
          />
          <h3 className="text-xl mt-4">Enter the Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPasword(e.target.value)}
            className="w-full border-2 rounded-sm px-4 py-2 text-lg mt-1"
            placeholder="password"
            required
          />
          <button
            type="submit"
            className="px-6 py-3 mt-4 bg-blue-500 text-white text-xl rounded-sm mb-2"
          >
            Login
          </button>
          <div>
            {state === "Admin" ? (
              <p>
                Doctor Login ?{" "}
                <span
                  className="text-blue-600 cursor-pointer underline"
                  onClick={() => setState("Doctor")}
                >
                  click here
                </span>
              </p>
            ) : (
              <p>
                Admin Login ?{" "}
                <span
                  className="text-blue-600 cursor-pointer underline"
                  onClick={() => setState("Admin")}
                >
                  click here
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
