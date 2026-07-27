import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import API_URL from "../utils/api";

export default function Diets() {
  const [diets, setDiets] = useState([]);

  useEffect(() => {
    fetch("${API_URL}/api/diets")
      .then((res) => res.json())
      .then((data) => setDiets(data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this diet plan?")) {
      fetch(`${API_URL}/api/diets/${id}`, {
        method: "DELETE",
      })
        .then(() => setDiets((prev) => prev.filter((diet) => diet.id !== id)))
        .catch(() => alert("Failed to delete diet plan."));
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 dark:bg-gray-900 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Diet Plans
        </h2>
        <Link
          to="/diets/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Diet
        </Link>
      </div>

      {diets.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 text-center">
          No diet plans found.
        </p>
      ) : (
        <ul className="space-y-4">
          {diets.map((diet) => (
            <li
              key={diet.id}
              className="border-b border-gray-300 dark:border-gray-700 pb-4"
            >
              <div className="flex justify-between flex-wrap gap-2">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {diet.title} ({diet.day})
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Breakfast:</strong> {diet.breakfast}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Lunch:</strong> {diet.lunch}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Dinner:</strong> {diet.dinner}
                  </p>
                  {diet.notes && (
                    <p className="text-sm italic text-gray-500 dark:text-gray-400">
                      {diet.notes}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 items-start">
                  <Link
                    to={`/diets/edit/${diet.id}`}
                    className="text-yellow-500 hover:text-yellow-400"
                    title="Edit"
                  >
                    <FiEdit2 size={18} />
                  </Link>
                  <button
                    onClick={() => handleDelete(diet.id)}
                    className="text-red-500 hover:text-red-400"
                    title="Delete"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
