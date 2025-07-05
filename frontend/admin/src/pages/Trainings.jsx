import { useEffect, useState } from "react";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

export default function Trainings() {
  const [trainings, setTrainings] = useState([]);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", date: "" });

  const fetchTrainings = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/training");
      const data = await res.json();
      setTrainings(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const startOfMonth = currentDate.startOf("month").startOf("week");
  const endOfMonth = currentDate.endOf("month").endOf("week");
  const calendarDays = [];
  let day = startOfMonth;
  while (day.isBefore(endOfMonth)) {
    calendarDays.push(day);
    day = day.add(1, "day");
  }

  const getTrainingsForDay = (date) =>
    trainings.filter((t) => dayjs(t.date).isSame(date, "day"));

  const handleDelete = async (id) => {
    if (confirm("Delete this training plan?")) {
      try {
        await fetch(`http://localhost:5000/api/training/${id}`, {
          method: "DELETE",
        });
        setTrainings((prev) => prev.filter((item) => item.id !== id));
      } catch {
        alert("Failed to delete training plan.");
      }
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/training", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Failed to add training");

      const newItem = await response.json();
      const exists = trainings.find((t) => t.id === newItem.trainingId);
      if (!exists) {
        setTrainings((prev) => [...prev, { ...form, id: newItem.trainingId }]);
      }

      setShowModal(false);
      setForm({ title: "", description: "", date: "" });
    } catch (err) {
      alert("Error adding training.");
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Manage Training Plans</h2>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <FiPlus /> Add Training
        </button>
      </div>

      <div className="bg-gray-900 text-white rounded-lg shadow overflow-x-auto">
        <div className="flex justify-between items-center border-b border-gray-700 p-4">
          <h3 className="text-xl font-semibold">
            {currentDate.format("MMMM YYYY")}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentDate(currentDate.subtract(1, "month"))}
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded"
            >
              ⬅
            </button>
            <button
              onClick={() => setCurrentDate(currentDate.add(1, "month"))}
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded"
            >
              ➡
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 text-sm text-center text-gray-300 bg-gray-800">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d, i) => (
            <div key={i} className="p-2 border-r border-b border-gray-700">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {calendarDays.map((date, idx) => (
            <div
              key={`${date.format("YYYY-MM-DD")}-${idx}`}
              className="h-44 border-r border-b border-gray-800 p-2 text-xs hover:bg-gray-800 transition"
            >
              <div className="text-right text-gray-500 mb-1">{date.date()}</div>
              <div className="space-y-2 overflow-y-auto h-[85%] pr-1">
                {getTrainingsForDay(date).map((t) => (
                  <div
                    key={t.id}
                    className="bg-blue-600 rounded p-2 text-white relative shadow-md"
                  >
                    <div className="font-semibold truncate">{t.title}</div>
                    <div className="text-[10px] text-blue-100">
                      {t.description}
                    </div>
                    <div className="absolute top-1 right-1 flex gap-1 text-sm">
                      <Link
                        to={`/trainings/edit/${t.id}`}
                        title="Edit"
                        className="text-yellow-300 hover:text-yellow-400"
                      >
                        <FiEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(t.id)}
                        title="Delete"
                        className="text-red-400 hover:text-red-500"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-red bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md text-white space-y-4">
            <h2 className="text-xl font-bold">Create Training</h2>
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            />
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
