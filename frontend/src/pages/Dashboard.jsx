import DashboardLayout from "../layout/DashboardLayout";
import StatCard from "../components/StatCard";
import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    API.get("/tasks").then((res) => setTasks(res.data));
  }, []);

  const completed = tasks.filter((t) => t.status === "completed").length;
  const pending = tasks.filter((t) => t.status === "pending").length;

  return (
    <DashboardLayout>
      <div className="grid grid-cols-3 gap-6">
        <StatCard title="Total Tasks" value={tasks.length} />
        <StatCard title="Completed Tasks" value={completed} />
        <StatCard title="Pending Tasks" value={pending} />
      </div>
    </DashboardLayout>
  );
}
