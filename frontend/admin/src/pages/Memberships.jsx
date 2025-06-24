import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MembershipList() {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/memberships")
      .then((res) => res.json())
      .then((data) => {
        setMemberships(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load membership plans.");
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to delete this membership plan?")
    ) {
      fetch(`http://localhost:5000/api/memberships/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          setMemberships((prev) => prev.filter((m) => m.id !== id));
        })
        .catch(() => alert("Failed to delete membership."));
    }
  };

  if (loading) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-300 py-10">
        Loading membership plans...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-medium py-10">{error}</div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Membership Plans
        </h2>
        <Link
          to="/memberships/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          + Add New
        </Link>
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {memberships.map((plan) => (
          <div
            key={plan.id}
            className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow bg-white dark:bg-gray-800"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              {plan.title}
            </h3>
            <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
              ₹{plan.price}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {plan.timing}
            </p>

            <ul className="list-disc list-inside text-sm mt-2 text-gray-700 dark:text-gray-300">
              {plan.features?.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>

            <div className="mt-4 flex gap-2">
              <Link
                to={`/memberships/edit/${plan.id}`}
                className="text-sm px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(plan.id)}
                className="text-sm px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
