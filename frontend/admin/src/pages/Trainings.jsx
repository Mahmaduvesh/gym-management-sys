import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";

export default function Trainings() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/training")
      .then((res) => res.json())
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this training plan?")) {
      fetch(`http://localhost:5000/api/training/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          setTrainings((prev) => prev.filter((item) => item.id !== id));
        })
        .catch(() => alert("Failed to delete training plan."));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Training Plans
        </h2>
        <Link
          to="/trainings/add"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <FiPlus /> Add Training
        </Link>
      </div>

      {/* Table-style List */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-sm text-left border-t border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Day</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {trainings.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6 text-gray-500 dark:text-gray-400"
                >
                  No training plans found.
                </td>
              </tr>
            )}

            {trainings.map((item, index) => (
              <tr
                key={item.id}
                className={`${
                  index % 2 === 0
                    ? "bg-white dark:bg-gray-800"
                    : "bg-gray-50 dark:bg-gray-900"
                } border-b border-gray-200 dark:border-gray-700`}
              >
                <td className="px-4 py-3 text-gray-900 dark:text-white">
                  {item.title}
                </td>
                <td className="px-4 py-3 text-blue-600 dark:text-blue-400">
                  {item.day || "-"}
                </td>
                <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                  {item.description}
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center items-center gap-3">
                    <Link
                      to={`/trainings/edit/${item.id}`}
                      className="text-yellow-500 hover:text-yellow-600 text-lg"
                      title="Edit"
                    >
                      <FiEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-600 text-lg"
                      title="Delete"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
