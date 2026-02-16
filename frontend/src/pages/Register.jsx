import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const schema = yup.object({
  name: yup.string().required("Full name is required"),

  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Register() {
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const res = await API.post("/auth/register", data);

      login(res.data.token);

      await Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: "Welcome to Task Manager 🚀",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/dashboard");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.response?.data?.message || "Something went wrong. Try again.",
        confirmButtonColor: "#facc15",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-linear-to-r from-yellow-400 to-yellow-600">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-center font-bold text-xl mb-6">CREATE ACCOUNT</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>

            <input
              {...register("name")}
              placeholder="Enter your name"
              className="w-full border-2 border-gray-300 p-2 rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm ms-1 mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              {...register("email")}
              placeholder="Enter your email"
              className="w-full border-2 border-gray-300 p-2 rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm ms-1 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <input
              {...register("password")}
              type="password"
              placeholder="Enter your password"
              className="w-full border-2 border-gray-300 p-2 rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-sm ms-1 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Server Error */}
          {serverError && (
            <p className="text-red-500 text-sm text-center">{serverError}</p>
          )}

          {/* Submit */}
          <button
            disabled={loading}
            className="w-full bg-yellow-500 text-white py-2 rounded font-semibold hover:bg-yellow-600 transition"
          >
            {loading ? "Creating..." : "REGISTER"}
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-yellow-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
