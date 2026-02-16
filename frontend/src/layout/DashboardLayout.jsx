import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
