import { useEffect, useState } from "react";
import {
  FaPlus,
  FaTrashAlt,
  FaTimes,
  FaSearch,
  FaQuoteLeft,
  FaStar,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_URL from "../utils/api";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    role: "",
    text: "",
    photo: "",
    rating: 5,
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/testimonials`);

      if (!res.ok) {
        throw new Error("Unable to fetch testimonials");
      }

      const data = await res.json();

      const sorted = [...data].sort(
        (a, b) => (b.timestamp || 0) - (a.timestamp || 0),
      );

      setTestimonials(sorted);
    } catch (err) {
      toast.error("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      return toast.error("Please enter name");
    }

    if (!form.text.trim()) {
      return toast.error("Please enter testimonial");
    }

    try {
      setUploading(true);

      const payload = {
        name: form.name.trim(),
        role: form.role.trim(),
        message: form.text.trim(),
        photo: form.photo.trim(),
        rating: Number(form.rating),
      };

      const res = await fetch(`${API_URL}/api/testimonials`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unable to add testimonial");
      }

      toast.success("Testimonial added successfully");

      setForm({
        name: "",
        role: "",
        text: "",
        photo: "",
        rating: 5,
      });

      setShowForm(false);

      fetchTestimonials();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/testimonials/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error();
      }

      toast.success("Testimonial deleted");

      setDeleteId(null);

      fetchTestimonials();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const filteredTestimonials = testimonials.filter((item) => {
    const keyword = search.toLowerCase();

    return (
      item.name?.toLowerCase().includes(keyword) ||
      item.role?.toLowerCase().includes(keyword) ||
      item.text?.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="min-h-screen bg-[#0F172A] text-white p-6">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        theme="colored"
      />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Testimonials</h1>

          <p className="text-gray-400 mt-1">
            Manage customer testimonials and reviews.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-500 transition px-5 py-3 rounded-lg flex items-center gap-2 font-medium"
        >
          {showForm ? <FaTimes /> : <FaPlus />}
          {showForm ? "Close Form" : "Add Testimonial"}
        </button>
      </div>
      <div className="bg-[#1E293B] rounded-xl border border-gray-700 p-4 mb-8">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search testimonials..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#0F172A] border border-gray-700 rounded-lg py-3 pl-12 pr-4 outline-none focus:border-blue-500"
          />
        </div>
      </div>{" "}
      {showForm && (
        <form
          onSubmit={handleAdd}
          className="bg-[#1E293B] border border-gray-700 rounded-xl p-6 mb-8 space-y-5"
        >
          <h2 className="text-xl font-semibold">Add New Testimonial</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm text-gray-400 block mb-2">Name</label>

              <input
                type="text"
                placeholder="Enter customer name"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                className="w-full bg-[#0F172A] border border-gray-700 rounded-lg p-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 block mb-2">Role</label>

              <input
                type="text"
                placeholder="Member / Athlete / Trainer"
                value={form.role}
                onChange={(e) =>
                  setForm({
                    ...form,
                    role: e.target.value,
                  })
                }
                className="w-full bg-[#0F172A] border border-gray-700 rounded-lg p-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 block mb-2">Rating</label>

              <select
                value={form.rating}
                onChange={(e) =>
                  setForm({
                    ...form,
                    rating: Number(e.target.value),
                  })
                }
                className="w-full bg-[#0F172A] border border-gray-700 rounded-lg p-3 outline-none focus:border-blue-500"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>
                    {star} Star{star > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-400 block mb-2">
                Photo URL
              </label>

              <input
                type="text"
                placeholder="https://example.com/photo.jpg"
                value={form.photo}
                onChange={(e) =>
                  setForm({
                    ...form,
                    photo: e.target.value,
                  })
                }
                className="w-full bg-[#0F172A] border border-gray-700 rounded-lg p-3 outline-none focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-gray-400 block mb-2">
                Testimonial
              </label>

              <textarea
                rows={5}
                placeholder="Write customer feedback..."
                value={form.text}
                onChange={(e) =>
                  setForm({
                    ...form,
                    text: e.target.value,
                  })
                }
                className="w-full bg-[#0F172A] border border-gray-700 rounded-lg p-3 outline-none resize-none focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="bg-green-600 hover:bg-green-500 transition px-6 py-3 rounded-lg font-semibold"
          >
            {uploading ? "Saving..." : "Submit Testimonial"}
          </button>
        </form>
      )}
      {loading ? (
        <div className="text-center py-16 text-gray-400">
          Loading testimonials...
        </div>
      ) : filteredTestimonials.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          No testimonials found.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTestimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#1E293B] border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition"
            >
              <div className="flex items-start gap-4">
                {t.image ? (
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-600"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold">
                    {t.name?.charAt(0)?.toUpperCase()}
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{t.name}</h3>

                      {t.role && (
                        <p className="text-gray-400 text-sm">{t.role}</p>
                      )}
                    </div>

                    <FaQuoteLeft className="text-blue-500 text-2xl opacity-60" />
                  </div>

                  <div className="flex items-center gap-1 text-yellow-400 mt-3 mb-3">
                    {Array.from({
                      length: Number(t.rating || 5),
                    }).map((_, index) => (
                      <FaStar key={index} />
                    ))}
                  </div>

                  <p className="text-gray-300 leading-7 whitespace-pre-wrap">
                    {t.text || t.message}
                  </p>

                  <p className="text-xs text-gray-500 mt-4">
                    {new Date(t.timestamp || Date.now()).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => setDeleteId(t.id)}
                  className="text-red-400 hover:text-red-600 transition"
                >
                  <FaTrashAlt size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Delete Confirmation */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-[#1E293B] border border-gray-700 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-semibold">Delete Testimonial</h3>

              <button
                onClick={() => setDeleteId(null)}
                className="text-gray-400 hover:text-white transition"
              >
                <FaTimes size={18} />
              </button>
            </div>

            <p className="text-gray-400 leading-7">
              Are you sure you want to delete this testimonial?
              <br />
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setDeleteId(null)}
                className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
              >
                Cancel
              </button>

              <button
                onClick={() => handleDelete(deleteId)}
                className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition"
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
