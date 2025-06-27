// UserLoginRegister.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserLoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: "", email: "", password: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/api/user/login" : "/api/user/register";

    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      toast.success(isLogin ? "Login successful" : "Registration successful");

      if (isLogin) {
        localStorage.setItem("userToken", data.token);
        navigate("/user-dashboard");
      } else {
        setIsLogin(true);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] px-4 py-10">
      <div className="w-full max-w-md bg-[#1E293B] p-8 rounded-2xl shadow-lg border border-gray-700">
        <h2 className="text-white text-2xl font-bold text-center mb-6">
          {isLogin ? "User Login" : "User Register"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="text-gray-300 text-sm">Name</label>
              <div className="relative mt-1">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0F172A] text-white border border-gray-600 rounded px-4 py-2 pl-10"
                  placeholder="Full Name"
                />
                <FaUser className="absolute left-3 top-3 text-gray-500" />
              </div>
            </div>
          )}

          <div>
            <label className="text-gray-300 text-sm">Email</label>
            <div className="relative mt-1">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-[#0F172A] text-white border border-gray-600 rounded px-4 py-2 pl-10"
                placeholder="user@example.com"
              />
              <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            </div>
          </div>

          <div>
            <label className="text-gray-300 text-sm">Password</label>
            <div className="relative mt-1">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-[#0F172A] text-white border border-gray-600 rounded px-4 py-2 pl-10"
                placeholder="••••••••"
              />
              <FaLock className="absolute left-3 top-3 text-gray-500" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded font-semibold transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>

          {isLogin && (
            <p className="text-center text-sm text-blue-400 mt-2 hover:underline cursor-pointer">
              <a href="/user-forgot-password">Forgot Password?</a>
            </p>
          )}

          <p className="text-sm text-center text-gray-400 mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span
              onClick={toggleMode}
              className="text-blue-400 hover:underline cursor-pointer"
            >
              {isLogin ? "Register" : "Login"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
