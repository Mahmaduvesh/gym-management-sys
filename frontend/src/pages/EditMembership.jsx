import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import API_URL from "../utils/api";

export default function EditMembership() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    monthlyPrice: "",
    yearlyPrice: "",
    timing: "",
    features: [""],
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/api/memberships/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load membership");
        return res.json();
      })
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
        setError("Failed to load membership.");
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

  const addFeature = () => {
    setForm((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const removeFeature = (index) => {
    if (form.features.length === 1) return;

    setForm((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      const payload = {
        title: form.title.trim(),
        monthlyPrice: Number(form.monthlyPrice),
        yearlyPrice: Number(form.yearlyPrice),
        timing: form.timing,
        features: form.features.filter((item) => item.trim() !== ""),
      };

      const res = await fetch(`${API_URL}/api/memberships/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to update membership");
      }

      navigate("/admin/memberships");
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-lg">Loading Membership...</div>
    );
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Edit Membership
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
        <div>
          <label className="block mb-2 font-medium">Membership Title</label>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Monthly Price</label>

          <input
            type="number"
            name="monthlyPrice"
            value={form.monthlyPrice}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Yearly Price</label>

          <input
            type="number"
            name="yearlyPrice"
            value={form.yearlyPrice}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Membership Duration</label>

          <select
            name="timing"
            value={form.timing}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          >
            <option value="">Select Duration</option>
            <option value="1 Month">1 Month</option>
            <option value="3 Months">3 Months</option>
            <option value="6 Months">6 Months</option>
            <option value="12 Months">12 Months</option>
          </select>
        </div>

        <div>
          <label className="block mb-3 font-medium">Features</label>

          {form.features.map((feature, index) => (
            <div key={index} className="flex gap-3 mb-3">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="flex-1 border rounded-lg px-4 py-3"
              />

              {form.features.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 rounded-lg"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addFeature}
            className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            + Add Feature
          </button>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate("/admin/memberships")}
            className="flex-1 border rounded-lg py-3"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3"
          >
            {saving ? "Updating..." : "Update Membership"}
          </button>
        </div>
      </form>
    </div>
  );
}
