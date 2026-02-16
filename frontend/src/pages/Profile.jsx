import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import API from "../services/api";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get("/auth/profile").then((res) => setUser(res.data));
  }, []);

  if (!user) return null;

  return (
    <DashboardLayout>
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="font-semibold text-lg mb-4">Profile</h2>

        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Joined:</strong> {new Date(user.createdAt).toDateString()}
        </p>
      </div>
    </DashboardLayout>
  );
}
