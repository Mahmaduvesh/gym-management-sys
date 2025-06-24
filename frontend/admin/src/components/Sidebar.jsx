import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiBookOpen,
  FiClipboard,
  FiMessageCircle,
  FiStar,
  FiPhone,
  FiX,
} from "react-icons/fi";

const links = [
  { name: "Dashboard", path: "/", icon: <FiHome /> },
  { name: "Memberships", path: "/memberships", icon: <FiUsers /> },
  { name: "Trainings", path: "/trainings", icon: <FiBookOpen /> },
  { name: "Diets", path: "/diets", icon: <FiClipboard /> },
  { name: "Feedbacks", path: "/feedbacks", icon: <FiMessageCircle /> },
  { name: "Testimonials", path: "/testimonials", icon: <FiStar /> },
  { name: "Contacts", path: "/contacts", icon: <FiPhone /> },
];

export default function Sidebar({ open, setOpen }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 shadow-md transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static flex flex-col`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-700">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            🏋️ Admin
          </span>
          <button
            className="text-sm text-blue-500 hover:text-blue-700 hidden lg:block"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? "▶️" : "◀️"}
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {links.map(({ name, path, icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700"
                }`
              }
            >
              <span className="text-xl">{icon}</span>
              {!collapsed && <span className="text-sm">{name}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="lg:hidden p-4 border-t dark:border-gray-700 mt-auto">
          <button
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => setOpen(false)}
          >
            <FiX />
            <span>Close Menu</span>
          </button>
        </div>
      </aside>
    </>
  );
}
