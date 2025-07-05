import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserLoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Load remembered login data
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("rememberMeData"));
    if (saved) {
      setFormData(saved);
      setRememberMe(true);
    }
  }, []);

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
      setLoading(true);
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
        localStorage.setItem(
          "user",
          JSON.stringify({ name: data.name, email: data.email })
        );

        if (rememberMe) {
          localStorage.setItem("rememberMeData", JSON.stringify(formData));
        } else {
          localStorage.removeItem("rememberMeData");
        }

        navigate("/user-dashboard");
      } else {
        setIsLogin(true);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-gray-800 text-2xl font-bold text-center mb-6">
          {isLogin ? "User Login" : "User Register"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="text-gray-700 text-sm">Name</label>
              <div className="relative mt-1">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white text-gray-800 border border-gray-300 rounded px-4 py-2 pl-10"
                  placeholder="Full Name"
                />
                <FaUser className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
          )}

          <div>
            <label className="text-gray-700 text-sm">Email</label>
            <div className="relative mt-1">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-white text-gray-800 border border-gray-300 rounded px-4 py-2 pl-10"
                placeholder="user@example.com"
              />
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="text-gray-700 text-sm">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-white text-gray-800 border border-gray-300 rounded px-4 py-2 pl-10 pr-10"
                placeholder="••••••••"
              />
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <div
                className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          {/* Remember Me */}
          {isLogin && (
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-600">
                Remember me
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading
                ? "bg-green-300 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-500"
            } text-white py-2 rounded font-semibold transition`}
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
          </button>

          {isLogin && (
            <p className="text-center text-sm text-blue-600 mt-2 hover:underline cursor-pointer">
              <a href="/user-forgot-password">Forgot Password?</a>
            </p>
          )}

          <p className="text-sm text-center text-gray-600 mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span
              onClick={toggleMode}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              {isLogin ? "Register" : "Login"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
