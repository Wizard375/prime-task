import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

export default function Sidebar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, logout",
    });

    if (result.isConfirmed) {
      logout();
      navigate("/");

      Swal.fire({
        icon: "success",
        title: "Logged out",
        timer: 1200,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="w-64 min-h-screen bg-sidebar border-r border-gray-300 relative">
      <div className="p-6 font-bold text-lg">TASK MANAGER</div>

      <div className="px-4 space-y-2">
        <NavLink
          to="/dashboard"
          className="block px-4 py-2 rounded hover:bg-yellow-400 hover:text-white"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/tasks"
          className="block px-4 py-2 rounded hover:bg-yellow-400 hover:text-white"
        >
          Tasks
        </NavLink>

        <NavLink
          to="/profile"
          className="block px-4 py-2 rounded hover:bg-yellow-400 hover:text-white"
        >
          Profile
        </NavLink>
      </div>

      <button
        onClick={handleLogout}
        className="absolute bottom-6 left-6 text-white bg-red-700 rounded px-4 py-2"
      >
        Logout
      </button>
    </div>
  );
}
