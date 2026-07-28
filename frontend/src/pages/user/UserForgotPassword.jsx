import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API_URL from "../../utils/api";

export default function UserForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${API_URL}/api/user/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to send reset link");

      toast.success(data.message);
      setEmail("");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] px-4 py-10">
      <div className="w-full max-w-md bg-[#1E293B] p-8 rounded-2xl shadow-lg border border-gray-700">
        <h2 className="text-white text-2xl font-bold mb-6 text-center">
          Forgot Password
        </h2>
        <form onSubmit={handleReset} className="space-y-5">
          <div>
            <label className="text-gray-300 text-sm">Email</label>
            <div className="relative mt-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#0F172A] text-white border border-gray-600 rounded px-4 py-2 pl-10"
                placeholder="user@example.com"
              />
              <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 rounded font-semibold transition"
          >
            Send Reset Link
          </button>
          <p
            onClick={() => navigate("/user-login")}
            className="text-center text-sm text-blue-400 mt-4 hover:underline cursor-pointer"
          >
            Back to Login
          </p>
        </form>
      </div>
    </div>
  );
}
