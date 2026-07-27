import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("✅ Password reset link sent to your email.");
    } catch (err) {
      setMessage("❌ " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] px-4">
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
                placeholder="admin@example.com"
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

          {message && (
            <p className="text-center text-sm mt-3 text-green-400">{message}</p>
          )}
          <button
            onClick={() => navigate("/admin-auth")}
            className="w-full mt-4 text-sm text-blue-400 hover:underline"
          >
            ← Back to Login
          </button>
        </form>
      </div>
    </div>
  );
}
