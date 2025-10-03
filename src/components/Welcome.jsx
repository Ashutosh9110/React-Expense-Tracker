// src/components/Welcome.jsx
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";



export default function Welcome() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6">
      <h1 className="text-4xl font-bold mb-6">Welcome to Expense Tracker 🎉</h1>
      <p className="text-lg mb-8 text-center">
        Track your income and expenses effortlessly.
      </p>

      <button
        onClick={() => navigate("/expenses")}
        className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-lg font-semibold transition"
      >
        Go to Your Expenses →
      </button>

      {user ? (
        <div className="text-center">
          <p className="mb-4 text-lg">
            Logged in as <span className="font-semibold">{user.email}</span>
          </p>
          <NavLink
            to="/complete-profile"
            className="px-6 py-2 bg-white text-indigo-600 rounded-lg shadow hover:bg-gray-100 transition"
          >
            Go to Profile
          </NavLink>
        </div>
      ) : (
        <div className="space-x-4">
          <NavLink
            to="/login"
            className="px-6 py-2 bg-white text-indigo-600 rounded-lg shadow hover:bg-gray-100 transition"
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
          >
            Sign Up
          </NavLink>
        </div>
      )}
    </div>
  );
}
