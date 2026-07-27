import { useEffect, useState } from "react";
import {
  FaTrashAlt,
  FaSearch,
  FaEnvelope,
  FaDownload,
  FaPhone,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_URL from "../utils/api";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("${API_URL}/api/contacts")
      .then((res) => {
        if (!res.ok) throw new Error("403 Forbidden or Server Error");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setContacts(data);
          setFiltered(data);
        } else {
          setContacts([]);
        }
      })
      .catch(() => toast.error("Failed to load contacts"))
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    const val = e.target.value.toLowerCase();
    setSearch(val);
    setFiltered(
      contacts.filter(
        (c) =>
          c.name.toLowerCase().includes(val) ||
          c.email.toLowerCase().includes(val)
      )
    );
  };

  const handleDelete = (id) => {
    fetch(`${API_URL}/api/contacts/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updated = contacts.filter((c) => c.id !== id);
        setContacts(updated);
        setFiltered(
          updated.filter(
            (c) =>
              c.name.toLowerCase().includes(search) ||
              c.email.toLowerCase().includes(search)
          )
        );
        toast.success("Contact deleted");
        setDeleteId(null);
      })
      .catch(() => toast.error("Failed to delete contact"));
  };

  const exportCSV = () => {
    const csv = [
      ["Name", "Email", "Contact Number", "Message", "Date"],
      ...contacts.map((c) => [
        c.name,
        c.email,
        c.contactNumber || "",
        `"${c.message}"`,
        c.date,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "contacts.csv";
    a.click();
  };

  return (
    <div className="p-6 bg-[#1E293B] min-h-screen text-white">
      <ToastContainer position="top-right" theme="dark" />

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Contact Messages</h2>
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
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
        <p className="text-gray-400">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-400">No contact messages found.</p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((c) => (
            <li
              key={c.id}
              className="bg-[#0F172A] border border-gray-700 rounded-xl p-4 hover:shadow-lg transition"
            >
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">
                    {new Date(c.date).toLocaleDateString()}
                  </p>
                  <p className="text-lg font-semibold text-white mb-1">
                    {c.name}{" "}
                    <span className="text-gray-400 text-sm">({c.email})</span>
                  </p>
                  {c.contactNumber && (
                    <p className="text-sm text-gray-300 mb-1 flex items-center gap-2">
                      <FaPhone className="text-gray-400" /> {c.contactNumber}
                    </p>
                  )}
                  <p className="text-gray-300 whitespace-pre-wrap break-words">
                    {c.message}
                  </p>
                </div>
                <div className="flex gap-4 items-start sm:items-center">
                  <a
                    href={`mailto:${c.email}`}
                    title="Reply"
                    className="text-blue-400 hover:text-blue-600"
                  >
                    <FaEnvelope size={18} />
                  </a>
                  <button
                    onClick={() => setDeleteId(c.id)}
                    title="Delete"
                    className="text-red-400 hover:text-red-600"
                  >
                    <FaTrashAlt size={18} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-red bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#1E293B] border border-gray-700 p-6 rounded-lg w-11/12 max-w-md shadow-xl text-white">
            <h3 className="text-xl font-semibold mb-3">Confirm Deletion</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete this contact message?
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
