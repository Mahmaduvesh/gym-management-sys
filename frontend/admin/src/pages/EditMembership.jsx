import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditMembership() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/memberships/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.id) {
          setPlan(data);
        } else {
          setError("Plan not found");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load membership data");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlan((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...(plan.features || [])];
    updatedFeatures[index] = value;
    setPlan((prev) => ({
      ...prev,
      features: updatedFeatures,
    }));
  };

  const addFeature = () => {
    setPlan((prev) => ({
      ...prev,
      features: [...(prev.features || []), ""],
    }));
  };

  const removeFeature = (index) => {
    const updatedFeatures = [...(plan.features || [])];
    updatedFeatures.splice(index, 1);
    setPlan((prev) => ({
      ...prev,
      features: updatedFeatures,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);

    fetch(`http://localhost:5000/api/memberships/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plan),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then(() => {
        navigate("/memberships");
      })
      .catch(() => {
        alert("Failed to update plan");
        setSaving(false);
      });
  };

  if (loading) {
    return <div className="text-gray-400">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-8 mt-8 rounded-lg shadow-lg text-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-6">Edit Membership Plan</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            name="title"
            value={plan.title || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded dark:bg-gray-800 dark:border-gray-700"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            name="price"
            value={plan.price || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded dark:bg-gray-800 dark:border-gray-700"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Timing</label>
          <input
            name="timing"
            value={plan.timing || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded dark:bg-gray-800 dark:border-gray-700"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Features</label>
          {(plan.features || []).map((feature, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="flex-1 border px-3 py-2 rounded dark:bg-gray-800 dark:border-gray-700"
              />
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addFeature}
            className="mt-2 text-blue-600 hover:underline text-sm"
          >
            + Add Feature
          </button>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-semibold"
          >
            {saving ? "Saving..." : "Update Plan"}
          </button>
        </div>
      </form>
    </div>
  );
}
