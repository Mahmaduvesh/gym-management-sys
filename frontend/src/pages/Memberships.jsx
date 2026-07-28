import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaSearch,
  FaSyncAlt,
  FaLayerGroup,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaTrashAlt,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_URL from "../utils/api";

export default function MembershipList() {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchMemberships();
  }, []);

  const fetchMemberships = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/memberships`);

      if (!res.ok) {
        throw new Error("Unable to fetch membership plans.");
      }

      const data = await res.json();

      setMemberships(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load membership plans.");
      toast.error("Failed to load membership plans.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/memberships/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      setMemberships((prev) => prev.filter((plan) => plan.id !== id));

      setDeleteId(null);

      toast.success("Membership deleted successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete membership.");
    }
  };

  const filteredMemberships = useMemo(() => {
    return memberships.filter((plan) => {
      const keyword = search.toLowerCase();

      return (
        plan.title?.toLowerCase().includes(keyword) ||
        plan.timing?.toLowerCase().includes(keyword) ||
        plan.features?.join(" ").toLowerCase().includes(keyword)
      );
    });
  }, [memberships, search]);

  const stats = {
    total: memberships.length,
    lowest:
      memberships.length > 0
        ? Math.min(
            ...memberships.map((m) => Number(m.monthlyPrice || m.price || 0)),
          )
        : 0,
    highest:
      memberships.length > 0
        ? Math.max(
            ...memberships.map((m) => Number(m.monthlyPrice || m.price || 0)),
          )
        : 0,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-80 text-gray-400 text-lg">
        Loading Membership Plans...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-80 text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        theme="colored"
      />
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div>
          <h2 className="text-3xl font-bold text-white">Membership Plans</h2>

          <p className="text-gray-400 mt-1">
            Manage gym membership plans for your customers.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={fetchMemberships}
            className="bg-slate-700 hover:bg-slate-600 px-4 py-3 rounded-lg text-white flex items-center gap-2 transition"
          >
            <FaSyncAlt />
            Refresh
          </button>

          <Link
            to="/admin/memberships/add"
            className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg text-white flex items-center gap-2 transition"
          >
            <FaPlus />
            Add Membership
          </Link>
        </div>
      </div>
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Plans</p>

              <h3 className="text-3xl font-bold text-white mt-2">
                {stats.total}
              </h3>
            </div>

            <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center text-white text-xl">
              <FaLayerGroup />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Lowest Monthly Price</p>

              <h3 className="text-3xl font-bold text-green-400 mt-2">
                ₹{stats.lowest}
              </h3>
            </div>

            <div className="w-14 h-14 rounded-xl bg-green-600 flex items-center justify-center text-white text-xl">
              <FaMoneyBillWave />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Highest Monthly Price</p>

              <h3 className="text-3xl font-bold text-yellow-400 mt-2">
                ₹{stats.highest}
              </h3>
            </div>

            <div className="w-14 h-14 rounded-xl bg-yellow-600 flex items-center justify-center text-white text-xl">
              <FaCalendarAlt />
            </div>
          </div>
        </div>
      </div>
      {/* Search */}
      <div className="relative">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          placeholder="Search membership..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-xl py-3 pl-12 pr-4 text-white outline-none focus:border-blue-500"
        />
      </div>{" "}
      {/* Membership Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMemberships.length === 0 ? (
          <div className="col-span-full bg-gray-800 border border-gray-700 rounded-xl p-10 text-center">
            <h3 className="text-2xl font-semibold text-white">
              No Membership Found
            </h3>

            <p className="text-gray-400 mt-2">
              Try another search or create a new membership plan.
            </p>
          </div>
        ) : (
          filteredMemberships.map((plan) => (
            <div
              key={plan.id}
              className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden hover:border-blue-500 hover:shadow-2xl transition duration-300"
            >
              {/* Card Header */}

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                <h3 className="text-2xl font-bold text-white">{plan.title}</h3>

                <p className="text-blue-100 mt-1">{plan.timing}</p>
              </div>

              {/* Price */}

              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-600/10 border border-green-500 rounded-xl p-4">
                    <p className="text-sm text-green-300">Monthly</p>

                    <h4 className="text-3xl font-bold text-green-400 mt-2">
                      ₹{plan.monthlyPrice ?? plan.price ?? 0}
                    </h4>
                  </div>

                  <div className="bg-blue-600/10 border border-blue-500 rounded-xl p-4">
                    <p className="text-sm text-blue-300">Yearly</p>

                    <h4 className="text-3xl font-bold text-blue-400 mt-2">
                      ₹{plan.yearlyPrice ?? "-"}
                    </h4>
                  </div>
                </div>

                {/* Features */}

                <div className="mt-6">
                  <h4 className="font-semibold text-white mb-4">
                    Plan Features
                  </h4>

                  <ul className="space-y-3">
                    {plan.features?.length ? (
                      plan.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-3 text-gray-300"
                        >
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>

                          <span>{feature}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500">No features available</li>
                    )}
                  </ul>
                </div>

                {/* Footer */}

                <div className="border-t border-gray-700 mt-6 pt-6">
                  <div className="flex gap-3">
                    <Link
                      to={`/admin/memberships/edit/${plan.id}`}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white text-center py-3 rounded-xl transition font-medium"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => setDeleteId(plan.id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl transition font-medium flex items-center justify-center gap-2"
                    >
                      <FaTrashAlt />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 w-[92%] max-w-md">
            <div className="w-20 h-20 mx-auto rounded-full bg-red-600/20 flex items-center justify-center">
              <FaTrashAlt className="text-red-500 text-3xl" />
            </div>

            <h3 className="text-2xl font-bold text-white text-center mt-6">
              Delete Membership?
            </h3>

            <p className="text-gray-400 text-center mt-3">
              This action cannot be undone.
              <br />
              The selected membership plan will be permanently removed.
            </p>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-white transition"
              >
                Cancel
              </button>

              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
