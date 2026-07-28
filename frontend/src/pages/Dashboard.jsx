import { useEffect, useState } from "react";
import { FaUsers, FaDumbbell, FaCommentDots, FaStar } from "react-icons/fa";
import API_URL from "../utils/api";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/stats`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error fetching stats:", err))
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    {
      title: "Users",
      value: stats?.users || 0,
      icon: <FaUsers className="text-white text-3xl" />,
      gradient: "from-blue-500 to-indigo-600",
    },
    {
      title: "Memberships",
      value: stats?.memberships || 0,
      icon: <FaDumbbell className="text-white text-3xl" />,
      gradient: "from-green-400 to-emerald-600",
    },
    {
      title: "Feedbacks",
      value: stats?.feedbacks || 0,
      icon: <FaCommentDots className="text-white text-3xl" />,
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      title: "Testimonials",
      value: stats?.testimonials || 0,
      icon: <FaStar className="text-white text-3xl" />,
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map(({ title, value, icon, gradient }) => (
        <div
          key={title}
          className={`rounded-xl p-5 shadow-lg text-white bg-gradient-to-r ${gradient} flex items-center justify-between transition-all duration-300`}
        >
          <div>
            <div className="text-sm opacity-90 font-medium">{title}</div>
            {loading ? (
              <div className="h-6 w-16 bg-white/30 rounded animate-pulse mt-1"></div>
            ) : (
              <div className="text-3xl font-bold">{value}</div>
            )}
          </div>
          {icon}
        </div>
      ))}
    </div>
  );
}
