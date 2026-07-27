import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaClock, FaDumbbell } from "react-icons/fa";
import API_URL from "../../utils/api";


export default function MembershipSection() {
  const [billing, setBilling] = useState("monthly");
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetch("${API_URL}/api/memberships")
      .then((res) => res.json())
      .then((data) => setPlans(data))
      .catch(() => setPlans([]));
  }, []);

  const getIcon = (title) => {
    if (title.toLowerCase().includes("month"))
      return <FaClock className="text-green-600 text-4xl mb-4" />;
    if (title.toLowerCase().includes("6"))
      return <FaCalendarAlt className="text-green-600 text-4xl mb-4" />;
    return <FaDumbbell className="text-green-600 text-4xl mb-4" />;
  };

  return (
    <div id="membership" className="w-full bg-[#5F7252] py-20 px-6 md:px-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-white mb-4">Membership</h2>
        <p className="text-white text-lg">
          Crushing your health and fitness goals starts here...
        </p>

        {/* Billing Toggle */}
        <div className="mt-6 flex justify-center items-center gap-4">
          <span
            className={`text-white ${
              billing === "monthly" ? "font-bold" : "opacity-60"
            }`}
          >
            Monthly
          </span>
          <div
            onClick={() =>
              setBilling(billing === "monthly" ? "yearly" : "monthly")
            }
            className="w-14 h-7 bg-white rounded-full flex items-center px-1 cursor-pointer transition"
          >
            <div
              className={`w-5 h-5 bg-green-600 rounded-full transform transition duration-300 ${
                billing === "yearly" ? "translate-x-7" : ""
              }`}
            />
          </div>
          <span
            className={`text-white ${
              billing === "yearly" ? "font-bold" : "opacity-60"
            }`}
          >
            Yearly
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-xl p-8 flex flex-col justify-between h-[480px] transition hover:scale-105 duration-300"
          >
            <div>
              <div className="flex justify-center">{getIcon(plan.title)}</div>
              <h3 className="text-xl font-bold text-center text-gray-800 mt-2 mb-1">
                {plan.title}
              </h3>
              <p className="text-2xl font-extrabold text-green-700 text-center mb-6">
                {billing === "monthly" ? plan.price : plan.yearly || plan.price}
              </p>
              <ul className="text-gray-700 space-y-3 text-sm px-2">
                {plan.features?.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-green-500 text-green-600 text-xs font-bold">
                      ✓
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button className="mt-6 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-full font-semibold text-sm transition">
              Start 7 Day Free Trial
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
