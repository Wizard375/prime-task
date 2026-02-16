export default function Topbar() {
  return (
    <div className="flex justify-between items-center bg-white px-6 py-4 border-b">
      <h2 className="font-semibold text-lg">Dashboard</h2>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>
    </div>
  );
}
