// ✅ AddUserModal.jsx
import { useState } from "react";
import { toast } from "react-toastify";
import API_URL from "../utils/api";

export default function AddUserModal({ onClose, onUserAdded }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("${API_URL}/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to add user");
      toast.success("User added successfully");
      onUserAdded();
      onClose();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1E293B] p-6 rounded-xl border border-gray-700 w-full max-w-md text-white"
      >
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>

        <label className="block mb-3">
          <span>Name</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="mt-1 w-full bg-[#0F172A] border border-gray-600 p-2 rounded"
          />
        </label>

        <label className="block mb-3">
          <span>Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="mt-1 w-full bg-[#0F172A] border border-gray-600 p-2 rounded"
          />
        </label>

        <label className="block mb-4">
          <span>Phone</span>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="mt-1 w-full bg-[#0F172A] border border-gray-600 p-2 rounded"
          />
        </label>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500"
          >
            {loading ? "Saving..." : "Add User"}
          </button>
        </div>
      </form>
    </div>
  );
}
