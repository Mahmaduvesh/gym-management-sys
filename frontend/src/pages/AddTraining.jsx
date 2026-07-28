import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import API_URL from "../utils/api";

export default function AddTraining() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    day: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    if (!id) return;

    const url = `${API_URL}/api/training/${id}`;

    console.log("API_URL:", API_URL);
    console.log("Request URL:", url);
    console.log("ID:", id);

    fetch(url)
      .then(async (res) => {
        const text = await res.text();

        console.log("Status:", res.status);
        console.log("Response:", text);

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const data = JSON.parse(text);
        setForm(data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = id
      ? `${API_URL}/api/training/${id}`
      : `${API_URL}/api/training`;

    const method = id ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      console.log("Status:", res.status);
      console.log("Response:", data);

      if (!res.ok) {
        throw new Error(
          data.error || data.message || "Failed to save training",
        );
      }

      alert(
        id ? "Training updated successfully!" : "Training added successfully!",
      );

      navigate("/admin/trainings");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow space-y-6">
      {/* Header with back */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {id ? "Edit" : "Add"} Training Plan
        </h2>
        <button
          onClick={() => navigate("/trainings")}
          className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          <FiArrowLeft />
          <span className="text-sm">Back</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Day */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300">
            Day
          </label>
          <input
            type="text"
            name="day"
            value={form.day}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="e.g., Monday"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {id ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
}
