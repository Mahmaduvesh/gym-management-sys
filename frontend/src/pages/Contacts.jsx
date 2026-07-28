import { useEffect, useMemo, useState } from "react";
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
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/contacts`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch contacts");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setContacts(data);
        } else {
          setContacts([]);
        }
      })
      .catch(() => toast.error("Failed to load contacts"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    let data = [...contacts];

    if (search.trim()) {
      data = data.filter(
        (c) =>
          c.name?.toLowerCase().includes(search.toLowerCase()) ||
          c.email?.toLowerCase().includes(search.toLowerCase()),
      );
    }

    switch (sortBy) {
      case "newest":
        data.sort(
          (a, b) =>
            new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date),
        );
        break;

      case "oldest":
        data.sort(
          (a, b) =>
            new Date(a.createdAt || a.date) - new Date(b.createdAt || b.date),
        );
        break;

      case "az":
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "za":
        data.sort((a, b) => b.name.localeCompare(a.name));
        break;

      default:
        break;
    }

    return data;
  }, [contacts, search, sortBy]);

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/api/contacts/${id}`, {
        method: "DELETE",
      });

      setContacts((prev) => prev.filter((c) => c.id !== id));

      toast.success("Contact deleted successfully");
      setDeleteId(null);
    } catch {
      toast.error("Failed to delete contact");
    }
  };

  const exportCSV = () => {
    const csv = [
      ["Name", "Email", "Phone", "Message", "Date"],
      ...filtered.map((c) => [
        c.name,
        c.email,
        c.contactNumber || c.phone || "",
        `"${c.message}"`,
        new Date(c.createdAt || c.date).toLocaleString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "contacts.csv";
    a.click();
  };

  return (
    <div className="p-6 bg-[#1E293B] min-h-screen text-white">
      <ToastContainer position="top-right" theme="dark" />

      <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold">
          Contact Messages ({filtered.length})
        </h2>

        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="bg-[#0F172A] border border-gray-700 rounded pl-10 pr-3 py-2 w-64"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#0F172A] border border-gray-700 rounded px-3 py-2"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="az">Name A-Z</option>
            <option value="za">Name Z-A</option>
          </select>

          <button
            onClick={exportCSV}
            className="bg-green-600 hover:bg-green-500 px-4 rounded flex items-center gap-2"
          >
            <FaDownload />
            Export CSV
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-400 py-20">Loading contacts...</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-xl font-semibold text-gray-300">
            No Contact Messages Found
          </h3>
          <p className="text-gray-500 mt-2">
            Try changing your search or filter.
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {filtered.map((c) => (
            <li
              key={c.id}
              className="bg-[#0F172A] border border-gray-700 rounded-xl p-5 hover:border-green-500 transition duration-300"
            >
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="text-xl font-semibold">{c.name}</h3>

                    <span className="text-sm text-gray-400">
                      {new Date(c.createdAt || c.date).toLocaleString()}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-gray-300 flex items-center gap-2">
                      <FaEnvelope className="text-blue-400" />
                      {c.email}
                    </p>

                    {(c.phone || c.contactNumber) && (
                      <p className="text-gray-300 flex items-center gap-2">
                        <FaPhone className="text-green-400" />
                        {c.phone || c.contactNumber}
                      </p>
                    )}

                    <div className="mt-4 bg-[#1E293B] rounded-lg p-4">
                      <p className="text-gray-300 whitespace-pre-wrap break-words">
                        {c.message}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex lg:flex-col gap-3 justify-end">
                  <a
                    href={`mailto:${c.email}`}
                    className="bg-blue-600 hover:bg-blue-500 p-3 rounded-lg transition"
                    title="Reply"
                  >
                    <FaEnvelope />
                  </a>

                  <button
                    onClick={() => setDeleteId(c.id)}
                    className="bg-red-600 hover:bg-red-500 p-3 rounded-lg transition"
                    title="Delete"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Delete Confirmation Modal */}

      {deleteId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-[#1E293B] border border-gray-700 rounded-xl p-6 w-[90%] max-w-md">
            <h2 className="text-xl font-bold mb-3">Delete Contact</h2>

            <p className="text-gray-400 mb-6">
              Are you sure you want to permanently delete this contact message?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="bg-gray-600 hover:bg-gray-500 px-5 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={() => handleDelete(deleteId)}
                className="bg-red-600 hover:bg-red-500 px-5 py-2 rounded-lg"
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
