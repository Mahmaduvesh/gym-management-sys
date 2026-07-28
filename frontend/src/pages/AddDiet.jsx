import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import API_URL from "../utils/api";

export default function AddDiet() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    day: "",
    breakfast: "",
    lunch: "",
    dinner: "",
    notes: "",
  });

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    fetch(`${API_URL}/api/diets/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch diet");
        return res.json();
      })
      .then((data) => {
        setForm({
          title: data.title || "",
          day: data.day || "",
          breakfast: data.breakfast || "",
          lunch: data.lunch || "",
          dinner: data.dinner || "",
          notes: data.notes || "",
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load diet plan.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = id ? `${API_URL}/api/diets/${id}` : `${API_URL}/api/diets`;

      const method = id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to save diet.");
      }

      navigate("/admin/diets");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-80 text-xl font-semibold">
        Loading Diet Plan...
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {id ? "Edit Diet Plan" : "Add Diet Plan"}
        </h2>

        <button
          onClick={() => navigate("/admin/diets")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <FiArrowLeft />
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
            Diet Title
          </label>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Weight Loss Plan"
            required
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
            Day
          </label>

          <select
            name="day"
            value={form.day}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-3 dark:[color-scheme:dark] focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select Day</option>

            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
              Breakfast
            </label>

            <textarea
              rows={4}
              name="breakfast"
              value={form.breakfast}
              onChange={handleChange}
              placeholder="Oats, Fruits, Milk..."
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-3 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
              Lunch
            </label>

            <textarea
              rows={4}
              name="lunch"
              value={form.lunch}
              onChange={handleChange}
              placeholder="Rice, Chicken, Salad..."
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-3 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
              Dinner
            </label>

            <textarea
              rows={4}
              name="dinner"
              value={form.dinner}
              onChange={handleChange}
              placeholder="Soup, Vegetables..."
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-3 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
            Additional Notes
          </label>

          <textarea
            rows={5}
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Hydration, supplements, meal timings..."
            className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-3 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate("/admin/diets")}
            className="flex-1 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold transition"
          >
            {loading ? "Saving..." : id ? "Update Diet" : "Create Diet"}
          </button>
        </div>
      </form>
    </div>
  );
}
