// src/layouts/AdminLayout.jsx
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dark min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <Topbar setSidebarOpen={setSidebarOpen} />
        <main className="mt-16 p-4 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
