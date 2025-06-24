import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function AddMembership() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    title: "",
    price: "",
    timing: "",
    features: [""],
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/memberships/${id}`)
        .then((res) => res.json())
        .then((data) => setForm(data));
    }
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFeatureChange = (index, value) => {
    const updated = [...form.features];
    updated[index] = value;
    setForm((prev) => ({ ...prev, features: updated }));
  };

  const handleAddFeature = () => {
    setForm((prev) => ({ ...prev, features: [...prev.features, ""] }));
  };

  const handleRemoveFeature = (index) => {
    const updated = [...form.features];
    updated.splice(index, 1);
    setForm((prev) => ({ ...prev, features: updated }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? "PUT" : "POST";
    const url = id
      ? `http://localhost:5000/api/memberships/${id}`
      : `http://localhost:5000/api/memberships`;

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then(() => navigate("/memberships"))
      .catch(() => alert("Failed to submit form"));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow space-y-6">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {id ? "Edit" : "Add"} Membership Plan
        </h2>
        <button
          onClick={() => navigate("/memberships")}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <FiArrowLeft />
          <span className="text-sm">Back</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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
            className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            required
          />
        </div>

        {/* Timing */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300">
            Timing
          </label>
          <input
            type="text"
            name="timing"
            value={form.timing}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
            required
          />
        </div>

        {/* Features */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-gray-300">
            Features
          </label>
          {form.features.map((feat, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={feat}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="flex-1 border px-3 py-2 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              />
              <button
                type="button"
                onClick={() => handleRemoveFeature(index)}
                className="text-red-500 font-bold"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddFeature}
            className="text-blue-600 dark:text-blue-400 font-medium mt-2"
          >
            + Add Feature
          </button>
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
