import { useEffect, useState } from "react";
import {
  FaTrashAlt,
  FaSearch,
  FaEnvelope,
  FaDownload,
  FaPhone,
  FaEdit,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditUserModal from "./EditUserModal";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  import API_URL from "../utils/api";

  const fetchUsers = () => {
    setLoading(true);
    fetch("${API_URL}/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setFiltered(data);
      })
      .catch(() => toast.error("Failed to load users"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    const val = e.target.value.toLowerCase();
    setSearch(val);
    const result = users.filter(
      (u) =>
        u.name?.toLowerCase().includes(val) ||
        u.email?.toLowerCase().includes(val)
    );
    setFiltered(result);
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    fetch(`${API_URL}/api/users/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        toast.success("User deleted");
        setDeleteId(null);
        fetchUsers();
      })
      .catch(() => toast.error("Failed to delete user"));
  };

  const handleSave = (formData) => {
    const url = `${API_URL}/api/users/${editUser.id}`;
    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(() => {
        toast.success("User updated successfully");
        setEditUser(null);
        fetchUsers();
      })
      .catch(() => toast.error("Failed to update user"));
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
    const sorted = [...filtered].sort((a, b) => {
      if (!a[field] || !b[field]) return 0;
      return order === "asc"
        ? a[field].localeCompare(b[field])
        : b[field].localeCompare(a[field]);
    });
    setFiltered(sorted);
  };

  const paginatedData = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const exportCSV = () => {
    const csv = [
      ["Name", "Email", "Phone", "Date"],
      ...users.map((u) => [
        u.name,
        u.email,
        u.phone || "",
        u.createdAt
          ? new Date(u.createdAt).toLocaleDateString()
          : new Date().toLocaleDateString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "users.csv";
    a.click();
  };

  return (
    <div className="p-6 bg-[#1E293B] min-h-screen text-white">
      <ToastContainer position="top-right" theme="dark" />

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Registered Users</h2>
        <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
          <div className="relative">
            <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search name or email"
              className="bg-[#0F172A] border border-gray-700 rounded pl-10 py-2 text-white w-64"
            />
          </div>
          <button
            onClick={exportCSV}
            className="bg-green-600 px-3 py-2 rounded hover:bg-green-500 flex items-center gap-1"
          >
            <FaDownload /> Export CSV
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading users...</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-400">No users found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-[#0F172A] border border-gray-700 text-sm">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th
                  className="p-3 text-left cursor-pointer"
                  onClick={() => handleSort("name")}
                >
                  Name
                </th>
                <th
                  className="p-3 text-left cursor-pointer"
                  onClick={() => handleSort("email")}
                >
                  Email
                </th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Registered</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((u) => (
                <tr key={u.id} className="border-t border-gray-700">
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.phone || "-"}</td>
                  <td className="p-3">
                    {u.createdAt
                      ? new Date(u.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-3">
                      <a
                        href={`mailto:${u.email}`}
                        title="Email"
                        className="text-blue-400 hover:text-blue-600"
                      >
                        <FaEnvelope />
                      </a>
                      <button
                        onClick={() => setEditUser(u)}
                        title="Edit"
                        className="text-yellow-400 hover:text-yellow-500"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => setDeleteId(u.id)}
                        title="Delete"
                        className="text-red-400 hover:text-red-600"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setCurrentPage(num)}
                className={`px-3 py-1 rounded ${
                  currentPage === num
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      )}

      {editUser && (
        <EditUserModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onSave={handleSave}
        />
      )}

      {deleteId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1E293B] border border-gray-700 p-6 rounded-lg w-11/12 max-w-md shadow-xl text-white">
            <h3 className="text-xl font-semibold mb-3">Confirm Deletion</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete this user?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-500"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-500"
                onClick={() => handleDelete(deleteId)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
