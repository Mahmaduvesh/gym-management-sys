import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

export default function EditUserModal({ user, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email) {
      return alert("Name and email are required.");
    }
    onSave(formData); // Parent handles API
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#1E293B] text-white rounded-lg w-full max-w-md p-6 relative border border-gray-600 shadow-xl">
        <button
          className="absolute top-3 right-3 text-white hover:text-red-400"
          onClick={onClose}
        >
          <FaTimes size={18} />
        </button>

        <h2 className="text-xl font-bold mb-4">
          {user ? "Edit User" : "Add User"}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-[#0F172A] border border-gray-700 text-white"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-[#0F172A] border border-gray-700 text-white"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded bg-[#0F172A] border border-gray-700 text-white"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-500"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
            onClick={handleSubmit}
          >
            {user ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
