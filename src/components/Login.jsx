import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../../AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export const Login = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    console.log(data)
    try {
      const response = await axios.post(
        "https://backend-workasana-livid.vercel.app/user/login",
        data,
        { 
            headers: { 
                "Content-Type": "application/json" 
            } 
        }
      );
      if (response.status === 201 || response.status === 200) {
        reset();
        login(response.data.token);
        toast.success("Logged-In Successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Error Logging-In"
      toast.error(errorMsg);
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-black flex items-center justify-center px-5">
      <div className="absolute inset-0 bg-linear-to-r from-pink-600 via-purple-600 to-indigo-600 rounded-xl blur-3xl opacity-75 transition-opacity duration-200 hover:opacity-100">
        {" "}
      </div>

      <section className="relative w-full max-w-md mx-auto my-20 px-5 flex flex-col border-2 border-gray-700 rounded-xl bg-black bg-opacity-90 text-gray-100 shadow-lg">
        <img
          src="/Untitled design.png"
          alt="app-img"
          className="w-36 max-w-full self-center mb-4"
        />
        <h1 className="text-2xl font-semibold mb-2 text-center">
          Login to Workasana
        </h1>
        <p className="text-gray-400 text-lg mb-6 text-center">
          Please enter your details
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="py-2">
          <div className="text-left px-6 mb-5">
            <label>Username</label>
            <br />
            <input
              className="border-2 border-gray-600 bg-gray-900 p-2 w-full rounded-md focus:border-pink-600 focus:ring focus:ring-pink-600 focus:ring-opacity-50 outline-none transition"
              {...register("username", { required: true, minLength: 5 })}
              id="username"
              type="text"
              name="username"
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-500 mt-1">Username is required</p>
            )}
          </div>
          <div className="text-left px-6 mb-5 relative">
            <label>Password</label>
            <br />
            <input
              className="border-2 border-gray-600 bg-gray-900 p-2 w-full rounded-md focus:border-pink-600 focus:ring focus:ring-pink-600 focus:ring-opacity-50 outline-none transition"
              {...register("password", { required: true, minLength: 5 })}
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-8 -right-2 text-gray-400 hover:text-pink-600 transition"
            >
              {showPassword ? (
                <FaEye className="w-6 h-6" />
              ) : (
                <FaEyeSlash className="w-6 h-6" />
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 mt-1">Password is required</p>
            )}
          </div>
          <div className="text-center mt-8">
            <input
              className="cursor-pointer py-2 px-5 rounded-md border-2 border-blue-600 text-blue-600 font-semibold transition-colors hover:bg-blue-600 hover:text-white disabled:opacity-50"
              type="submit"
              disabled={isSubmitting}
              value={isSubmitting ? "Logging In..." : "Login"}
            />
          </div>
        </form>

        <div className="mb-5 text-center mt-6">
          <Link
            className="cursor-pointer px-5 py-2 text-pink-600 hover:font-semibold hover:underline"
            to={"/signup"}
          >
            New User? Register
          </Link>
        </div>
      </section>
    </div>
  );
};
