import { useEffect, useState } from "react";
import { FaPlus, FaTrashAlt, FaTimes } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { storage } from "../../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import API_URL from "../utils/api";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", text: "", role: "", rating: 5 });
  const [photoFile, setPhotoFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = () => {
    setLoading(true);
    fetch("${API_URL}/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort(
          (a, b) => (b.timestamp || 0) - (a.timestamp || 0)
        );
        setTestimonials(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name || !form.text) {
      toast.error("Name and message are required.");
      return;
    }

    setUploading(true);
    let photoUrl = "";

    if (photoFile) {
      const fileRef = ref(
        storage,
        `testimonials/${Date.now()}-${photoFile.name}`
      );
      const uploadTask = uploadBytesResumable(fileRef, photoFile);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => reject(error),
          async () => {
            photoUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve();
          }
        );
      });
    }

    const payload = {
      name: form.name,
      role: form.role,
      text: form.text,
      image: photoUrl,
      rating: parseInt(form.rating) || 5,
      timestamp: Date.now(),
    };

    fetch("${API_URL}/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed");
        return res.json();
      })
      .then(() => {
        toast.success("Testimonial added!");
        setForm({ name: "", text: "", role: "", rating: 5 });
        setPhotoFile(null);
        setShowForm(false);
        fetchTestimonials();
      })
      .catch(() => toast.error("Failed to add testimonial"))
      .finally(() => setUploading(false));
  };

  const handleDelete = (id) => {
    fetch(`${API_URL}/api/testimonials/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        toast.success("Deleted successfully!");
        setDeleteId(null);
        fetchTestimonials();
      })
      .catch(() => toast.error("Failed to delete"));
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white p-6">
      <ToastContainer position="top-right" theme="dark" />

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Testimonials</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md flex items-center gap-2"
        >
          {showForm ? <FaTimes /> : <FaPlus />} {showForm ? "Close" : "Add"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleAdd}
          className="bg-[#1E293B] p-6 rounded-xl mb-10 space-y-4 shadow-md border border-gray-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-gray-800 text-white p-2 rounded border border-gray-700 w-full"
            />
            <input
              type="text"
              placeholder="Role (Optional)"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="bg-gray-800 text-white p-2 rounded border border-gray-700 w-full"
            />
            <select
              value={form.rating}
              onChange={(e) => setForm({ ...form, rating: e.target.value })}
              className="bg-gray-800 text-white p-2 rounded border border-gray-700 w-full"
            >
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r} Star{r > 1 ? "s" : ""}
                </option>
              ))}
            </select>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhotoFile(e.target.files[0])}
              className="bg-gray-800 text-white p-2 rounded border border-gray-700 w-full"
            />
            <textarea
              rows={3}
              placeholder="Message"
              value={form.text}
              onChange={(e) => setForm({ ...form, text: e.target.value })}
              className="bg-gray-800 text-white p-2 rounded border border-gray-700 w-full md:col-span-2"
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-md"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Submit Testimonial"}
          </button>
        </form>
      )}

      {/* Testimonials List */}
      {loading ? (
        <p className="text-gray-400">Loading testimonials...</p>
      ) : testimonials.length === 0 ? (
        <p className="text-gray-500">No testimonials found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#1E293B] p-5 rounded-xl shadow-md border border-gray-700 flex flex-col md:flex-row gap-4"
            >
              {t.image ? (
                <img
                  src={t.image}
                  alt="testimonial"
                  className="w-20 h-20 rounded-full object-cover border border-gray-600"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center text-white text-xl">
                  {t.name?.charAt(0)}
                </div>
              )}
              <div className="flex-1">
                <p className="text-lg font-semibold">{t.name}</p>
                {t.role && <p className="text-sm text-gray-400">{t.role}</p>}
                <p className="text-yellow-400 text-sm mb-1">
                  {"⭐".repeat(t.rating || 5)}
                </p>
                <p className="text-gray-300 mt-1 whitespace-pre-wrap">
                  {t.text || t.message}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(t.timestamp || Date.now()).toLocaleString()}
                </p>
              </div>
              <div>
                <FaTrashAlt
                  size={18}
                  className="text-red-400 hover:text-red-600 cursor-pointer"
                  onClick={() => setDeleteId(t.id)}
                  title="Delete"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-[#1E293B] p-6 rounded-lg w-11/12 max-w-sm border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-white">
              Confirm Deletion
            </h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete this testimonial?
            </p>
            <div className="flex justify-end gap-4">
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
