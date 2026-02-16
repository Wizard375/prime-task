import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const schema = yup.object({
  email: yup.string().email("Enter valid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await API.post("/auth/login", data);

      login(res.data.token);

      await Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/dashboard");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.response?.data?.message || "Invalid credentials",
        confirmButtonColor: "#facc15",
      });
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-linear-to-r from-yellow-400 to-yellow-600">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-center font-bold text-xl mb-6">LOGIN</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
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

          <button className="w-full bg-yellow-500 text-white py-2 rounded font-semibold">
            SIGN IN
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
          Don’t have account?{" "}
          <Link to="/register" className="text-yellow-600 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
