import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login"); 
  };

  return (
    <nav className="p-4 bg-gray-200 text-indigo-600 flex justify-between items-center">
      {/* Centered Title */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-bold">
        <NavLink to="/" className="hover:underline">
          Expense Tracker
        </NavLink>
      </div>

      {/* Right Section */}
      <div className="ml-auto">
        {user && (
          <button
          onClick={handleLogout}
            className="text-indigo-600 font-semibold"
          >
            Logout
          </button>

        )}
      </div>
    </nav>
  );
};

export default Header;
