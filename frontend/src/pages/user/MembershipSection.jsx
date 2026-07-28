import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaClock, FaDumbbell } from "react-icons/fa";
import API_URL from "../../utils/api";

export default function MembershipSection() {
  const [billing, setBilling] = useState("monthly");
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/memberships`)
      .then((res) => res.json())
      .then((data) => {
        setPlans(Array.isArray(data) ? data : []);
      })
      .catch(() => setPlans([]))
      .finally(() => setLoading(false));
  }, []);

  const getIcon = (title = "") => {
    const value = title.toLowerCase();

    if (value.includes("basic"))
      return <FaClock className="text-green-600 text-5xl" />;

    if (value.includes("advanced"))
      return <FaCalendarAlt className="text-green-600 text-5xl" />;

    return <FaDumbbell className="text-green-600 text-5xl" />;
  };

  const getPrice = (plan) => {
    if (billing === "monthly") {
      return plan.monthlyPrice ?? plan.price ?? 0;
    }

    return plan.yearlyPrice ?? plan.yearly ?? plan.price ?? 0;
  };

  return (
    <section id="membership" className="bg-[#5F7252] py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Membership
          </h2>

          <p className="text-white/90 mt-4 text-lg">
            Crushing your health and fitness goals starts here...
          </p>

          {/* Billing Toggle */}

          <div className="mt-10 flex justify-center items-center gap-5">
            <span
              className={`transition font-medium ${
                billing === "monthly" ? "text-white" : "text-white/50"
              }`}
            >
              Monthly
            </span>

            <button
              onClick={() =>
                setBilling((prev) =>
                  prev === "monthly" ? "yearly" : "monthly",
                )
              }
              className={`relative w-16 h-8 rounded-full transition ${
                billing === "monthly" ? "bg-white" : "bg-green-800"
              }`}
            >
              <span
                className={`absolute top-1 w-6 h-6 rounded-full bg-green-600 transition-all duration-300 ${
                  billing === "monthly" ? "left-1" : "left-9"
                }`}
              />
            </button>

            <span
              className={`transition font-medium ${
                billing === "yearly" ? "text-white" : "text-white/50"
              }`}
            >
              Yearly
            </span>
          </div>

          <p className="text-white/80 text-sm mt-4">
            {billing === "monthly"
              ? "Monthly Membership Plans"
              : "Yearly Membership Plans"}
          </p>
        </div>

        {loading ? (
          <div className="text-center text-white text-xl py-20">
            Loading Membership Plans...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {plans.map((plan, index) => (
              <div
                key={plan.id || index}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden transition duration-300 hover:-translate-y-2 hover:shadow-green-900/40 flex flex-col"
              >
                {/* Top */}

                <div className="p-8 text-center border-b">
                  <div className="flex justify-center mb-5">
                    {getIcon(plan.title)}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800">
                    {plan.title}
                  </h3>

                  <div className="mt-6">
                    <h2 className="text-5xl font-extrabold text-green-600">
                      ₹{Number(getPrice(plan)).toLocaleString()}
                    </h2>

                    <p className="text-gray-500 mt-2 font-medium">
                      {billing === "monthly" ? "/ Month" : "/ Year"}
                    </p>
                  </div>
                </div>

                {/* Features */}

                <div className="flex-1 p-8">
                  <ul className="space-y-4">
                    {plan.features?.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">
                          ✓
                        </span>

                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom */}

                <div className="p-8 pt-0">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full font-semibold transition">
                    Start 7 Day Free Trial
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
