import { useEffect, useState } from "react";
import { FaCheckCircle, FaTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [deleteId, setDeleteId] = useState(null);

  const fetchFeedbacks = () => {
    fetch("http://localhost:5000/api/feedbacks")
      .then((res) => res.json())
      .then((data) => {
        setFeedbacks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleMarkReviewed = (id) => {
    fetch(`http://localhost:5000/api/feedbacks/review/${id}`, {
      method: "PATCH",
    }).then(() => {
      setFeedbacks((prev) =>
        prev.map((fb) => (fb.id === id ? { ...fb, reviewed: true } : fb))
      );
      toast.success("Marked as reviewed!");
    });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/feedbacks/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        toast.success("Feedback deleted successfully!");
        setFeedbacks((prev) => prev.filter((fb) => fb.id !== id));
        setDeleteId(null);
      } else {
        toast.error("Failed to delete feedback.");
      }
    });
  };

  const filteredFeedbacks = feedbacks.filter((fb) =>
    filter === "all" ? true : filter === "reviewed" ? fb.reviewed : !fb.reviewed
  );

  return (
    <div className="p-6 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white relative">
      <ToastContainer position="top-right" theme="dark" />

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">User Feedbacks</h2>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mt-4 sm:mt-0 bg-[#1E293B] border border-gray-700 px-3 py-1 rounded-md text-white"
        >
          <option value="all">All</option>
          <option value="reviewed">Reviewed</option>
          <option value="not_reviewed">Not Reviewed</option>
        </select>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading feedbacks...</p>
      ) : filteredFeedbacks.length === 0 ? (
        <p className="text-gray-500">No feedback available.</p>
      ) : (
        <ul className="space-y-5">
          {filteredFeedbacks.map((fb) => (
            <li
              key={fb.id}
              className="p-5 rounded-xl bg-gradient-to-br from-[#1f2937] to-[#111827] border border-gray-700 shadow-lg transition"
            >
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex-1">
                  <p className="text-xs text-gray-400 mb-1">
                    {new Date(
                      fb.timestamp || fb.createdAt || Date.now()
                    ).toLocaleString()}
                  </p>
                  <p className="text-lg font-semibold text-white mb-1">
                    Name: <span className="text-gray-300">{fb.name}</span>
                  </p>
                  <p className="text-gray-300 whitespace-pre-wrap break-words">
                    Feedback: {fb.message}
                  </p>
                </div>

                <div className="flex items-center gap-4 self-start sm:self-center">
                  <FaCheckCircle
                    size={22}
                    onClick={() => !fb.reviewed && handleMarkReviewed(fb.id)}
                    className={`transition ${
                      fb.reviewed
                        ? "text-green-500 cursor-default"
                        : "text-green-400 hover:text-green-500 cursor-pointer"
                    }`}
                    title={
                      fb.reviewed ? "Already reviewed" : "Mark as reviewed"
                    }
                  />
                  <FaTrashAlt
                    size={20}
                    onClick={() => setDeleteId(fb.id)}
                    className="text-red-400 hover:text-red-600 transition cursor-pointer"
                    title="Delete"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Modal for delete confirmation */}
      {deleteId && (
        <div className="absolute inset-0 bg-[#1f2937] bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-gradient-to-tr from-[#1f2937] via-[#111827] to-[#1f2937] border border-gray-700 text-white p-6 rounded-xl shadow-2xl w-full max-w-sm mx-auto">
            <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
            <p className="text-sm text-gray-300 mb-6">
              Are you sure you want to delete this feedback?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-500"
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
