import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2, FiPlus, FiDownload } from "react-icons/fi";
import API_URL from "../utils/api";

const demoDiets = [
  {
    title: "Weight Loss Plan",
    day: "Monday",
    breakfast: "Oats with Banana & Almonds",
    lunch: "Grilled Chicken, Brown Rice & Mixed Salad",
    dinner: "Vegetable Soup with Paneer",
    notes: "Drink at least 3L of water and avoid sugary drinks.",
  },
  {
    title: "Muscle Gain Plan",
    day: "Wednesday",
    breakfast: "Egg Omelette, Oats & Milk",
    lunch: "Chicken Breast, Rice & Broccoli",
    dinner: "Fish with Sweet Potato & Vegetables",
    notes: "Consume protein every 3–4 hours.",
  },
  {
    title: "Balanced Fitness Plan",
    day: "Friday",
    breakfast: "Greek Yogurt with Fruits & Nuts",
    lunch: "Paneer Wrap with Mixed Salad",
    dinner: "Grilled Salmon with Vegetables",
    notes: "Maintain balanced nutrition and stay hydrated.",
  },
];

export default function Diets() {
  const [diets, setDiets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDemo, setLoadingDemo] = useState(false);
  const [error, setError] = useState("");

  const fetchDiets = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/diets`);

      if (!res.ok) throw new Error("Failed to fetch diets");

      const data = await res.json();

      setDiets(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load diet plans.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiets();
  }, []);

  const loadDemoDiets = async () => {
    if (diets.length > 0) {
      alert("Diet plans already exist.");
      return;
    }

    try {
      setLoadingDemo(true);

      for (const diet of demoDiets) {
        await fetch(`${API_URL}/api/diets`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(diet),
        });
      }

      alert("Demo Diet Plans Loaded Successfully!");

      fetchDiets();
    } catch (err) {
      console.error(err);
      alert("Failed to load demo plans.");
    } finally {
      setLoadingDemo(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this diet plan?")) return;

    try {
      const res = await fetch(`${API_URL}/api/diets/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      setDiets((prev) => prev.filter((diet) => diet.id !== id));
    } catch {
      alert("Failed to delete diet.");
    }
  };

  if (loading)
    return (
      <div className="text-center py-12 text-gray-400">
        Loading Diet Plans...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-12 text-red-500">
        {error}
      </div>
    );

  return (
    <div className="space-y-6">

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">

        <h2 className="text-3xl font-bold text-white">
          Diet Plans
        </h2>

        <div className="flex flex-wrap gap-3">

          <button
            onClick={loadDemoDiets}
            disabled={loadingDemo}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-5 py-2 rounded-lg transition"
          >
            <FiDownload />

            {loadingDemo ? "Loading..." : "Load Demo Plans"}
          </button>

          <Link
            to="/admin/diets/add"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
          >
            <FiPlus />

            Add Diet
          </Link>

        </div>

      </div>

      {diets.length === 0 ? (

        <div className="bg-gray-800 rounded-xl py-16 text-center border border-dashed border-gray-700">

          <h3 className="text-xl font-semibold text-white">
            No Diet Plans Found
          </h3>

          <p className="text-gray-400 mt-2">
            Add a new diet plan or load demo plans.
          </p>

        </div>

      ) : (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {diets.map((diet) => (

            <div
              key={diet.id}
              className="bg-gray-800 rounded-2xl border border-gray-700 hover:border-blue-500 transition p-6"
            >

              <div className="flex justify-between items-start">

                <div>

                  <h3 className="text-xl font-bold text-white">
                    {diet.title}
                  </h3>

                  <p className="text-green-400 mt-1">
                    {diet.day}
                  </p>

                </div>

                <div className="flex gap-3">

                  <Link
                    to={`/admin/diets/edit/${diet.id}`}
                    className="text-yellow-400 hover:text-yellow-300"
                  >
                    <FiEdit2 size={18} />
                  </Link>

                  <button
                    onClick={() => handleDelete(diet.id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <FiTrash2 size={18} />
                  </button>

                </div>

              </div>

              <div className="mt-6 space-y-3 text-sm">

                <p className="text-gray-300">
                  <span className="font-semibold text-white">
                    Breakfast:
                  </span>{" "}
                  {diet.breakfast}
                </p>

                <p className="text-gray-300">
                  <span className="font-semibold text-white">
                    Lunch:
                  </span>{" "}
                  {diet.lunch}
                </p>

                <p className="text-gray-300">
                  <span className="font-semibold text-white">
                    Dinner:
                  </span>{" "}
                  {diet.dinner}
                </p>

                {diet.notes && (
                  <div className="border-t border-gray-700 pt-3">
                    <p className="italic text-gray-400">
                      {diet.notes}
                    </p>
                  </div>
                )}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}