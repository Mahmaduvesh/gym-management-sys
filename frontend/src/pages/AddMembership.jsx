import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import API_URL from "../utils/api";

export default function AddMembership() {
  const navigate = useNavigate();
  const { id } = useParams();
  

  const [form, setForm] = useState({
    title: "",
    monthlyPrice: "",
    yearlyPrice: "",
    timing: "",
    features: [""],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    fetch(`${API_URL}/api/memberships/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          title: data.title || "",
          monthlyPrice: data.monthlyPrice ?? data.price ?? "",
          yearlyPrice: data.yearlyPrice ?? "",
          timing: data.timing || "",
          features:
            data.features && data.features.length ? data.features : [""],
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to load membership");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeatureChange = (index, value) => {
    const updated = [...form.features];
    updated[index] = value;

    setForm((prev) => ({
      ...prev,
      features: updated,
    }));
  };

  const handleAddFeature = () => {
    setForm((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const handleRemoveFeature = (index) => {
    if (form.features.length === 1) return;

    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const method = id ? "PUT" : "POST";

      const url = id
        ? `${API_URL}/api/memberships/${id}`
        : `${API_URL}/api/memberships`;

      const payload = {
        title: form.title.trim(),
        monthlyPrice: Number(form.monthlyPrice),
        yearlyPrice: Number(form.yearlyPrice),
        timing: form.timing,
        features: form.features.filter((feature) => feature.trim() !== ""),
      };

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to save membership.");
      }

      navigate("/admin/memberships");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-80 text-xl font-semibold">
        Loading Membership...
      </div>
    );
  }

  // console.log("Payload:", payload);

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {id ? "Edit Membership" : "Add Membership"}
        </h2>

        <button
          onClick={() => navigate("/admin/memberships")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <FiArrowLeft />
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
            Membership Title
          </label>

          <input
            type="text"
            name="title"
            placeholder="Basic Membership"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 bg-white dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        {/* Monthly Price */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
            Monthly Price
          </label>

          <input
            type="number"
            name="monthlyPrice"
            placeholder="1499"
            value={form.monthlyPrice}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 bg-white dark:bg-gray-700 dark:text-white"
            required
          />
        </div>{" "}
        {/* Yearly Price */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
            Yearly Price
          </label>

          <input
            type="number"
            name="yearlyPrice"
            placeholder="14999"
            value={form.yearlyPrice}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 bg-white dark:bg-gray-700 dark:text-white"
            required
          />
        </div>
        {/* Membership Duration */}
        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
            Membership Duration
          </label>

          <select
            name="timing"
            value={form.timing}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 bg-white dark:bg-gray-700 dark:text-white"
            required
          >
            <option value="">Select Duration</option>
            <option value="1 Month">1 Month</option>
            <option value="3 Months">3 Months</option>
            <option value="6 Months">6 Months</option>
            <option value="12 Months">12 Months</option>
          </select>
        </div>
        {/* Features */}
        <div>
          <label className="block mb-3 font-medium text-gray-700 dark:text-gray-300">
            Membership Features
          </label>

          <div className="space-y-3">
            {form.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="text"
                  value={feature}
                  placeholder={`Feature ${index + 1}`}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className="flex-1 border rounded-lg px-4 py-3 bg-white dark:bg-gray-700 dark:text-white"
                />

                {form.features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    className="w-10 h-10 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold transition"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleAddFeature}
            className="mt-4 px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition"
          >
            + Add Feature
          </button>
        </div>
        {/* Action Buttons */}
        <div className="flex gap-4 pt-6">
          <button
            type="button"
            onClick={() => navigate("/admin/memberships")}
            className="flex-1 py-3 rounded-lg border border-gray-300 dark:border-gray-600 font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex-1 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
          >
            {id ? "Update Membership" : "Create Membership"}
          </button>
        </div>
      </form>
    </div>
  );
}
