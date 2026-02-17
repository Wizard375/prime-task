import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import API from "../services/api";
import TaskModal from "../components/TaskModal";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filtered = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()),
  );

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  return (
    <DashboardLayout>
      <div className="bg-white rounded shadow p-4">
        <div className="flex justify-between mb-4">
          <input
            placeholder="Search tasks..."
            className="border border-gray-300 px-3 py-2 rounded"
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            onClick={() => setModalOpen(true)}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            Add Task
          </button>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-center">Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((task) => (
              <tr
                key={task._id}
                className="border-t border-gray-300 text-center "
              >
                <td className="p-3">{task.title}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <TaskModal close={() => setModalOpen(false)} refresh={fetchTasks} />
      )}
    </DashboardLayout>
  );
}
