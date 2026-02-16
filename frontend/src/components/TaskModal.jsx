import { useForm } from "react-hook-form";
import API from "../services/api";

export default function TaskModal({ close, refresh }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    await API.post("/tasks", data);
    refresh();
    close();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="font-semibold mb-4">Add Task</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <input
            {...register("title")}
            placeholder="Title"
            className="w-full border p-2 rounded"
          />

          <input
            {...register("description")}
            placeholder="Description"
            className="w-full border p-2 rounded"
          />

          <select {...register("status")} className="w-full border p-2 rounded">
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <button className="w-full bg-yellow-500 text-white py-2 rounded">
            Save
          </button>
        </form>

        <button onClick={close} className="text-sm text-gray-500 mt-3">
          Cancel
        </button>
      </div>
    </div>
  );
}
