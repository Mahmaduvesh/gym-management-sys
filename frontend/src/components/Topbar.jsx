import { FiMenu, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Topbar({ setSidebarOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    navigate("/admin-auth"); // Redirect to login
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-md px-6 flex items-center justify-between border-b dark:border-gray-700">
      <div className="flex items-center gap-4">
        <button
          className="text-2xl text-blue-600 dark:text-blue-400 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <FiMenu />
        </button>
        <h2 className="text-lg font-semibold">Admin Dashboard</h2>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="hidden md:block px-3 py-1 rounded bg-gray-100 dark:bg-gray-700 text-sm focus:outline-none"
        />
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          <FiLogOut />
          <span className="hidden sm:inline-block">Logout</span>
        </button>
      </div>
    </header>
  );
}
