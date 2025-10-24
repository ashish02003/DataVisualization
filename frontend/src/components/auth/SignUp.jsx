// src/components/auth/SignUp.jsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { IoMdEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";

import React from "react";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const [showCPassword, setshowCPassword] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    const result = await signup(fullName, email, password);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-600 mt-2">Sign up to get started</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-4 py-2 bg-blue-50 border border-gray-300 rounded-lg outline-none"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 bg-blue-50   border  border-gray-300 rounded-lg outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className=" bg-blue-50    border  border-gray-300 rounded-lg flex items-center ">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2  rounded-lg  focus:border-transparent outline-none"
                placeholder="••••••••"
              />
              <div
                onClick={() => setshowPassword((prev) => !prev)}
                className="cursor-pointer pr-2"
              >
                {showPassword ? <FaEye size={16} /> : <IoMdEyeOff size={16} />}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
              <div className=" bg-blue-50    border  border-gray-300 rounded-lg flex items-center ">
            <input
               type={showCPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2  rounded-lg outline-none"
              placeholder="••••••••"
            />
             <div
                onClick={() => setshowCPassword((prev) => !prev)}
                className="cursor-pointer pr-2"
              >
                {showCPassword ? <FaEye size={16} /> : <IoMdEyeOff size={16} />}
              </div>
              </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-800 text-white py-2 px-4 rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 font-medium cursor-pointer"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-green-700 hover:text-green-800 font-semibold"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
