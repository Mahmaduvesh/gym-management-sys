import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import API_URL from "../utils/api";

export default function AddDiet() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    day: "",
    breakfast: "",
    lunch: "",
    dinner: "",
    notes: "",
  });

  useEffect(() => {
    if (id) {
      fetch(`${API_URL}/api/diets/${id}`)
        .then((res) => res.json())
        .then((data) => setForm(data))
        .catch(() => alert("Failed to fetch diet plan."));
    }
  }, [id]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? "PUT" : "POST";
    const url = id
      ? `${API_URL}/api/diets/${id}`
      : "${API_URL}/api/diets";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => navigate("/diets"))
      .catch(() => alert("Failed to save diet plan."));
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {id ? "Edit" : "Add"} Diet Plan
        </h1>
        <button
          onClick={() => navigate("/diets")}
          className="text-blue-500 hover:text-blue-300 flex items-center gap-2"
        >
          <FiArrowLeft />
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        {["title", "day", "breakfast", "lunch", "dinner", "notes"].map(
          (field) => (
            <div key={field} className="md:col-span-1">
              <label className="block text-gray-700 dark:text-gray-300 capitalize mb-1">
                {field}
              </label>
              <input
                type="text"
                name={field}
                value={form[field]}
                onChange={handleChange}
                required={field !== "notes"}
                className="w-full px-3 py-2 rounded border bg-white dark:bg-gray-700 dark:text-white"
              />
            </div>
          )
        )}

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            {id ? "Update" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
