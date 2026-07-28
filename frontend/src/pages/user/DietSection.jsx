import { useEffect, useState } from "react";
import { FaCheck, FaUtensils } from "react-icons/fa";
import API_URL from "../../utils/api";
import dietImage from "../../assets/diet.jpg";

const defaultDiets = [
  {
    id: "default-1",
    title: "Weight Loss Plan",
    day: "Monday",
    breakfast: "Oats with Banana & Almonds",
    lunch: "Grilled Chicken, Brown Rice & Mixed Salad",
    dinner: "Vegetable Soup with Paneer",
    notes: "Drink at least 3L of water and avoid sugary drinks.",
  },
  {
    id: "default-2",
    title: "Muscle Gain Plan",
    day: "Wednesday",
    breakfast: "Egg Omelette, Oats & Milk",
    lunch: "Chicken Breast, Rice & Broccoli",
    dinner: "Fish with Sweet Potato & Vegetables",
    notes: "Consume high-quality protein every 3–4 hours.",
  },
  {
    id: "default-3",
    title: "Balanced Fitness Plan",
    day: "Friday",
    breakfast: "Greek Yogurt with Fruits & Nuts",
    lunch: "Paneer Wrap with Mixed Salad",
    dinner: "Grilled Salmon with Vegetables",
    notes: "Maintain balanced nutrition and stay hydrated.",
  },
];

export default function DietSection() {
  const [diets, setDiets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiets = async () => {
      try {
        const res = await fetch(`${API_URL}/api/diets`);

        if (!res.ok) throw new Error("Failed to fetch diets");

        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          setDiets(data);
        } else {
          setDiets(defaultDiets);
        }
      } catch (error) {
        console.error("Diet fetch error:", error);
        setDiets(defaultDiets);
      } finally {
        setLoading(false);
      }
    };

    fetchDiets();
  }, []);

  return (
    <section className="bg-[#121212] py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div>
            <img
              src={dietImage}
              alt="Healthy Meal"
              className="rounded-3xl shadow-2xl w-full object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <span className="inline-block border border-yellow-400 text-yellow-400 px-4 py-1 rounded-full text-sm font-semibold mb-5">
              Personalized Nutrition
            </span>

            <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Fuel Your Fitness With Smart Nutrition
            </h2>

            <p className="text-gray-300 mt-6 text-lg">
              Choose a diet plan prepared by our experts to support your fitness
              journey. Every plan is balanced, nutritious, and easy to follow.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            Available Diet Plans
          </h3>

          {loading ? (
            <div className="text-center text-gray-300 text-lg">
              Loading Diet Plans...
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {diets.map((diet) => (
                <div
                  key={diet.id}
                  className="bg-[#1B1B1B] border border-green-700 rounded-3xl p-7 hover:border-green-500 transition duration-300 hover:-translate-y-2"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                      <FaUtensils className="text-white" />
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-white">
                        {diet.title}
                      </h4>

                      <p className="text-green-400">{diet.day}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { label: "Breakfast", value: diet.breakfast },
                      { label: "Lunch", value: diet.lunch },
                      { label: "Dinner", value: diet.dinner },
                    ].map((meal) => (
                      <div key={meal.label} className="flex gap-3">
                        <FaCheck className="text-green-400 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-white font-semibold">
                            {meal.label}
                          </p>
                          <p className="text-gray-400">{meal.value}</p>
                        </div>
                      </div>
                    ))}

                    {diet.notes && (
                      <div className="bg-[#252525] rounded-xl p-4 mt-5">
                        <p className="text-sm text-gray-300 italic">
                          {diet.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  <button className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full font-semibold transition">
                    Choose This Plan
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}